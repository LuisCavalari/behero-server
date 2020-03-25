const router = require('express').Router()
const OngsController = require('./app/Controllers/OngsController')
const IncidentsController = require('./app/Controllers/IncidentsController')
const ProfileController = require('./app/Controllers/ProfileController')
const SessionController = require('./app/Controllers/SessionController')

router.post('/ongs', OngsController.store)
router.get('/ongs', OngsController.index)

router.post('/incidents', IncidentsController.store)
router.get('/incidents', IncidentsController.index)
router.delete('/incidents/:id', IncidentsController.delete)

router.get('/profile', ProfileController.index)

router.post('/session', SessionController.create )
module.exports = router