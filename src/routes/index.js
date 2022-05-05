const express = require('express')

const { getFlipRoutes } = require('./flip')
const { getUserRoutes } = require('./user')
const { countFlips, coinFlips } = require('../utils/utilities')

function getRoutes() {
    const router = express.Router()
    
    router.use('/flip', getFlipRoutes())
    router.use('/flips/:number', flips)
    router.use('/user', getUserRoutes())
    
    return router
}

async function flips(req, res) {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
}

module.exports = {getRoutes}
