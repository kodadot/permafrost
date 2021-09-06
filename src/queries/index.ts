import { gql } from 'graphql-request';

export const searchQuery = gql`
query search($appName: String!) {
  transactions(first: 5, tags: [{ name: "App-Name", values: [$appName] }]) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
`

export const metadataByCollectionAndIdQuery = gql`
query selective($collection: String!, $tokenId: String!) {
  transactions(
    first: 1
    tags: [
      { name: "Collection", values: [$collection] }
      { name: "Instance", values: [$tokenId] }
    ]
  ) {
    edges {
      node {
        id
        tags {
          name
          value
        }
      }
    }
  }
}
`

