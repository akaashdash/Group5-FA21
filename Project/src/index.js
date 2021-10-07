import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as THREE from 'three';

class Cube extends Component {
  render() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGL1Renderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00DDFF });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    const light = new THREE.HemisphereLight( 0x0000FF, 0x0055FF, 1 );

    scene.add(light);

    camera.position.z = 2;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;  // I think you'd put the on click and drag stuff here to move the cube around
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
      renderer.render( scene, camera );
    };
    animate();

    console.log("I'm here!")
    return(
      <div />
    );
  }

 /*  render() {
    return (
      <div/>
    );
  } */
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Cube />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
