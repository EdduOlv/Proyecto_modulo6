const express = require('express')
const auth = require('../middleware/authorization')

const router = express.Router()

router.post ('/user/register')