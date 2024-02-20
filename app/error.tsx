"use client"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col gap-5'>
      <h2>Something went wrong!</h2>
      <p>
        You need to configure your environment varialbes, check the Readme.md
        file
      </p>
      <p>
        The env variables are MAPBOX_API, UNSPLASH_ACCESS_KEY, AIRTABLE_TOKEN
      </p>
      <p>Create these env with values inside .env.local file</p>

      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
