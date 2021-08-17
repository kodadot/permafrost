import { Tag } from 'arweave/node/lib/transaction';
import { QueryResult } from './types'

const tagListToObject = (tag: Tag[]) => Object.fromEntries(tag.map(t => [t.name, t.value]))

export const extractQueryResult = (queryResult: any): QueryResult[] => {
  const {  transactions: { edges }  } = queryResult;
  return edges.map(edge => edge.node).map(node => ({ id: node.id, metadata: tagListToObject(node.tags) }));
}