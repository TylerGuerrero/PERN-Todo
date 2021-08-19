import React, { Fragment, useState } from 'react'
import axios from 'axios'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const handleClick = async (id) => {
        const { data } = await axios.put(`http://localhost:5000/api/todos/${id}`, { description }, { headers: {"Content-Type": "application/json"}})
        setDescription(data)
        window.location = "/"
    }

    return (
    <Fragment>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo._id}`}>
            Open modal
        </button>
        <div className="modal" id={`id${todo._id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="edit" className="form-control" placeholder={todo.description} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => handleClick(todo._id)}>Edit</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default EditTodo
