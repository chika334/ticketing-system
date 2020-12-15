const express = require('express')
const router = express.Router()
const { signin, signout, requireSignin, hasAuthorization } =  require('../controller/authRoutes')

router.post('/auth/signin', signin)

router.get('/auth/signout', signout)


module.exports = router
