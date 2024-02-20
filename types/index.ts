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
  recordId: string
  fields: CoffeeStore
}

export type ServerParams = {
  params: { id: string }
  searchParams: { id: string }
}
