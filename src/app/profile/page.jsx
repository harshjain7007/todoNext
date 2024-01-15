"use client"
import React, { useContext } from 'react'
import { Context } from '../../../Components/Clients'
import { redirect } from 'next/navigation'

const Page = () => {

    const { user } = useContext(Context)

    if(!user._id) return redirect("/login")

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
    // <div>
    //   <h1>{user.name}</h1>
    //   <p>{user.email}</p>
    // </div>
  )
}

export default Page
