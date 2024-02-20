import Image from "next/image"
import Banner from "../components/banner.client"
import Link from "next/link"
import { Card } from "@/components/card.server"
import { fetchCoffeeStores } from "@/lib/coffee-stores"
import { CoffeeStore } from "@/types"
import { NearbyCoffeeStores } from "@/components/nearby-coffee-stores.client"
import { Metadata } from "next"
import { getDomain } from "@/utils"

async function getData() {
  //mapbox api
  const BuenosAiresCoords = `-58.41513823408535%2C-34.57501306084458` //botanic garden
  return await fetchCoffeeStores(BuenosAiresCoords, 6)
}

export const metadata: Metadata = {
  title: "Coffinder",
  description: "Allows you to discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
}

export default async function Home() {
  const coffeeStores: CoffeeStore[] = await getData()

  return (
    <div className='pb-12'>
      <main className='mx-auto mt-10 max-w-6xl px-4'>
        <NearbyCoffeeStores />

        <div className='mt-20'>
          <h2 className='mt-8 pb-8 text-4xl font-bold text-white'>
            Buenos Aires stores
          </h2>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6'>
            {coffeeStores?.map((store) => {
              return (
                <Card
                  key={store.id}
                  name={store.name}
                  imageURL={store.imageURL}
                  href={`/coffee-store/${store.id}`}
                />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
