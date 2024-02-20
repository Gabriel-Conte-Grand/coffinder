"use client"

import React, { useEffect, useState } from "react"
import Banner from "./banner.client"
import { useTrackLocation } from "@/hooks/use-track-location"
import { CoffeeStore } from "@/types"
import { fetchCoffeeStores } from "@/lib/coffee-stores"
import { Card } from "./card.server"

export const NearbyCoffeeStores = () => {
  const { handleTrackLocation, isFindingLocation, longLat, locationErrorMsg } =
    useTrackLocation()

  const handleOnClick = () => {
    handleTrackLocation()
  }

  const [coffeeStores, setCoffeeStores] = useState([])

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLat) {
        try {
          const limit = 6
          const response = await fetch(
            `api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          )
          const coffeeStores = await response.json()
          setCoffeeStores(coffeeStores)
        } catch (error) {
          console.error(error)
        }
      }
    }
    coffeeStoresByLocation()
  }, [longLat])

  return (
    <div>
      <Banner
        buttonText={isFindingLocation ? "Locating.." : "View stores nearby"}
        handleOnClick={handleOnClick}
      />
      {locationErrorMsg && <p>Error: {locationErrorMsg}</p>}

      {coffeeStores.length > 0 && (
        <div className='mt-20'>
          <h2 className='mt-8 pb-8 text-4xl font-bold text-white'>
            Stores near me
          </h2>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6'>
            {coffeeStores?.map((store: CoffeeStore) => {
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
      )}
    </div>
  )
}
