import { Tag } from 'arweave/node/lib/transaction';

import { QueryResult, TagType, OpenSeaMetadata, GeneralTags, Attribute, Tag as ArTag } from './types'
const URL = 'ar://'
const ATTRIBUTE_REGEX = /^attr\:\:/

const tagListToObject = (tag: Tag[]) => Object.fromEntries(tag.map(t => [t.name, t.value]))

const tagListToMetadata = (tags: Tag[]) => {
  const metadata = {}
  const attributes: Attribute[] = []
  tags.forEach(tag => {
    if (ATTRIBUTE_REGEX.test(tag.name)) {
      const name = tag.name.replace(ATTRIBUTE_REGEX, '');
      attributes.push({ trait_type: name, value: tag.value })
    } else {
      metadata[tag.name] = tag.value
    }
  })

  return { ...metadata, attributes }
}

export const attributesToTags = (attributes?: Attribute[]): ArTag[] => {
  return attributes?.map(a => ({
    name: `attr::${a.trait_type}`,
    value: a.value.toString(),
  }))
}

export const extractQueryResult = (queryResult: any): QueryResult[] => {
  const {  transactions: { edges }  } = queryResult;
  return edges.map(edge => edge.node).map(node => ({ id: node.id, metadata: tagListToObject(node.tags) }));
}

export const extractQueryToMetadata = (queryResult: any): OpenSeaMetadata[] => {
  const {  transactions: { edges }  } = queryResult;
  return edges.map(edge => edge.node).map(node => ({ image: `${URL}${node.id}`, ...tagListToMetadata(node.tags) }));
}

export const verifyGeneralTags = (params: Record<string, TagType>) => {
  const toValidate: (keyof GeneralTags)[]  = ['Content-Type', 'App-Name', 'classId', 'tokenId']
  validate(params, toValidate, 'General')
}

export const validate = (params: Record<string, TagType>, toValidate: string[], type: string) => {
  for (const property of toValidate) {
    if (!params[property]) {
      throw new ReferenceError(`ERROR: Missing ${property} in ${type}`)
    }
  }
}


export const  verifyOpenSeaMetadata = (params: Record<string, TagType>) => {
  const toValidate: (keyof OpenSeaMetadata)[] = ['name', 'description', 'attributes']
  validate(params, toValidate, 'OpenSeaMetadata')
}

