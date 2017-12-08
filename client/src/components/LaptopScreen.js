import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import OBJLoader from "three-react-obj-loader";
import Detector from '../scripts/detector';

// Dragon with pearl(https://sketchfab.com/models/93d65f56fdd34311ad55112f90ba4a82) by Artec 3D(https://sketchfab.com/artec3d) is licensed under CC Attribution-ShareAlike(http://creativecommons.org/licenses/by-sa/4.0/)
import dragonObj from '../obj/dragon.obj';
import particleTexture from '../obj/particle.png';

import '../styles/LaptopScreen.css';

class LaptopScreen extends Component {
  constructor() {
    super();
    this.state = {
      hiddenCanvas: { display: 'none' },
      loadingPercentage: '0%'
    };
  }
  render() {
    return (
      <div className="Laptop-screen">
        <div id="Laptop-canvas" style={this.state.hiddenCanvas} />
        <h4>{this.state.loadingPercentage} LOADING</h4>
        <div className="Laptop-progress-wrapper">
          <div
            className="Laptop-progress-bar"
            style={{ width: this.state.loadingPercentage }}
          />
        </div>
      </div>
    );
  }
  init = () => {
    this.container = document.getElementById('Laptop-canvas');

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(45, 380 / 210, 1, 1000);
    this.camera.position.z = 15;
    this.camera.position.y = 5;

    /* Scene */
    this.scene = new THREE.Scene();
    const light = new THREE.HemisphereLight(0xe6e4be, 0x111111, 1);
    this.scene.add(light);

    /* Model */
    const objLoader = new OBJLoader();
    objLoader.load(
      dragonObj,
      dragon => {
        dragon.position.y = 1;
        this.scene.add(dragon);
        setTimeout(() => {
          this.setState({ hiddenCanvas: { display: 'block' } });
        }, 300);
      },
      xhr => {
        const loaded = Math.round(xhr.loaded / xhr.total * 100) + '%';
        this.setState({ loadingPercentage: loaded });
      }
    );

    // create the particle variables
    const particleCount = 1800;
    const particles = new THREE.Geometry();
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 16,
      map: new THREE.TextureLoader().load(particleTexture),
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    // create the individual particles
    for (let p = 0; p < particleCount; p++) {
      // create a particle with random
      // position values, -250 -> 250
      const pX = Math.random() * 500 - 250;
      const pY = Math.random() * 500 - 250;
      const pZ = Math.random() * 500 - 250;
      this.particle = new THREE.Vector3(pX, pY, pZ);

      // add it to the geometry
      particles.vertices.push(this.particle);
    }

    // create the particle system
    this.particleSystem = new THREE.Points(particles, pMaterial);

    // also update the particle system to
    // sort the particles which enables
    // the behaviour we want
    this.particleSystem.sortParticles = true;

    // add it to the scene
    this.scene.add(this.particleSystem);

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(380, 210);
    this.renderer.setClearColor(new THREE.Color('hsl(30, 20%, 10%)'));
    this.container.appendChild(this.renderer.domElement);

    /* Controls */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = false;
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderCanvas();
  };
  renderCanvas = () => {
    this.particleSystem.rotation.y += 0.0005;
    this.renderer.render(this.scene, this.camera);
  };
  componentDidMount() {
    if (!Detector.webgl) {
      const warning = Detector.getWebGLErrorMessage();
      document.getElementById('Laptop-screen').appendChild(warning);
      this.setState({ hiddenCanvas: { display: 'block' } });
    }
    this.init();
    this.animate();
  }
}

export default LaptopScreen;
