export const collection = [
  {
    id: 'fold',
    name: 'The Fold',
    category: 'Proposed shoulder piece',
    description: 'A city companion drawn around a single, off-centre fold. Striated leather gives the body its rhythm; a plum vinyl plane cuts across it. The strap traces a quieter line above the deliberately uneven silhouette.',
    image: {
      src: './concepts/fold.svg',
      alt: 'Concept illustration of an asymmetric dark leather shoulder bag with a long curved strap, a diagonal plum vinyl flap, and three padded geometric panels.',
      width: 800,
      height: 680,
    },
    materialNotes: [
      { label: 'Surface', detail: 'We propose matte striated leather for the body, with a thermoformed vinyl flap that holds a sharper edge. This material pairing comes from the brief; its placement is our interpretation.' },
      { label: 'Construction', detail: 'Three padded planes follow the sloping front. An offset flap and shoulder strap are imagined for this new object, not recovered from an original pattern.' },
      { label: 'Gesture', detail: 'Conceived for movement through the city: an object carried close, with the interrupted geometry visible from a distance.' },
    ],
  },
  {
    id: 'carry',
    name: 'The Carry',
    category: 'Proposed travel piece',
    description: 'The capsule opens into a wider horizon. A low travel silhouette, paired handles, and an angled end panel translate the same material language into an object for departure. Vinyl interrupts the front rather than disguising the structure.',
    image: {
      src: './concepts/carry.svg',
      alt: 'Concept illustration of a wide dark leather travel bag with two short handles, an angled end panel, rectangular padding, and a plum vinyl band across the front.',
      width: 800,
      height: 680,
    },
    materialNotes: [
      { label: 'Surface', detail: 'We extend the proposed striated leather body across a broad front, interrupted by a vinyl band. The shared materials connect this travel direction to The Fold.' },
      { label: 'Construction', detail: 'Paired handles and an offset top opening frame an asymmetric end panel. The padding is drawn in longer blocks: a fictional construction proposal, not a verified workshop specification.' },
      { label: 'Gesture', detail: 'Imagined for the threshold between a room and a journey. The broader form gives the capsule a travel expression without claiming tested capacity or durability.' },
    ],
  },
  {
    id: 'fragment',
    name: 'The Fragment',
    category: 'Proposed small leather object',
    description: 'A pocket-sized expression of the larger idea. An envelope cut, a precise seam, and a small vinyl plane condense the capsule into an intimate object. Asymmetry becomes a detail held in the hand.',
    image: {
      src: './concepts/fragment.svg',
      alt: 'Concept illustration of a compact leather envelope object with a diagonal pointed flap, a plum vinyl inset, two padded panels, and a fine contrasting seam.',
      width: 800,
      height: 680,
    },
    materialNotes: [
      { label: 'Surface', detail: 'A small vinyl inset meets the proposed striated leather envelope. The contrast is concentrated rather than repeated at the scale of the larger pieces.' },
      { label: 'Construction', detail: 'A diagonal flap crosses two padded planes. The cut and fine seam are authored for this concept; no original dimensions or internal layout are known.' },
      { label: 'Gesture', detail: 'Conceived as a small companion to the wider line, carrying the same geometry into a more personal scale. The original redacted category remains unresolved.' },
    ],
  },
]

export const illustrationCaption = 'Original concept illustration. Fictional 2026 proposal, not an archival photograph.'

export const constructionDisclaimer = 'Fictional construction proposal, not a description of an authenticated archive piece.'

export const exhibits = [
  {
    id: 'A',
    name: 'The manifest',
    summary: 'The brief describes sixty pieces, two colourways, a redacted category, and the withheld authorization.',
  },
  {
    id: 'B',
    name: 'The prints',
    summary: 'Four instant photographs: the object, the workroom, three unnamed faces, and a word in marker. The photographs and the word itself are not supplied.',
  },
  {
    id: 'C',
    name: "Margaux's log",
    summary: 'The brief describes two days of archival work, with each answer opening another question. The actual log entries are unavailable.',
  },
  {
    id: 'D',
    name: 'The legal memo',
    summary: 'IP counsel Tomasz Veldt sets out three conditions and a warning about Janus. The brief does not provide the conditions or the warning in full.',
  },
  {
    id: 'E',
    name: 'The pattern board',
    summary: 'Kraft templates and foam seams describe how the pieces were built, in one hand, in French. The patterns themselves are unavailable.',
  },
  {
    id: 'F',
    name: 'The liquidation',
    summary: 'A January 1988 court bulletin names the company and counts 59. The original bulletin is not supplied.',
  },
]

export const facts = [
  { label: 'The crate', detail: 'SC-87-114. Sixty finished pieces, two colourways, one redacted category.' },
  { label: 'The hold', detail: 'Authorization withheld on 8 October 1987. No motive communicated.' },
  { label: 'The name', detail: 'The inventory reaches ASYM-P and stops. The original product name is unknown.' },
  { label: 'The discrepancy', detail: 'The workshop counted 59 out; the archive counted 60 in. No transfer note is described.' },
  { label: 'The liquidation', detail: 'A January 1988 court bulletin names the company. It does not establish what happened to Janus.' },
]

export const questions = [
  'Where did Janus go after the workshop closed?',
  'Why was authorization withheld before the crash?',
  'What category and name lay beyond ASYM-P?',
  'How do we account for the sixtieth piece?',
]
