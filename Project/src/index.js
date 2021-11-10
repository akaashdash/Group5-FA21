import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cube from 'react-3d-cube'
import axios from 'axios'
import './Toggle.css'
/* Creates the Cube 
    - for each color, we'll have a different class name so that we can change the color of the square
    - use onClick to change the classname rather than changing the css value itself.

    OR
    - use onClick to change the actual style... 54 times * however many times the click the thing.


    ----------------------
    - to get the state of the cube, convert what python part has into something easier to use with the buttons in react.(ie. r1-r9, g1-g9)

    0 = white
    1 = green
    2 = orange
    3 = blue
    4 = red
    5 = yellow
*/

/* var myArray = [1, 2, 3, 4]
var color = new Array(4).fill(0)

for (var i = 0; i < myArray.length; i++) {
  console.log("hi")
  if(myArray[i] > 2) {
    color[i] = "red"
  } else {
    color[i] = "blue"
  }
}
console.log(color) */


let colorArray = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill(0)))
const solvedColorArray = new Array(6).fill(0).map(() => new Array(3).fill(0).map(() => new Array(3).fill(0)))

function makeSquares(face, inputColors) {
  const toReturn = new Array()
  for(var row in inputColors[face]) {
      for(var column in inputColors[face][row]) {
        toReturn.push(<button className={inputColors[face][row][column]}></button>)
      }
  }
  return toReturn
}



class SolvedCube extends Component {
  constructor() {
    super();
    this.state = {
      hidden: false
    }  
  }


  render () {
    return (
      <div>
      {/* show solved cube */}
      <div className = "solved-cube">
        <center>
          <div style={{width: 300, height: 300}}>
           {/*ok so according to the npm package, you cant have it show on a corner, but you can have it move on start!*/}
            <Cube size={300} index="bottom">
              <div style={{width: '300px', height: '300px', backgroundColor: 'black'}}>  
                <button className="green-square"> </button>
                <button className="green-square"> </button>
                <button className="green-square"> </button>
                <button className="green-square"> </button>
                <button className="green-square"> {/* keep */} </button> 
                <button className="green-square"> </button>
                <button className="green-square"> </button>
                <button className="green-square"> </button>
                <button className="green-square"> </button>
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square">  {/* keep */} </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> {/* keep */} </button> 
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> {/* keep */} </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
                <button className="orange-square"> </button>
              </div> 
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> {/* keep */} </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
                <button className="yellow-square"> </button>
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> {/* keep */} </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
              </div>
            </Cube>
          </div>
        </center>
      </div>
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
                {makeSquares(0, colorArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(5, colorArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(1, colorArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(4, colorArray)}
              </div> 
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(2, colorArray)}
              </div>
              <div style={{backgroundColor: 'black', width: '300px', height: '300px'}}> 
                {makeSquares(3, colorArray)}
              </div>
            </Cube>
          </div>
        </center>
      </div>
    );
  }
}

class Buttons extends Component {

  state = {
    solved: true,
    first: true,
    pressed: false,
    solution: ["1. Solve White Face", "2. Solve Two Rows", "4. Solve top face", "5. Finish Cube"]
  }

  // iterate through cubeArray to get the values then set the corresponding index in the colorArray to be the corresponding color
  setColorArray(myColorArray, myCubeArray) {
    for (let side = 0; side < 6; side++) {
      for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
          let piece = myCubeArray[side][row][column]
          let colorOfPiece = ""
          //console.log("id: " + piece)
          if(piece < 9) {
            colorOfPiece = "green-square"
            //console.log("color: " + colorOfPiece)
          } else if(piece < 18) {
            colorOfPiece = "blue-square"
            //console.log("color: " + colorOfPiece)
          } else if(piece < 27) {
            colorOfPiece = "yellow-square"
            //console.log("color: " + colorOfPiece)
          } else if(piece < 36) {
            colorOfPiece = "white-square"
            //console.log("color: " + colorOfPiece)
          } else if(piece < 45) {
            colorOfPiece = "orange-square"
            //console.log("color: " + colorOfPiece)
          } else if(piece < 54) {
            colorOfPiece = "red-square"
            //console.log("color: " + colorOfPiece)
          }
          myColorArray[side][row][column] = colorOfPiece
        }
      }
    }
    return myColorArray
  }

  
  render() {  

    let buttonClick = () => {
      console.log('button clicked');

      if (this.state.solved && !this.state.pressed) {
        console.log("true - getting cube and solution")
        this.setState({
          pressed: true
        });
        axios.get('https://spheres-cubed.herokuapp.com/scrambled').then(response => {
          console.log("SUCCESS", response)
          colorArray = this.setColorArray(colorArray, response.data.cube)
          let sol = response.data.solution
          this.setState({
            solved: !this.state.solved,
            pressed: false,
            solution: sol,
            first: false
          });
        }).catch(error => {
          console.log("ERROR", error)
          const cubeArray = [
            [[0, 1, 2],
            [3, 4, 5],
            [51, 52, 53]],
          
            [[9, 10, 11],
            [12, 13, 14],
            [42, 43, 44]],
          
            [[18, 19, 20],
            [21, 22, 23],
            [24, 25, 26]],
          
            [[29, 32, 35],
            [28, 31, 34],
            [27, 30, 33]],
          
            [[36, 37, 38],
            [39, 40, 41],
            [6, 7, 8]],
          
            [[45, 46, 47],
            [48, 49, 50],
            [15, 16, 17]]];
          colorArray = this.setColorArray(colorArray, cubeArray)
          console.log(colorArray)
          this.setState({
            solved: !this.state.solved,
            pressed: false,
            solution: ["1. Solve White Face", "2. Solve Two Rows", "4. Solve top face", "5. Finish Cube"]
          });
        });
      } else if (!this.state.pressed) {
        this.setState({
          pressed: true
        });
        console.log("false - showing solved")
        this.setState({
          solved: !this.state.solved,
          pressed: false
        });
      }

    }

    let solveClicked = () => {
      this.setState({
        solved: !this.state.solved
      })
    }
    const showSolved = this.state.solved;
    const showLoading = this.state.pressed;
    const solution = this.state.solution
    const firstSolve = this.state.first
    
    const darkMode = this.props.darkModeToggle;


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
            {/* get this stuff from backend as well. */}
            <h1>Solution:</h1>
            {solution.map(paragraph => <p>{paragraph}</p>)}
          </div>)
        }
      </div>  
    );
  }
}

class Credits extends Component {
  render() {

    const darkMode = this.props.darkModeToggle;
    return (
      <div className={`footer ${darkMode ? "text-dark" : "text-light"}`}>
        <p> Created By: Spheres³ | Saloni • Aashi • Nikhila • Rishi • Akaash</p>
      </div>
    )
  }
}

class Toggle extends Component {
  constructor() {
      super();
      this.state = {
        dark: true
      };
    }
    render() {
  
      let switchMode = () => {
        this.setState({
          dark: !this.state.dark
        })
        console.log("Mode swiched to " + this.state.dark)

        if (this.state.dark) {
          document.body.style.backgroundColor = "#dadada";
        } else {
          document.body.style.backgroundColor = "#282c34";
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
      );
    }
}


ReactDOM.render(
  <React.StrictMode>
    <Toggle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
