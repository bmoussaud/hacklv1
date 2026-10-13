import { test, expect } from '@playwright/test'

test('renders the brief-led showcase without runtime errors', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
  })
  page.on('requestfailed', (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`))
  await page.goto('/')
  await expect(page).toHaveTitle('ASYM-P / Passage | Operation Atelier 404')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.getByText('A fictional 2026 reconstruction.', { exact: true })).toBeVisible()
  await expect(page.getByRole('article')).toHaveCount(3)
  await expect(page.getByText('Still unanswered', { exact: true })).toBeVisible()
  await expect(page.getByText(/Sixty finished pieces, two colourways/)).toBeVisible()
  await expect(page.getByText(/workshop counted 59 out/)).toBeVisible()
  await expect(page.getByText(/six source exhibits have not been supplied/)).toBeVisible()
  await expect(page.locator('main')).toHaveCount(1)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /fictional 2026.*three illustrated design proposals/)
  for (const image of await page.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true)
  }
  expect(errors).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: testInfo.outputPath('showcase.png'), fullPage: true })
})

test('skip link and section navigation work with the keyboard', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const links = page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link')
  for (const link of await links.all()) {
    const target = await link.getAttribute('href')
    await link.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`${target}$`))
    await expect(page.locator(target)).toBeInViewport()
  }
})

test('source brief is available in the production site', async ({ request }) => {
  const response = await request.get('/operation_atelier_404_brief.pdf')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('application/pdf')
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
})

test('navigation remains motion-free with reduced-motion preference', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
})

test('concept illustrations load with descriptive alt text and honest provenance', async ({ page }) => {
  await page.goto('/')
  const articles = page.getByRole('article')
  const expectedImages = [
    { name: 'The Fold', file: 'fold.svg', description: /shoulder bag.*curved strap.*plum vinyl flap/ },
    { name: 'The Carry', file: 'carry.svg', description: /travel bag.*two short handles.*plum vinyl band/ },
    { name: 'The Fragment', file: 'fragment.svg', description: /envelope object.*pointed flap.*vinyl inset/ },
  ]
  for (const item of expectedImages) {
    const article = articles.filter({ has: page.getByRole('heading', { name: item.name, exact: true }) })
    const image = article.getByRole('img')
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveAttribute('src', `./concepts/${item.file}`)
    await expect(image).toHaveAttribute('alt', item.description)
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('width', '800')
    await expect(image).toHaveAttribute('height', '680')
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true)
    await expect(article.locator('figcaption')).toHaveText('Original concept illustration. Fictional 2026 proposal, not an archival photograph.')
    await expect(article.getByText(/Proposed .* Fictional design/)).toBeVisible()
  }
  const heroImage = page.locator('.hero-study img')
  await expect(heroImage).toHaveAttribute('loading', 'eager')
  await expect(heroImage).toHaveAttribute('fetchpriority', 'high')
  await expect(page.locator('.pattern-study')).toHaveCount(0)
})

test('product material disclosures open and close with visible keyboard focus', async ({ page }) => {
  await page.goto('/')
  for (const article of await page.getByRole('article').all()) {
    const name = await article.getByRole('heading', { level: 3 }).innerText()
    const details = article.locator('details')
    const summary = details.locator('summary')
    await expect(summary).toHaveText(`Explore ${name}: materials and construction`)
    await expect(details).not.toHaveAttribute('open', '')
    await expect(details.locator('.material-content')).toBeHidden()
    await summary.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(summary).toBeFocused()
    expect(await summary.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe('solid')
    expect(await summary.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe('3px')
    await page.keyboard.press('Enter')
    await expect(details).toHaveAttribute('open', '')
    await expect(details.getByText('Fictional construction proposal, not a description of an authenticated archive piece.')).toBeVisible()
    await expect(details.locator('dt')).toHaveText(['Surface', 'Construction', 'Gesture'])
    await page.keyboard.press('Space')
    await expect(details).not.toHaveAttribute('open', '')
    await expect(details.locator('.material-content')).toBeHidden()
  }
})

test('exhibit index distinguishes brief summaries from unavailable sources', async ({ page }) => {
  await page.goto('/')
  const index = page.locator('#record').getByRole('region', { name: 'Six exhibits. One incomplete record.' })
  await expect(index.getByRole('listitem')).toHaveCount(6)
  await expect(index.getByRole('heading', { level: 4 })).toHaveText([
    'A / The manifest',
    'B / The prints',
    "C / Margaux's log",
    'D / The legal memo',
    'E / The pattern board',
    'F / The liquidation',
  ])
  await expect(index.getByText('Source exhibit unavailable · Brief summary only', { exact: true })).toHaveCount(6)
  await expect(index.getByRole('link')).toHaveCount(0)
  await expect(index.getByText(/does not provide the conditions or the warning in full/)).toBeVisible()
  await expect(page.locator('.fiction-notice')).toContainText('not authenticated archive objects')
})

for (const width of [320, 390, 768, 1280]) {
  test(`content reflows without clipping at ${width} CSS pixels`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const summary of await page.locator('summary').all()) {
      await summary.click()
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    for (const element of await page.locator('h1, h2, h3, h4, p, summary, img, nav a').all()) {
      const box = await element.boundingBox()
      expect(box).not.toBeNull()
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1)
      expect(await element.evaluate((node) => node.scrollWidth <= node.clientWidth + 1)).toBe(true)
    }
  })
}

test('every control follows the document keyboard order without trapping focus', async ({ page }) => {
  await page.goto('/')
  const controls = page.locator('a, summary')
  await expect(controls).toHaveCount(11)
  for (const control of await controls.all()) {
    await page.keyboard.press('Tab')
    await expect(control).toBeFocused()
    expect(await control.evaluate((node) => getComputedStyle(node).outlineStyle)).toBe('solid')
    expect(await control.evaluate((node) => getComputedStyle(node).outlineWidth)).toBe('3px')
  }
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
  await expect(page.locator('main')).toBeFocused()
})

test('navigation and disclosure targets are at least 44 CSS pixels', async ({ page }) => {
  await page.goto('/')
  for (const control of await page.locator('a:not(.skip-link), summary').all()) {
    const box = await control.boundingBox()
    expect(box).not.toBeNull()
    expect(box.width).toBeGreaterThanOrEqual(44)
    expect(box.height).toBeGreaterThanOrEqual(44)
  }
})

test('landmarks, heading order, and native disclosure states are accessible', async ({ page }) => {
  await page.goto('/')
  for (const role of ['banner', 'main', 'contentinfo']) {
    await expect(page.getByRole(role)).toHaveCount(1)
  }
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toHaveCount(1)
  const levels = await page.getByRole('heading').evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.substring(1))))
  let previousLevel = 0
  for (const level of levels) {
    expect(level).toBeLessThanOrEqual(previousLevel + 1)
    previousLevel = level
  }
  const session = await page.context().newCDPSession(page)
  for (const summary of await page.locator('summary').all()) {
    const name = await summary.innerText()
    for (const expanded of [false, true]) {
      if (expanded) await summary.click()
      const { nodes } = await session.send('Accessibility.getFullAXTree')
      const node = nodes.find((item) => !item.ignored && item.name?.value === name)
      expect(node?.role.value).toBe('DisclosureTriangle')
      expect(node.properties.find((property) => property.name === 'expanded')?.value.value).toBe(expanded)
    }
  }
  await session.detach()
})

test('text and focus contrast remain sufficient in expanded and hover states', async ({ page }) => {
  await page.goto('/')
  for (const summary of await page.locator('summary').all()) await summary.click()
  const targets = ['.site-header nav a', '.text-link', 'summary', '.site-footer a']
  for (const selector of targets) {
    const target = page.locator(selector).first()
    await target.hover()
    await target.focus()
    await page.keyboard.press('Tab')
    await page.keyboard.press('Shift+Tab')
    await expect(target).toBeFocused()
    expect(await target.evaluate((node) => getComputedStyle(node).outlineStyle)).toBe('solid')
    const failures = await page.evaluate(() => {
      const channels = (color) => color.match(/[\d.]+/g).map(Number)
      const luminance = (color) => channels(color).slice(0, 3).reduce((sum, value, index) => {
        const channel = value / 255
        const linear = channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        return sum + linear * [0.2126, 0.7152, 0.0722][index]
      }, 0)
      const contrast = (first, second) => {
        const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
        return (values[0] + 0.05) / (values[1] + 0.05)
      }
      const background = (element) => {
        let current = element
        while (current) {
          const color = getComputedStyle(current).backgroundColor
          const values = channels(color)
          if (values.length === 3 || values[3] === 1) return color
          current = current.parentElement
        }
        throw new Error('No opaque background found for contrast review')
      }
      const failures = []
      for (const element of document.querySelectorAll('h1, h2, h3, h4, p, dt, dd, summary, figcaption, a')) {
        if (!element.checkVisibility()) continue
        const style = getComputedStyle(element)
        const size = parseFloat(style.fontSize)
        const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700)
        const ratio = contrast(style.color, background(element))
        if (ratio < (large ? 3 : 4.5)) failures.push({ text: element.textContent.trim(), ratio })
      }
      const focused = document.activeElement
      const focusStyle = getComputedStyle(focused)
      if (contrast(focusStyle.outlineColor, background(focused)) < 3) failures.push({ text: 'Focus outline', ratio: contrast(focusStyle.outlineColor, background(focused)) })
      return failures
    })
    expect(failures).toEqual([])
  }
})

test('the production showcase works with all external requests blocked', async ({ page, baseURL }) => {
  const externalRequests = []
  await page.route('**/*', (route) => {
    if (new URL(route.request().url()).origin !== new URL(baseURL).origin) {
      externalRequests.push(route.request().url())
      return route.abort()
    }
    return route.continue()
  })
  await page.goto('/')
  for (const image of await page.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true)
  }
  await page.getByText('Explore The Fold: materials and construction', { exact: true }).click()
  await expect(page.getByRole('article').first().locator('.material-content')).toBeVisible()
  const pdf = await page.request.get('/operation_atelier_404_brief.pdf')
  expect(pdf.ok()).toBe(true)
  expect(externalRequests).toEqual([])
})
