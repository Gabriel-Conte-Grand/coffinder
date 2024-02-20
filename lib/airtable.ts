import { AirtableRecord, CoffeeStore } from "@/types"

var Airtable = require("airtable")
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  "apprM7EZ7hghcM2CY"
)

const table = base("coffee-stores")

//find record

const getMinifiedRecords = (records: AirtableRecord[]) => {
  return records.map((record: AirtableRecord) => {
    return {
      recordId: record.id,
      ...record.fields,
    }
  })
}

const findRecordByFilter = async (id: string) => {
  const findRecords = await table
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage()

  return getMinifiedRecords(findRecords)
}

//create record if not found

export const createCoffeeStore = async (
  coffeeStore: CoffeeStore,
  id: string
) => {
  const { name, address, votes = 0, imageURL } = coffeeStore

  try {
    if (id) {
      const records = await findRecordByFilter(id)
      if (records.length === 0) {
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              votes,
              imageURL,
            },
          },
        ])
        if (createRecords.length > 0) {
          console.log(`Created store with ID: ${id}`)
          return getMinifiedRecords(createRecords)
        }
      } else {
        return records
      }
    } else {
      console.error(`Store ID is missing`)
    }
  } catch (error) {
    console.error(`Error creating or finding a store`, error)
  }
}

export const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id)
      if (records.length !== 0) {
        const record = records[0]
        const updatedVotes = record.votes + 1
        const updateRecords = await table.update([
          {
            id: record.recordId,
            fields: {
              votes: updatedVotes,
            },
          },
        ])
        if (updateRecords.length > 0) {
          console.log(`Updated store with ID: ${id}`)
          return getMinifiedRecords(updateRecords)
        }
      } else {
        console.log(`Coffee stores doesn't exist`)
        return records
      }
    } else {
      console.error(`Store ID is missing`)
    }
  } catch (error) {
    console.error(`Error updating a store`, error)
  }
}
