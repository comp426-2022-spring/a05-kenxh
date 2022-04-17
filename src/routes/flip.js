const util = require('../utils/utilities')
const { coinFlip, coinFlips, flipACoin, countFlips } = require('../utils/utilities')

const express = require('express')

function getFlipRoutes() {
    const router = express.Router()

    router.get('/', flip)
    router.get('/coin', coin)
    router.get('/call/:call(heads|tails)', getCall)
    router.post('/call', postCall)
    router.post('/coins', coins)
    return router
}

async function flip(req, res) {
    res.status(200).json({ flip: coinFlip()})
}

async function coin(req, res) {
    
}

async function getCall(req, res) {
    res.status(200).json(flipACoin(req.params.call))
}

async function postCall(req, res) {
    const game = flipACoin(req.body.guess)
    res.status(200).json(game)
}

async function coins(req, res) {
    const flips = coinFlips(req.body.number)
    const count = countFlips(flips)
    res.status(200).json({"raw":flips,"summary":count})
}

module.exports = {getFlipRoutes} 