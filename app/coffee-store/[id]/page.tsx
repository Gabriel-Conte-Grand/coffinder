import React from "react"
import Link from "next/link"
import { fetchCoffeeStore, fetchCoffeeStores } from "@/lib/coffee-stores"
import Image from "next/image"
import { CoffeeStore, ServerParams } from "@/types"
import { createCoffeeStore } from "@/lib/airtable"
import { Upvote } from "@/components/upvote.client"
import { getDomain } from "@/utils"

async function getData(id: string, queryID: string) {
  const coffeeStoreFromMapbox = await fetchCoffeeStore(id, queryID)

  const _createCoffeeStore = await createCoffeeStore(coffeeStoreFromMapbox, id)

  const votes = _createCoffeeStore ? _createCoffeeStore[0].votes : 0

  return coffeeStoreFromMapbox
    ? {
        ...coffeeStoreFromMapbox,
        votes,
      }
    : {}
}

export async function generateStaticParams() {
  const BuenosAiresCoords = `-58.41513823408535%2C-34.57501306084458`

  const coffeeStores = await fetchCoffeeStores(BuenosAiresCoords, 6)

  return coffeeStores.map((coffeeStore: CoffeeStore) => {
    return {
      id: coffeeStore.id.toString(),
    }
  })
  // DEVUELVO UN ARRAY DE IDS [id1, id2, id3...]
}

export async function generateMetadata({ params, searchParams }: ServerParams) {
  const coffeeStore = await fetchCoffeeStore(params.id, searchParams.id)
  const { name = "" } = coffeeStore
  return {
    title: name,
    description: `${name} - Coffee store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${params.id}`,
    },
  }
}

const DetailPage = async (props: {
  params: { id: string }
  searchParams: { id: string }
}) => {
  const {
    params: { id },
    searchParams: { id: queryID },
  } = props

  const coffeeStore = await getData(id, queryID)

  const { name = "", address = "", imageURL = "", votes } = coffeeStore

  return (
    <div className='h-full pb-80'>
      <div className='m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4'>
        <div className=''>
          <div className='mb-2 mt-24 text-lg font-bold'>
            <Link href='/'>← Back to home 🏠</Link>
          </div>
          <div className='my-4'>
            <h1 className='text-4xl'>{name}</h1>
          </div>
          <Image
            src={
              imageURL ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={740}
            height={360}
            className='max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] '
            alt={"Coffee Store Image"}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className='mb-4 flex'>
              <Image
                src='/static/icons/places.svg'
                width='24'
                height='24'
                alt='places icon'
              />
              <p className='pl-2'>{address}</p>
            </div>
          )}
          <Upvote votes={votes} id={id} />
        </div>
      </div>
    </div>
  )
}

export default DetailPage
