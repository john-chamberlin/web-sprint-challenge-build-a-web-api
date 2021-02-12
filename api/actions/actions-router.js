// Write your "actions" router here!
const Actions = require('./actions-model')
const express = require('express')
const router = express.Router()

const {
  validateActionId,
  validateActionBody
} = require('../middleware/middleware')

router.get('/', (req, res) => {
  Actions.get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error fetching actions',
        error: error
      })
    })
})

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action)
})

router.post('/', validateActionBody, (req, res) => {
  const action = req.body
  Actions.insert(action)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error adding action to database',
        error: error
      })
    })
})

router.put('/:id', validateActionId, validateActionBody, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Actions.update(id, changes)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({
                message: `Error modifying action with ID ${id}`,
                error: error
            })
        })
})

router.delete('/:id', validateActionId, (req, res) => {
  const { id } = req.params
  Actions.remove(id)
    .then(() => {
      res
        .status(200)
        .json({ message: `Successfully removed action with ID ${id}` })
    })
    .catch(error => {
      res.status(500).json({
        message: `Unable to remove action with ID ${id}`,
        error: error
      })
    })
})

module.exports = router
