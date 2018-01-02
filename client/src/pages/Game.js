import React, { Component } from 'react';
import GameNav from '../components/GameNav';
import Timer from '../components/Timer';

import initThree from '../scripts/initThree.js';
import initCannon from '../scripts/initCannon.js';

class Game extends Component {
  constructor() {
    super();
    this.state = { startTimer: false };
  }
  render() {
    return (
      <div className="App" id="Game">
        <GameNav />
        {this.state.startTimer ? <Timer /> : ''}
      </div>
    );
  }

  componentDidMount() {
    initThree(this);
    initCannon(this);
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.shipBody) {
      this.updatePhysics();
      this.renderGame();
    }
  };

  updatePhysics = () => {
    this.delta *= 0.1;

    this.inputVelocity.set(0, 0, 0);

    if (this.moveForward) {
      this.inputVelocity.z = -0.1 * this.delta;
    }
    if (this.moveBackward) {
      this.inputVelocity.z = 0.1 * this.delta;
    }

    if (this.moveLeft) {
      this.inputVelocity.x = -0.1 * this.delta;
    }
    if (this.moveRight) {
      this.inputVelocity.x = 0.1 * this.delta;
    }

    // Add to the object
    this.velocity.x += this.inputVelocity.x;
    this.velocity.z += this.inputVelocity.z;

    // Step the physics world
    this.world.step(this.dt);

    // Copy coordinates from Cannon.js to Three.js
    this.sphere.position.copy(this.sphereBody.position);
    this.sphere.quaternion.copy(this.sphereBody.quaternion);
  };

  renderGame = () => {
    // this.camera.lookAt(this.sphere.position);
    // this.camera.position.z = this.sphere.position.z - 2000;
    // this.camera.position.x = this.sphere.position.x;
    // this.camera.position.y = this.sphere.position.y + 450;

    this.delta = Date.now() - this.time;
    this.renderer.render(this.scene, this.camera);
    this.time = Date.now();
  };
}

export default Game;
