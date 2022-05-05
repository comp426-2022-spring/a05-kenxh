// Focus div based on nav button click
const home = document.getElementById("homenav")
const single = document.getElementById("singlenav")
const multi = document.getElementById("multinav")
const guess = document.getElementById("guessnav")

home.addEventListener("click", function() { toggle("home") } )
single.addEventListener("click", function() { toggle("single") } )
multi.addEventListener("click", function() { toggle("multi") } )
guess.addEventListener("click", function() { toggle("guess") } )

function toggle(id) {
    var element  = document.getElementById(id);
    var elements = document.getElementsByTagName("div")
    
    if (element.getAttribute("class") === "") {
        element.setAttribute("class", "hidden")
    } else {
        element.setAttribute("class", "")
        for (let ele of elements) {
            if (ele.id !== id) {
                ele.setAttribute("class", "hidden")
            }
        }
    }

}

// Flip one coin and show coin image to match result when button clicked
const coin = document.getElementById("coin")
// Add event listener for coin button
coin.addEventListener("click", flipCoin)
function flipCoin() {
    fetch('http://localhost:5000/app/flip/', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(result) {
        console.log(result);
        document.getElementById("result").innerHTML = result.flip;
        document.getElementById("quarter").setAttribute("src", "./assets/img/" + result.flip + ".png");
        coin.disabled = true
    })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
// Our flip many coins form
const coins = document.getElementById("coins")
// Add event listener for coins form
coins.addEventListener("submit", flipCoins)
// Create the submit handler
async function flipCoins(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/coins/"
    const url = "http://localhost:5000/"+endpoint
    console.log(url)

    const formEvent = event.currentTarget
    document.getElementById("heads-img").innerHTML = ''
    document.getElementById("tails-img").innerHTML = ''
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: "+ flips.summary.heads;
        for (let i = 0; i < flips.summary.heads; i++) {
            var heads = document.createElement("img")
            heads.setAttribute("src", "./assets/img/heads.png");
            heads.setAttribute("class", "smallcoin");
            document.getElementById("heads-img").appendChild(heads);
        }
        document.getElementById("tails").innerHTML = "Tails: "+ flips.summary.tails;
        for (let i = 0; i < flips.summary.tails; i++) {
            var tails = document.createElement("img")
            tails.setAttribute("src", "./assets/img/tails.png");
            tails.setAttribute("class", "smallcoin");
            document.getElementById("tails-img").appendChild(tails);
        }
    } catch (error) {
        console.log(error);
    }
}
// Create a data sender
async function sendFlips({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json()
}


// Guess a flip by clicking either heads or tails button
const guessFlip = document.getElementById("guessflip")
guessFlip.addEventListener("submit", guessCoin)

async function guessCoin(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/call/"
    const url = "http://localhost:5000/"+endpoint

    const formEvent = event.currentTarget

    try {
        const formData = new FormData(formEvent);
        
        const result = await sendGuess({ url, formData });

        document.getElementById("userguess").innerHTML = "Guess: "+ result.call;
        document.getElementById("guessimg").setAttribute("src", "./assets/img/" + result.call + ".png");
        
        document.getElementById("actual").innerHTML = "Actual: "+ result.flip;
        document.getElementById("actualimg").setAttribute("src", "./assets/img/" + result.flip + ".png");
       
        document.getElementById("gameresult").innerHTML = "Result: "+ result.result;
    } catch (error) {
        console.log(error);
    }
}

async function sendGuess({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json()
}