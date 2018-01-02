import * as THREE from 'three';
import * as CANNON from 'cannon';
import mesh2shape from 'three-to-cannon';

import { onKeyDown, onKeyUp } from './onKeyPress.js';

import OBJLoader from 'three-react-obj-loader';
import reducedShip from '../obj/reducedPirate.obj';

export default context => {
  context.dt = 1 / 60; // timeStep
  context.inputVelocity = new THREE.Vector3();

  // For the mass calculation
  // const density = 2515; // kg/m^3
  // const mass = density * shape.volume(); // M=p*V

  // Setup our world
  context.world = new CANNON.World();
  context.world.gravity.set(0, -9.82, 0); // -9.82 m/s²
  context.world.broadphase = new CANNON.NaiveBroadphase();
  context.world.solver.iterations = 10;
  context.world.defaultContactMaterial.contactEquationStiffness = 1e8;
  context.world.defaultContactMaterial.contactEquationRegularizationTime = 2;

  // Create a sphere
  const radius = 1; // m
  context.sphereBody = new CANNON.Body({
    mass: 1, // kg
    position: new CANNON.Vec3(0, 5, 15), // m
    shape: new CANNON.Sphere(radius)
  });
  context.velocity = context.sphereBody.velocity;
  context.sphereBody.linearDamping = context.sphereBody.angularDamping = 0.4;
  context.world.addBody(context.sphereBody);

  // Add an initial impulse to the front
  // context.frontPoint = new CANNON.Vec3(0, 0, -4300);
  // context.initialForce = new CANNON.Vec3(0, -40000, 0);
  // context.sphereBody.applyForce(context.initialForce, context.frontPoint);

  // Create a hidden ground
  context.groundBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -10, 0),
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
    context.sphereBody.position.set(0, 5, 15);
    context.sphereBody.quaternion.copy(new THREE.Quaternion());
    // context.sphereBody.applyForce(context.initialForce, context.frontPoint);
  });

  context.world.addBody(context.groundBody);

  // Create a platform 1
  const platform1 = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, -0.4, 0),
    shape: new CANNON.Box(new CANNON.Vec3(15, 1, 15))
  });
  context.world.addBody(platform1);

  // Create a solid ship hull
  const onProgress = xhr => {
    if (xhr.lengthComputable) {
      // console.log( Math.round(xhr.loaded / xhr.total * 100, 2) + '% downloaded' );
    }
  };
  const onError = xhr => {
    console.log(xhr);
  };
  const objLoader = new OBJLoader();

  objLoader.load(
    reducedShip,
    object => {
      context.shipBody = new CANNON.Body({
        mass: 0,
        shape: mesh2shape(object, { type: mesh2shape.Type.MESH })
      });
      context.world.addBody(context.shipBody);
    },
    onProgress,
    onError
  );

  // Handling a key press
  document.addEventListener(
    'keydown',
    e => {
      onKeyDown(e, context);
    },
    false
  );
  document.addEventListener(
    'keyup',
    e => {
      onKeyUp(e, context);
    },
    false
  );

  // Start the timer
  context.setState({ startTimer: true });
};
