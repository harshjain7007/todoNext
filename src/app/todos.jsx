import React from 'react'
import { TodoItem } from '../../Components/ServerComponent'
import { cookies } from 'next/headers'

const fetchTodo = async (token) => {

try {
  const res = await fetch(`${process.env.URL}/api/mytask`, {
    cache: "no-cache",
    // credentials: "include"
    headers:{
      cookie: `token=${token}`
    }
  })
  const data = await res.json()

  if(!data.success) return []

  return data.tasks;

} catch (error) {
    console.log(error);
  return []
}
} 


const Todos = async () => {

    const token = cookies().get("token")?.value

  if(!token) return redirect("/login")

const tasks = await fetchTodo(token)


  return ( 
    <section className="todosContainer">
      {tasks?.map((i) => (
        <TodoItem
          title={i.title}
          description={i.description}
          id={i._id}
          key={i._id}
          completed={i.isCompleted}
        />
      ))}
    </section>
    // <>
    //  <section>
    //   {tasks?.map((i) => {
    //     return <TodoItem title={i.title} description={i.description} id={i._id}  key={i._id}  completed={i.isCompleted}  /> 
    //   })}
    //   </section> 
    // </>
  )
}

export default Todos
