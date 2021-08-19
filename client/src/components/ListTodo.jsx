import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

// Components
import EditTodo from './EditTodo'

const ListTodo = () => {
    const [todos, setTodos] = useState([])

    const getTodos = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/todos", { headers: { "Content-Type": "application/json" }})
            setTodos(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/todos/${id}`)
            console.log(data)
            setTodos(todos.filter((todo) => todo.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Fragment>
            <table className="table mt-5" >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>{ todo.description }</td>
                                    <td><EditTodo todo={todo}/></td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                       })
                   }
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo
