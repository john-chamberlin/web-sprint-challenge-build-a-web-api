const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const validateActionId = (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (action === null) {
                res.status(404).json({
                    message: `No action found with id ${id}`
                })
            } else {
                req.action = action
                next()
            }
        })
        .catch(error => {
            res.status(500).json({
                message: `Unable to acquire action with id ${id}`,
                error: error
            })
        })
}

const validateActionBody = (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(404).json({
            message:
                'Please include project id, description, and notes for the new action'
        })
    } else {
        next()
    }
}

const validateProjectId = (req, res, next) => {
    const { id } = req.params
    Projects.get(id).then(project => {
        if (project == null) {
            res.status(404).json({ message: `No project found with ID ${id}` })
        } else {
            req.project = project
            next()
        }
    })
}

const validateProjectBody = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(404).json({ message: 'Please include name and description' })
    } else {
        next()
    }
}

module.exports = {
    validateActionId,
    validateActionBody,
    validateProjectId,
    validateProjectBody
}
