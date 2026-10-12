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
