"use client"

import { useState } from "react"

type Coordinates = {
  coords: {
    latitude: number
    longitude: number
  }
}

export const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false)
  const [longLat, setLongLat] = useState("")
  const [locationErrorMsg, setLocationErrorMsg] = useState("")

  function success(position: Coordinates) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setLongLat(`${longitude},${latitude}`)

    setIsFindingLocation(false)
    setLocationErrorMsg("")
    console.log(`latitude ${latitude} longitud ${longitude}`)
  }

  function error() {
    setIsFindingLocation(false)
    setLocationErrorMsg(`Unable to retrieve your location`)
    console.error(`Unable to retrieve your location`)
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMsg(`Geolocation is not supported by your browser`)
      console.log(`Geolocation is not supported by your browser`)
    } else {
      console.log(`Locating...`)
      setIsFindingLocation(true)
      setLocationErrorMsg("")
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }
  return {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    locationErrorMsg,
  }
}
