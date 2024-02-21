import { MapboxData } from "@/types"

const getListOfCoffeeStorePhotos = async () => {
  try {
    const resp = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    )

    const photos = await resp.json()
    const results = photos?.results || []

    return results.map((results: { urls: any }) => results.urls["small"])
  } catch (error) {
    console.error(`Error retrieving a photo`, error)
  }
}

const transformCoffeeData = (
  idx: number,
  result: MapboxData,
  photos: string[]
) => {
  return {
    id: result.id,
    address: result.properties.address || "",
    name: result.text,
    imageURL: photos.length > 0 ? photos[idx] : "",
  }
}

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
    const resp = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/cafe.json?limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`
    )

    const data = await resp.json()
    const photos = await getListOfCoffeeStorePhotos()

    return (
      data?.features?.map((result: MapboxData, idx: number) =>
        transformCoffeeData(idx, result, photos)
      ) || []
    )
  } catch (error) {
    console.error("Error while fetching coffee stores", error)
    return []
  }
}

export const fetchCoffeeStore = async (id: string, queryId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`
    )
    const data = await response.json()
    const photos = await getListOfCoffeeStorePhotos()

    const coffeeStore =
      data?.features?.map((result: MapboxData, idx: number) =>
        transformCoffeeData(parseInt(queryId), result, photos)
      ) || []
    return coffeeStore.length > 0 ? coffeeStore[0] : {}
  } catch (error) {
    console.error("Error while fetching coffee stores", error)
    return {}
  }
}
