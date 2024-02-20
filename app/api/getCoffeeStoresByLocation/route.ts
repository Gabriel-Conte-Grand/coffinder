import { fetchCoffeeStores } from "@/lib/coffee-stores"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(NextRequest: NextRequest, response: NextResponse) {
  try {
    const searchParams = NextRequest.nextUrl.searchParams

    const longlat = searchParams.get("longLat") || ""
    const limit = searchParams.get("limit") || "6"

    if (longlat) {
      const resp = await fetchCoffeeStores(longlat, parseInt(limit))
      return NextResponse.json(resp)
    }
  } catch (error) {
    console.error(`Error fetching stores by location`, error)

    return NextResponse.json(`Something went wrong: ${error}`, {
      status: 500,
    })
  }
}
