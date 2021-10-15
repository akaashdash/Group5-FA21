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

*/}
class MyCube extends Component {
  render () {
    return (
      <div className = "render-cube">
        <center>
          <div style={{width: 300, height: 300}}>

            <Cube size={300} index="front" >
              <div style={{backgroundColor: 'white', width: '300px', height: '300px'}}> 
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
                <button className="red-square"> </button>
              </div>
              <div style={{backgroundColor: 'blue', width: '300px', height: '300px'}}> 
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
              </div>
              <div style={{backgroundColor: 'yellow', width: '300px', height: '300px'}}> 
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
              </div>
              <div style={{backgroundColor: 'green', width: '300px', height: '300px'}}> 
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
              </div> 
              <div style={{backgroundColor: 'orange', width: '300px', height: '300px'}}> 
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
              </div>
              <div style={{backgroundColor: 'red', width: '300px', height: '300px'}}> 
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
                <button className="square"> </button>
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
