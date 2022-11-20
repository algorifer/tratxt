const fetchFeed = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url, { cache: 'no-store' })
    const text = await res.text()
    return text
  } catch (error) {
    return ''
  }
}

export const getTratxt = async (url: string): Promise<string> => {
  const feed = await fetchFeed(url)

  return feed
}