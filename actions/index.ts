"use server"

import { updateCoffeeStore } from "@/lib/airtable"

type State = {
  id: string
}

export const upvoteAction = async (prevState: State) => {
  const { id } = prevState

  const data = await updateCoffeeStore(id)

  if (data) {
    return {
      votes: data.length > 0 ? data[0].votes : 0,
      id,
    }
  }
}
