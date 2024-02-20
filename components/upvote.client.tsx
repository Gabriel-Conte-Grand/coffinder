"use client"

import React from "react"
import Image from "next/image"
import { upvoteAction } from "@/actions"

import { useFormState, useFormStatus } from "react-dom"

export const Upvote = ({ votes, id }: { votes: number; id: string }) => {
  const initialState = {
    id,
    votes,
  }

  // @ts-expect-error
  const [state, dispatch] = useFormState(upvoteAction, initialState)

  function SubmitButton() {
    // HOOK USEFORMSTATUS NEEDS TO BE SEPARATED IN A SINGLE COMPONENT
    const { pending } = useFormStatus()
    return (
      <button
        className='bg-purple-951 min-w-[120px]'
        type='submit'
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? (
          <Image
            src={`/static/icons/loading-spinner.svg`}
            alt='Loading..'
            width={30}
            height={30}
            className='m-auto'
          />
        ) : (
          "Up vote!"
        )}
      </button>
    )
  }

  return (
    <form action={dispatch}>
      <div className='mb-6 flex'>
        <Image
          src={`/static/icons/star.svg`}
          width={24}
          height={24}
          alt='star icon'
        />
        <p className='pl-2'>{state?.votes}</p>
      </div>
      <SubmitButton />
    </form>
  )
}
