const express = require('express')
const router = express.Router()
const { createEvent, fileUpload, ListEvents, readEvents, eventByID } = require('../controller/eventRoutes')
const { requireSignin } = require("../controller/authRoutes")

router.post('/event', fileUpload, createEvent)

router.get('/event', ListEvents)

router.param('eventId', eventByID)

router.get('/event/:eventId', requireSignin, readEvents)

//router.put('/users/:userId', requireSignin, hasAuthorization, update)

//router.delete('/users/:userId', requireSignin, hasAuthorization, remove)

module.exports = router
