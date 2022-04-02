import { gql } from '@apollo/client'

const GET_USER = gql`
  query user($login: String!) {
    user(login: $login) {
      login
    }
  }
`

const GET_USER_INFO = gql`
  query userInfo(
    $login: String!
    $afterRepos: String
    $beforeRepos: String
    $afterStarredRepos: String
    $beforeStarredRepos: String
  ) {
    user(login: $login) {
      id
      name
      login
      email
      avatarUrl
      bio
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 6, after: $afterRepos, before: $beforeRepos) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            id
            name
            description
            url
            languages(first: 3) {
              nodes {
                id
                name
                color
              }
            }
          }
        }
      }
      starredRepositories(
        first: 6
        after: $afterStarredRepos
        before: $beforeStarredRepos
      ) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            id
            name
            description
            url
            languages(first: 3) {
              nodes {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  }
`

const GET_VIEWER_INFO = gql`
  query viewer(
    $afterRepos: String
    $beforeRepos: String
    $afterStarredRepos: String
    $beforeStarredRepos: String
  ) {
    viewer {
      id
      name
      login
      email
      avatarUrl
      bio
      company
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 6, after: $afterRepos, before: $beforeRepos) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            id
            name
            description
            url
            languages(first: 3) {
              nodes {
                id
                name
                color
              }
            }
          }
        }
      }
      starredRepositories(
        first: 6
        after: $afterStarredRepos
        before: $beforeStarredRepos
      ) {
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            id
            name
            description
            url
            languages(first: 3) {
              nodes {
                id
                name
                color
              }
            }
          }
        }
      }
    }
  }
`

export { GET_VIEWER_INFO, GET_USER_INFO, GET_USER }
