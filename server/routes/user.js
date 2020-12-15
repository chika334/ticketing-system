const express = require('express')
const router = express.Router()
const { create, list, read, update, remove, userByID } =  require('../controller/userRoutes')
const { requireSignin, hasAuthorization } = require('../controller/authRoutes')

router.post('/users', create)

router.get('/users', list)

router.param('userId', userByID)

router.get('/users/:userId', requireSignin, read)

router.put('/users/:userId', requireSignin, hasAuthorization, update)

router.delete('/users/:userId', requireSignin, hasAuthorization, remove)



module.exports = router
