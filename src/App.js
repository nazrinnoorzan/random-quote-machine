import React, { Component } from "react"
import "./App.css"

const axios = require("axios")

let quotesData
let currentQuote = "Life isn't about getting and having, it’s about giving and being."
let currentAuthor = "Kevin Kruse"

// get API and save it into quotesData variable
axios
  .get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
  .then(response => {
    // console.log(response.data)
    quotesData = response.data.quotes
  })
  .catch(error => {
    console.log("Error in getting API:", error)
  })

// to return a random quote object
function getRandomQuote() {
  return quotesData[Math.floor(Math.random() * quotesData.length)]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.nextQuote = this.nextQuote.bind(this)

    // initial state
    this.state = {
      quote: currentQuote,
      author: currentAuthor
    }
  }

  nextQuote() {
    // return a random quote object
    let randomQuote = getRandomQuote()

    currentQuote = randomQuote.quote
    currentAuthor = randomQuote.author

    // update state to new random quote
    this.setState({
      quote: currentQuote,
      author: currentAuthor
    })
  }

  render() {
    return (
      <div className="App">
        <div id="quote-box">
          <div className="quote-text">
            <span id="text">{this.state.quote}</span>
          </div>
          <div className="quote-author">
            - <span id="author">{this.state.author}</span>
          </div>
          <div className="buttons">
            <button className="button" id="new-quote" onClick={this.nextQuote}>
              New quote
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
