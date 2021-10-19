import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cube from 'react-3d-cube'

{/* Creates the Cube 
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
*/}
var color_number = 0;

class MyCube extends Component {
  constructor() {
    super();

    this.state = {
      color: 0
    }  

  }

  changeColor() {
    if(color_number == 5) {
      color_number = 0
    } else {
      color_number++;
    }
    console.log('color change!' + color_number);
    this.setState({
      color: color_number
    })
    console.log("color:" + this.state.color);

    this.render()
  
  }

  render () {
    let newClass = "white-square"   
    let newColor = this.state.color
    
    if(newColor == 0) {
      newClass = "white-square"
    } else if(newColor == 1) {
      newClass = "green-square"
    } else if(newColor == 2) {
      newClass = "orange-square"
    } else if(newColor == 3) {
      newClass = "blue-square"
    } else if(newColor == 4) {
      newClass = "red-square"
    } else if(newColor == 5) {
      newClass = "yellow-square"
    }
    console.log(newClass)


    return (
      <div className = "render-cube">
        <center>
          <div style={{width: 300, height: 300}}>
            <h1> {newClass} </h1>
            <button className={newClass} onClick={this.changeColor.bind(this)}> </button>
            <Cube size={300} index="front">
              <div style={{width: '300px', height: '300px'}}> 
                {/* The problem here is that the button isnt changing color when its inside the cube... --> it works fine outside the cube tho.*/}
                <button className={newClass} onClick={this.changeColor.bind(this)}> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> {/* keep */} </button> 
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
                <button className="white-square"> </button>
              </div>
              <div style={{backgroundColor: 'blue', width: '300px', height: '300px'}}> 
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square">  {/* keep */} </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
                <button className="blue-square"> </button>
              </div>
              <div style={{backgroundColor: 'yellow', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'green', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'orange', width: '300px', height: '300px'}}> 
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
              <div style={{backgroundColor: 'red', width: '300px', height: '300px'}}> 
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> {/* keep */} </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
              </div>
            </Cube>
          </div>
        </center>
      </div>
    )
  }
}

{/*Holds the solve button and the instructions to solve A cube*/}
class SolveButton extends Component {

  state = {
    isHidden: false,
  }

  

  render() {

    var solveClicked = e => {
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


ReactDOM.render(
  <React.StrictMode>
    <App />
    <MyCube />
    <SolveButton />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
