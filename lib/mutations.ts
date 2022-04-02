import fetcher from './fetcher'

export const auth = (
  type: 'login' | 'register',
  body: { username: string; password: string }
) => {
  return fetcher(`/${type}`, body)
}
