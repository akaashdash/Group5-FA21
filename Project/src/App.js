import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    const darkMode = this.props.darkModeToggle;

    return (
      <div className={`App ${darkMode ? "background-dark" : "background-light"}`}>
        <header>
          <p className={`App-header ${darkMode ? "text-dark" : "text-light"}`}>
            Rubiks Cube Solver
          </p>
          <p className={`description ${darkMode ? "text-dark" : "text-light"}`}>
            description here
          </p>
        </header>
      </div>
    );
  }
}



export default App;
