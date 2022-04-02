import Pagination from './pagination'
import RepositoryCard from './repositoryCard'

type RepoNodeType = {
  id: string
  name: string
  description: string
  url: string
  languages: {
    [key: string]: string
  }[]
}

const FavoriteRepositoriesSection = ({
  repositories,
}: {
  repositories: { favRepos: RepoNodeType }
}) => {
  return (
    <>
      {repositories ? (
        <Pagination
          RenderComponent={RepositoryCard}
          data={repositories.favRepos}
          dataLimit={6}
        />
      ) : (
        <p>There are no favorite repositories</p>
      )}
    </>
  )
}

export default FavoriteRepositoriesSection
