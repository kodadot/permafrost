import Arweave from 'arweave'
import TestWeave from 'testweave-sdk'
import { request, gql } from 'graphql-request'
import Transaction from 'arweave/node/lib/transaction'

const ARWEAVE_GRAPHQL_URL = 'https://arweave.net/graphql'
const APP_NAME = 'PermaFrost'
// import searchQuery from './queries/search.graphql'

const isDEV = 1

const arSetup = isDEV
  ? {
      host: 'localhost',
      port: 1984,
      protocol: 'http',
      timeout: 20000,
      logging: false,
    }
  : {
      host: 'arweave.net', // Hostname or IP address for a Arweave host
      port: 443, // Port
      protocol: 'https', // Network protocol http or https
      timeout: 20000, // Network request timeouts in milliseconds
      logging: false, // Enable network request logging
    }

const arweave = Arweave.init(arSetup)

export async function search(appName: string = APP_NAME) {
  const query = gql`
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

  const result = await request(ARWEAVE_GRAPHQL_URL, query, { appName })
  return result
}

export async function findByContract(appName: string = APP_NAME) {
  const query = gql`
    query {
      transactions(
        first: 5
        tags: { name: "App-Name", values: ["ArweaveStats"] }
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

  const result = await request(ARWEAVE_GRAPHQL_URL, query)
  return result
}

type TagType = boolean | number | string | string[]

export async function submit(
  params: Record<string, TagType>,
  data: Buffer
): Promise<Transaction> {
  let key = await arweave.wallets.generate()

  let transaction = await arweave.createTransaction(
    {
      data,
    },
    key
  )

  Object.entries(params).forEach(([key, value]) => {
    transaction.addTag(key, value.toString())
  })

  transaction.addTag('App-Name', APP_NAME)

  await arweave.transactions.sign(transaction, key)
  await arweave.transactions.post(transaction)

  return transaction
}

function verify(params: Record<string, TagType>) {
  const toValidate = ['name', 'contract', 'network']
  for (const property of toValidate) {
    if (!params[property]) {
      throw new ReferenceError('ERROR: Not all properties')
    }
  }
}

// main()
