const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.json({ data: 'api working!' })
})

server.use('*', (req, res) => {
    res.status(404).json({ message: 'Invalid path' })
})

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
