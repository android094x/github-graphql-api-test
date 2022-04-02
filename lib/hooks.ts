import useSWR from 'swr'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export const useFavRepos = () => {
  const { data, error } = useSWR('/get-fav-repos', fetcher)

  return {
    favRepos: data,
    isLoading: !data && !error,
    isError: error,
  }
}
