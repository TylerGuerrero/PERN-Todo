import React, { Fragment, useState } from 'react'
import axios from 'axios'

const InputTodo = () => {
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post("http://localhost:5000/api/todos", { description }, { headers: {"Content-Type": "application/json"} })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center my-5">Input Todo</h1>
            <form className="d-flex" onSubmit={handleSubmit}>
                <input className="form-control" type="text" name="description" placeholder="Add Todo" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo
