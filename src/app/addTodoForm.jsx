"use client"
import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Context } from '../../Components/Clients'
import { redirect } from 'next/navigation'

const AddTodoForm = () => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const { user } = useContext(Context)

  const router = useRouter()

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();

      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      // console.log({ data });
      router.refresh()
      setTitle("")
      setDescription("")
    } catch (error) {
      return toast.error(data.message);
    }

  }

  if(!user._id) redirect("/login")

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
    // <div>
    // <form onSubmit={submitHandler}>
    //     <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="" id="" placeholder='Task Title' /> <br />
    //     <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="" id="" placeholder='Task Description' />
    //     <button type="submit">Add Task</button>
    // </form>
    // </div>
  )
}

export default AddTodoForm
