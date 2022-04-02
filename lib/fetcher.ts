export default async function fetcher(
  url: string,
  data = undefined as any | undefined
) {
  const res = await fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (res.status > 399 && res.status < 200) {
    return res.json()
  }
  return res.json()
}
