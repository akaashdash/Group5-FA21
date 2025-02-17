import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './toggle.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Cube from 'react-3d-cube'
import axios from 'axios'


const defaultArray = [
  [[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]],

  [[9, 10, 11],
  [12, 13, 14],
  [15, 16, 17]],

  [[18, 19, 20],
  [21, 22, 23],
  [24, 25, 26]],

  [[27, 28, 29],
  [30, 31, 32],
  [33, 34, 35]],

  [[36, 37, 38],
  [39, 40, 41],
  [42, 43, 44]],

  [[45, 46, 47],
  [48, 49, 50],
  [51, 52, 53]]
]
let scrambledArray = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill(0)))
let solvedArray = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill(0)))

function makeSquares(face, inputColors) {
  const toReturn = []
  for (var row in inputColors[face]) {
      for (var column in inputColors[face][row]) {
        toReturn.push(<button className={inputColors[face][row][column]}></button>)
      }
  }
  return toReturn
}

function setColorArray(myColorArray, myCubeArray) {
  for (let side = 0; side < 6; side++) {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        let piece = myCubeArray[side][row][column]
        let colorOfPiece = ""
        if (piece < 9) {
          colorOfPiece = "green-square"
        } else if (piece < 18) {
          colorOfPiece = "blue-square"
        } else if (piece < 27) {
          colorOfPiece = "yellow-square"
        } else if (piece < 36) {
          colorOfPiece = "white-square"
        } else if (piece < 45) {
          colorOfPiece = "orange-square"
        } else if (piece < 54) {
          colorOfPiece = "red-square"
        }
        myColorArray[side][row][column] = colorOfPiece
      }
    }
  }
  return myColorArray
}


class SolvedCube extends Component {
  render() {
    return (
        <div className="solved-cube">
        <center>
          <div style={{width: 300, height: 300}}>
            <Cube size={300} index="bottom">
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}>  
                {makeSquares(0, solvedArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(5, solvedArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(1, solvedArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(4, solvedArray)}
              </div> 
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(2, solvedArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(3, solvedArray)}
              </div>
            </Cube>
          </div>
        </center>
      </div>
    )
  }
}

class ShuffledCube extends Component {
  render() {
    return (
        <div className = "scrambled-cube">
        <center>
          <div style={{width: 300, height: 300}}>
            <Cube size={300} index="bottom">
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}>  
                {makeSquares(0, scrambledArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(5, scrambledArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(1, scrambledArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(4, scrambledArray)}
              </div> 
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(2, scrambledArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(3, scrambledArray)}
              </div>
            </Cube>
          </div>
        </center>
      </div>
    )
  }
}

class Buttons extends Component {
  state = {
    solved: true,
    pressed: false,
    solution: ["1. Solve White Face", "2. Solve Two Rows", "4. Solve top face", "5. Finish Cube"],
    first: true
  }

  render() {
    let buttonClick = () => {
      if (this.state.solved && !this.state.pressed) {
        this.setState({
          pressed: true
        })
        axios.get('http://10.192.137.66/scrambled').then(scrambleResponse => {
          console.log("SUCCESS - Scramble", scrambleResponse)
          scrambledArray = setColorArray(scrambledArray, scrambleResponse.data.scrambled)
          axios.get('http://10.192.137.66/solve', { params: { "cube" : JSON.stringify(scrambleResponse.data.scrambled) }}).then(solveResponse => {
            console.log("SUCCESS - Solve", solveResponse)
            solvedArray = setColorArray(solvedArray, solveResponse.data.solved)
            this.setState({
              solved: !this.state.solved,
              pressed: false,
              solution: solveResponse.data.solution,
              first: false
            })
          }).catch(solveError => {
            console.log("ERROR - Solve", solveError)
            solvedArray = setColorArray(solvedArray, scrambleResponse.data.solved)
            this.setState({
              solved: !this.state.solved,
              pressed: false,
              solution: scrambleResponse.data.solution,
              first: false
            })
          })
        }).catch(scrambleError => {
          console.log("ERROR - Scramble", scrambleError)
          scrambledArray = setColorArray(scrambledArray, defaultArray)
          solvedArray = setColorArray(solvedArray, defaultArray)
          this.setState({
            solved: !this.state.solved,
            pressed: false,
            solution: ["1. Solve White Face", "2. Solve Two Rows", "4. Solve top face", "5. Finish Cube"],
            first: false
          })
        })
      } else if (!this.state.pressed) {
        this.setState({
          solved: !this.state.solved
        })
      }
    }

    let solveClicked = () => {
      this.setState({
        solved: !this.state.solved
      })
    }

    const showSolved = this.state.solved
    const showLoading = this.state.pressed
    const solution = this.state.solution
    const firstSolve = this.state.first
    const darkMode = this.props.darkModeToggle
    return(
      <div className={`solve-container ${darkMode ? "background-dark" : "background-light"}`}>
        {showSolved && !showLoading && <button className={`shuffle-button ${darkMode ? "background-light" : "background-dark"} ${darkMode ? "text-light" : "text-dark"}`} onClick={buttonClick}> Shuffle Cube </button>}
        {showSolved && showLoading && <button className="shuffle-button-loading"> Loading... </button>}
        {!showSolved && !showLoading && <button className={`solve-button ${darkMode ? "background-light" : "background-dark"} ${darkMode ? "text-light" : "text-dark"}`} onClick={solveClicked}> Solve </button>}
        {showSolved && <SolvedCube/>}
        {!showSolved && <ShuffledCube/>}
        { 
          showSolved && !firstSolve && (
          <div className={`solution ${darkMode ? "text-dark" : "text-light"}`}>
            <h1>Solution:</h1>
            {solution.join(", ")}
          </div>)
        }
      </div>  
    )
  }
}

class Credits extends Component {
  render() {
    const darkMode = this.props.darkModeToggle
    return (
      <div className={`footer ${darkMode ? "text-dark" : "text-light"}`}>
        <p> Created By: Spheres³ | Saloni • Aashi • Nikhila • Rishi • Akaash</p>
      </div>
    )
  }
}

class Toggle extends Component {
  state = {
    dark: true
  }

  render() {
    let switchMode = () => {
      this.setState({
        dark: !this.state.dark
      })
      if (this.state.dark) {
        document.body.style.backgroundColor = "#dadada"
      } else {
        document.body.style.backgroundColor = "#282c34"
      }
    }

    const darkMode = this.state.dark
    return(
        <div>
            <div className={`toggle-container ${darkMode ? "toggle-light-maroon" : "toggle-dark-maroon"}`} onClick={switchMode}>
                <div className={darkMode? "dark" : "light"}>
                    {darkMode ? "D" : "L"}
                </div>
            </div>
            <div>
                    <App darkModeToggle = {this.state.dark}/>
                    <Buttons darkModeToggle = {this.state.dark}/>
                    <Credits darkModeToggle = {this.state.dark}/>
            </div>
        </div>
    )
  }
}


scrambledArray = setColorArray(scrambledArray, defaultArray)
solvedArray = setColorArray(solvedArray, defaultArray)

ReactDOM.render(
  <React.StrictMode>
    <Toggle />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
