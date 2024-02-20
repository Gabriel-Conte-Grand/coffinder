export type MapboxData = {
  id: string
  properties: {
    address: string
  }
  text: string
}

export type CoffeeStore = {
  id: string
  name: string
  address: string
  imageURL: string
  votes: number
}

export type AirtableRecord = {
  id: string
  recordID: string
  fields: CoffeeStore
}

export type ServerParams = {
  params: { id: string }
  searchParams: { id: string }
}
