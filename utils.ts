import { Tag } from 'arweave/node/lib/transaction';

import { QueryResult, TagType, OpenSeaMetadata } from './types'

const tagListToObject = (tag: Tag[]) => Object.fromEntries(tag.map(t => [t.name, t.value]))

export const extractQueryResult = (queryResult: any): QueryResult[] => {
  const {  transactions: { edges }  } = queryResult;
  return edges.map(edge => edge.node).map(node => ({ id: node.id, metadata: tagListToObject(node.tags) }));
}


export const verifyTags = (params: Record<string, TagType>) => {
  
}


export const  verifyOpenSeaMetadata = (params: Record<string, TagType>) => {
  const toValidate: (keyof OpenSeaMetadata)[] = ['name', 'description', 'attributes']
  for (const property of toValidate) {
    if (!params[property]) {
      throw new ReferenceError(`ERROR: Missing ${property} in OpenSeaMetadata`)
    }
  }
}