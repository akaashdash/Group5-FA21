import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cube from 'react-3d-cube'

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
            <Cube size={300} index="left">
              <div style={{width: '300px', height: '300px'}}>  
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
              <div style={{backgroundColor: 'blue', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'yellow', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'green', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'orange', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'red', width: '300px', height: '300px'}}> 
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
            <Cube size={300} index="left">
              <div style={{width: '300px', height: '300px'}}>  
                {makeSquares(0, colorArray)}
              </div>
              <div style={{width: '300px', height: '300px'}}> 
                {makeSquares(5, colorArray)}
              </div>
              <div style={{width: '300px', height: '300px'}}> 
                {makeSquares(1, colorArray)}
              </div>
              <div style={{width: '300px', height: '300px'}}> 
                {makeSquares(4, colorArray)}
              </div> 
              <div style={{width: '300px', height: '300px'}}> 
                {makeSquares(2, colorArray)}
              </div>
              <div style={{width: '300px', height: '300px'}}> 
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
      this.setState({
        solved: !this.state.solved,
        first: false
      });

      // this is when we'll get data from backend about shuffled cube, but currently its sample data.
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
      
      console.log(cubeArray)
      colorArray = this.setColorArray(colorArray, cubeArray)
      console.log(colorArray)
    }

    const showSolved = this.state.solved;
    const firstSolve = this.state.first;

    return(
      <div className="solve-container">
        {showSolved && <button className="shuffle-button" onClick={buttonClick}> Shuffle Cube </button>}
        {!showSolved && <button className="solve-button" onClick={buttonClick}> Solve Cube </button> }
        {showSolved && <SolvedCube/>}
        {!showSolved && <ShuffledCube/>}
        { 
          showSolved && !firstSolve && (
          <div className="solution"> 
            {/* get this stuff from backend as well. */}
            <h1>Solution:</h1>
            <p> 1. Solve White Face</p>
            <p> 2. Solve Two Rows</p>
            <p> 4. Solve top face</p>
            <p> 5. Finish Cube</p>
          </div>)
        }
      </div>  
    );
  }
}

/*
/*Holds the solve button and the instructions to solve A cube
class SolveButton extends Component {

  state = {
    isHidden: false,
  }

  render() {
    let solveClicked = e => {
      console.log('solve button clicked');
      this.setState({
        isHidden: !this.state.isHidden
      });
    }
    
    const show = this.state.isHidden;

    return(
      <div className="solve-container">
        <button className="solve-button" onClick={solveClicked}>{show? "Hide Solution" : "Solve"} </button>
        { 
          show && (
          <div className="solution"> 
            <h1>Solution:</h1>
            <p> 1. Solve White Face</p>
            <p> 2. Solve Two Rows</p>
            <p> 4. Solve top face</p>
            <p> 5. Finish Cube</p>
          </div>)
        }
      </div>
        
    );
  }
}
*/


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Buttons />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
