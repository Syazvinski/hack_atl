/*
  SmartImage
  - Auto-picks an image from src/content/images/** by filename keywords.
  - Usage: <SmartImage tags={["team","crowd"]} alt="Crowd" className="..." />
  - If no match, renders a styled placeholder.
*/

const allImages = import.meta.glob('../content/images/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
})

const imageList = Object.entries(allImages).map(([path, mod]) => ({
  path,
  url: mod.default || mod,
  name: path.split('/').pop().toLowerCase(),
}))

function pickByTags(tags = []) {
  if (!tags.length || imageList.length === 0) return null
  const wanted = tags.map((t) => String(t).toLowerCase())
  let best = null
  let bestScore = 0
  for (const img of imageList) {
    let score = 0
    for (const t of wanted) {
      if (img.name.includes(t)) score += 2
    }
    // mild preference for webp and larger-looking names
    if (img.name.endsWith('.webp')) score += 0.5
    if (img.name.match(/(hero|cover|large)/)) score += 0.5
    if (score > bestScore) {
      best = img
      bestScore = score
    }
  }
  return best && bestScore > 0 ? best.url : null
}

export default function SmartImage({ tags = [], alt = '', className = '', placeholder = 'Image' }) {
  const src = pickByTags(tags)
  if (!src) {
    return <div className={`img-placeholder ${className}`}>{placeholder}</div>
  }
  return <img src={src} alt={alt || tags.join(' ')} className={className} />
}

