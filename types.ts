export type QueryResult = {
  id: string
  metadata: Record<string, string>
}

export type Tag = {
  name: string
  value: string
}

export type Attribute = {
  trait_type: string
  value: string | number
}

export type TagType = boolean | number | string | string[]

export type OpenSeaMetadata = {
  description: string;
  external_url: string;
  image?: string;
  name: string;
  attributes: Attribute[];
}

