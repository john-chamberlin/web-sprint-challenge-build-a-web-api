// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')
const {
    validateProjectId,
    validateProjectBody
} = require('../middleware/middleware')

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Unable to retrieve projects',
                error: error
            })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProjectBody, (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({
                message: 'Unable to add new project',
                error: error
            })
        })
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Projects.update(id, changes)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({
                message: `Unable to modify post with ID ${id}`,
                error: error
            })
        })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(() => {
            res.status(200).json({
                message: `Project with ID ${id} removed successfully`
            })
        })
        .catch(error => {
            res.status(500).json({
                message: `Unable to remove project with ID ${id}`,
                error: error
            })
        })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id)
        .then(actions => {
            if (!actions) {
                res.status(404).json({
                    message: `There are no actions for project with ID ${id}`
                })
            } else {
                res.status(200).json(actions)
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Unable to acquire actions for project with ID ${id}`,
                error: error
            })
        })
})

module.exports = router
