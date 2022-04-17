const express = require('express')

const db = require('../services/database')

function getUserRoutes() {
    const router = express.Router()

    router.post('/login', login)
    router.post('/new', newUser)
    router.patch('/update/:id', update)
    router.delete('/delete/:id', deleteUser)
    return router
}

async function login(req, res) {
    try {
        const stmt = db.prepare('SELECT * FROM userinfo WHERE id = ?').get(req.query.id);
        res.status(200).json(stmt)
    } catch (e) {
        console.error(e)
    }
}

async function newUser(req, res) {
    let data = {
        user: req.body.username,
        pass: req.body.password
    }
    const stmt = db.prepare('INSERT INTO userinfo (username, password) VALUES (?, ?)')
    const info = stmt.run(data.user, data.pass)
    res.status(200).json(info)
}

async function update(req, res) {
    let data = {
        user: req.body.username,
        pass: req.body.password
    }
    const stmt = db.prepare('UPDATE userinfo SET username = COALESCE(?, username), password = COALESCE(?, password) WHERE id = ?')
    const info = stmt.run(data.user, data.pass, req.params.id)
    res.status(200).json(info)
}

async function deleteUser(req, res) {
    const stmt = db.prepare('DELETE FROM userinfo WHERE id = ?');
    const info = stmt.run(req.params.id);
    res.status(200).json(info)
}

module.exports = {getUserRoutes}