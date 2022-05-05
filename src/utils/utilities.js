// This directory contains general utilities that you can use as helper functions throughout other scripts
// Coin flip functions
function coinFlip() {
    return (Math.random() > 0.5) ? "heads" : "tails"
  }
  
function coinFlips(flips) {
    let coinFlips = []
    for (let i = 0; i < flips; i++) {
      coinFlips[i] = coinFlip()
    }
    return coinFlips
  }
  
function countFlips(array) {
    let heads = 0, tails = 0
    array.forEach((flip => (flip == "heads") ? heads++ : tails++)) 
    if (tails == 0 && heads != 0)  {
      return { heads: heads }
    } else if (heads == 0 && tails != 0) {
      return { tails: tails }
    }
    return { heads: heads, tails: tails }
  }
  
function flipACoin(call) {
    let flip = coinFlip()
    return { call: call, flip: flip, result: (call == flip) ? "win" : "lose"}
  }

  module.exports = {
      coinFlip,
      coinFlips,
      countFlips,
      flipACoin
  }