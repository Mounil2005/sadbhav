import { useEffect } from 'react'

const DEFAULTS = {
  title: 'Sadbhav Hospital | Advanced Pulmonary & Critical Care, Jamnagar',
  description:
    'Advanced pulmonary and critical care for patients and families in Jamnagar. Trusted, compassionate, and modern healthcare by Dr. Vivek Nanda.',
  image: '/logo.png',
}

function setMeta(selector, attr, name, content) {
  if (!content) return
  let el = document.querySelector(`meta[${selector}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(selector, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, content)
}

export function useSEO({ title, description, image, url } = {}) {
  useEffect(() => {
    const t = title ? `${title} | Sadbhav Hospital` : DEFAULTS.title
    const d = description || DEFAULTS.description
    const img = image || DEFAULTS.image
    const u = url || window.location.href

    document.title = t
    setMeta('name', 'content', 'description', d)

    setMeta('property', 'content', 'og:title', t)
    setMeta('property', 'content', 'og:description', d)
    setMeta('property', 'content', 'og:image', img)
    setMeta('property', 'content', 'og:url', u)
    setMeta('property', 'content', 'og:type', 'website')

    setMeta('name', 'content', 'twitter:card', 'summary_large_image')
    setMeta('name', 'content', 'twitter:title', t)
    setMeta('name', 'content', 'twitter:description', d)
    setMeta('name', 'content', 'twitter:image', img)

    return () => {
      document.title = DEFAULTS.title
    }
  }, [title, description, image, url])
}
