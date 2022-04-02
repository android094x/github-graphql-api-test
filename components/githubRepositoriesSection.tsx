import * as React from 'react'
import RepositoryCard from './repositoryCard'

type ComponentProps = {
  repositories: {
    node: RepoNodeType
  }[]
  pageInfo: {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
  fetchMore: any
  tab: 'repos' | 'starred'
}

type RepoNodeType = {
  id: string
  name: string
  description: string
  url: string
  languages: {
    nodes: {
      [key: string]: string
    }[]
  }
}

const GitHubRepositoriesSection = ({
  repositories,
  pageInfo,
  fetchMore,
  tab,
}: ComponentProps) => {
  const handleNextPageClick = () => {
    let variables
    if (tab === 'repos') {
      variables = {
        afterRepos: pageInfo.endCursor,
      }
    }

    if (tab === 'starred') {
      variables = {
        afterStarredRepos: pageInfo.endCursor,
      }
    }

    fetchMore({
      variables,
      updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult,
    })
  }

  const handlePreviousPageClick = () => {
    let variables
    if (tab === 'repos') {
      variables = {
        afterRepos: null,
        beforeRepos: pageInfo.startCursor,
      }
    }

    if (tab === 'starred') {
      variables = {
        beforeStarredRepos: pageInfo.startCursor,
      }
    }

    fetchMore({
      variables,
      updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult,
    })
  }
  return (
    <>
      <ul className='flex flex-col'>
        {repositories.map(({ node: repo }: { node: RepoNodeType }) => (
          <RepositoryCard
            key={repo.id}
            {...repo}
            languages={repo.languages.nodes}
          />
        ))}
      </ul>
      {!pageInfo.hasPreviousPage && !pageInfo.hasNextPage ? null : (
        <div className='w-full flex justify-center mt-6 space-x-4'>
          <button
            type='button'
            onClick={handlePreviousPageClick}
            className='border border-gray-100 rounded-full px-4 py-1 text-white'
            disabled={!pageInfo.hasPreviousPage}
          >
            Prev
          </button>
          <button
            type='button'
            onClick={handleNextPageClick}
            className='border border-gray-100 rounded-full px-4 py-1 text-white'
            disabled={!pageInfo.hasNextPage}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default GitHubRepositoriesSection
