import express from 'express'

// PG client
import Client from '../config/db.js'

const { Router } = express
const router = Router({ caseSensitive: true, strict: true })

// create todo
router.post("/", async (req, res) => {
    const { description } = req.body

    try {
        const todo = await Client.query("INSERT INTO todo (id, description) VALUES (DEFAULT, $1) RETURNING *",
            [description])

        return res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Client.query("SELECT * FROM todo")
        return res.status(200).json(todos.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// get single todo
router.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const todo = await Client.query("SELECT * FROM todo WHERE id = $1",
            [id])
        return res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

// update todo
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    
    try {
        const todo = await Client.query("UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
            [description, id])
        return res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: erro.message })
    }
})

// delete a single todo
router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const todo = await Client.query("DELETE FROM todo WHERE id = $1",
            [id])
        return res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

export default router
