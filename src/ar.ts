import Arweave from 'arweave'
import { request } from 'graphql-request'
import { metadataByCollectionAndIdQuery, metadataByTxId, searchQuery } from './queries'
import { Attribute, TagType } from './types'
import { attributesToTags } from './utils'
import * as wallet from './wallet.json'

const isDEV = 1

const ARWEAVE_GRAPHQL_URL = isDEV
  ? 'http://localhost:1984/graphql'
  : 'https://arweave.net/graphql'
const APP_NAME = 'PermaFrost'

const arSetup = isDEV
  ? {
      host: 'localhost',
      port: 1984,
      protocol: 'http',
      timeout: 20000,
      logging: true,
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
  const query = searchQuery
  const result = await request(ARWEAVE_GRAPHQL_URL, query, { appName })
  return result
}

export async function findByContract(collection: string, tokenId: string) {
  const query = metadataByCollectionAndIdQuery
  const result = await request(ARWEAVE_GRAPHQL_URL, query, {
    collection,
    tokenId,
  })
  return result
}

export async function findByTransactionId(transaction: string) {
  const query = metadataByTxId
  const result = await request(ARWEAVE_GRAPHQL_URL, query, {
    transaction
  })
  return result
}



export async function submit(
  params: Record<string, TagType>,
  data: Buffer
): Promise<any> {
  try {
    let key = await arweave.wallets.generate()

    const lastTxPromise = arweave.api.get('/tx_anchor').then(x => x.data);

    let transaction = await arweave.createTransaction({
      data: data,
      last_tx: await lastTxPromise,
  }, key);
  

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'attributes') {
        console.log(typeof value)
        attributesToTags(JSON.parse(value.toString()) as Attribute[]).forEach(tag => {
          transaction.addTag(tag.name, tag.value)
        })
      } else {
        transaction.addTag(key, value.toString())
      }

      
    })

    transaction.addTag('App-Name', APP_NAME)



    // verifyGeneralTags(transaction.tags)

    await arweave.transactions.sign(transaction, key)
    console.log(`SIGNED`)
    // TODO: should await for transaction to be committed
    arweave.transactions.post(transaction)
    // console.log(`Posted`)
    // console.log(response.status)

    return {
      arweaveId: transaction.id,
    }
  } catch (error) {
    console.log(error)
    return {
      error: error.message,
    }
  }
}

export async function readTx(id: string) {
  return await arweave.transactions.getData(id, {string: true, decode: true })
}

export async function whoAmI() {
  return await arweave.wallets.jwkToAddress(wallet)
}


// main()
