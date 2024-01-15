import React from 'react'
import { TodoButton } from './Clients'

export const TodoItem = ({ title, description, id , completed }) => { 

  // console.log("server==>>", id);

  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <div>
        <TodoButton id={id} completed={completed} />
      </div>
    </div>
    // <div>
    //   <h1>{title}</h1>
    //   <p>{description}</p>
    //   <br />
    //   <TodoButton id={id} completed={completed} />
    // </div>
  )
}
