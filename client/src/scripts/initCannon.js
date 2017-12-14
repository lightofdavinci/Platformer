import * as THREE from 'three';
import * as CANNON from 'cannon';

import { onKeyDown, onKeyUp } from './onKeyPress.js';

export default (context) => {
  context.dt = 1 / 60; // timeStep
  context.inputVelocity = new THREE.Vector3();

  // For the mass calculation
  // const density = 2515; // kg/m^3
  // const mass = density * shape.volume(); // M=p*V

  // Setup our world
  context.world = new CANNON.World();
  context.world.gravity.set(0, -800, 0); // -9.82 m/s²
  context.world.broadphase = new CANNON.NaiveBroadphase();
  context.world.solver.iterations = 10;
  context.world.defaultContactMaterial.contactEquationStiffness = 1e8;
  context.world.defaultContactMaterial.contactEquationRegularizationTime = 10;

  // Create a sphere
  const radius = 200; // m
  context.sphereBody = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(0, 500, -4500), // m
    shape: new CANNON.Sphere(radius)
  });
  context.velocity = context.sphereBody.velocity;
  context.sphereBody.linearDamping = context.sphereBody.angularDamping = 0.4;
  context.world.addBody(context.sphereBody);

  // Add an initial impulse to the front
  context.frontPoint = new CANNON.Vec3(0, 0, -4300);
  context.initialForce = new CANNON.Vec3(0, -40000, 0);
  context.sphereBody.applyForce(context.initialForce, context.frontPoint);

  // Create a hidden ground
  context.groundBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -2000, 0),
    shape: new CANNON.Plane()
  });
  context.groundBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );

  // Respawn
  context.groundBody.addEventListener('collide', e => {
    context.velocity.set(0, 0, 0);
    context.inputVelocity.set(0, 0, 0);
    context.sphereBody.angularVelocity.set(0, 0, 0);
    context.sphereBody.position.set(0, 500, -4500);
    context.sphereBody.quaternion.copy(new THREE.Quaternion());
    context.sphereBody.applyForce(context.initialForce, context.frontPoint);
  });

  context.world.addBody(context.groundBody);

  // Create a platform 1
  const platform1 = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -1000, -2000),
    shape: new CANNON.Box(new CANNON.Vec3(1000, 1, 3000))
  });
  context.world.addBody(platform1);

  // Create a platform 2
  // const platform2 = new CANNON.Body({
  //   mass: 0,
  //   position: new CANNON.Vec3(1707, -293, 3000),
  //   shape: new CANNON.Box(new CANNON.Vec3(1000, 1, 2000))
  // });
  // platform2.quaternion.setFromAxisAngle(
  //   new CANNON.Vec3(0, 0, 1),
  //   Math.PI / 4
  // );
  // this.world.addBody(platform2);

  // Create a platform 3
  // const platform3 = new CANNON.Body({
  //   mass: 0,
  //   position: new CANNON.Vec3(2915, 1280, 7000),
  //   shape: new CANNON.Box(new CANNON.Vec3(1000, 1, 2000))
  // });
  // platform3.quaternion.setFromAxisAngle(
  //   new CANNON.Vec3(0, 0, 1),
  //   Math.PI / 3
  // );
  // this.world.addBody(platform3);

  // Create a Gate 1-1
  // const gateL1 = new CANNON.Body({
  //   mass: 0,
  //   position: new CANNON.Vec3(2000, 2410, 9025),
  //   shape: new CANNON.Box(new CANNON.Vec3(1000, 25, 3000))
  // });
  // gateL1.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  // this.world.addBody(gateL1);
  
  // Handling a key press
  document.addEventListener('keydown', (e) => { onKeyDown(e, context); }, false);
  document.addEventListener('keyup', (e) => { onKeyUp(e, context); }, false);

  // Start the timer
  context.setState({ startTimer: true });
};