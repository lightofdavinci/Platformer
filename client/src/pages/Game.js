import React, { Component } from 'react';
import GameNav from '../components/GameNav';
import Timer from '../components/Timer';

import * as CANNON from 'cannon';
import * as THREE from 'three';


import OrbitControls from 'three-orbitcontrols';
import skyboxtexture from '../images/skybox.png';

// Monteriggioni: HIGH quality(https://sketchfab.com/models/628f90b70c5547a5852862265c9b1f34) by omnidirectional(https://sketchfab.com/omnidirectional) is licensed under CC Attribution(http://creativecommons.org/licenses/by/4.0/)
// import monteriggioniObj from '../obj/test.obj';
// import monteriggioniMaterial from '../obj/test.mtl';

// import * as OBJLoader from 'three-obj-loader';
// import * as MTLLoader from 'three-mtl-loader';

// OBJLoader(THREE);
// MTLLoader(THREE);

class Game extends Component {
  constructor() {
    super();
    this.THREE = THREE;
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
    this.init();
    this.initCannon();
    this.animate();
  }

  init = () => {
    this.container = document.getElementById('Game');

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.5,
      3000000
    );
    this.camera.position.set(0, 750, -3500);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = true;
    this.controls.minDistance = 1000.0;
    this.controls.maxDistance = 9000.0; // 5000
    this.controls.maxPolarAngle = Math.PI * 1; // 0.495
    this.controls.keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83 };
    // this.controls.target.set( 0, 500, 0 );
    this.controls.update();

    // Light
    const light = new THREE.DirectionalLight(0xffffbb, 3);
    light.position.set(-1, 3, -5);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x777777, 4));

    // Skybox
    this.cubeMap = new THREE.CubeTexture([]);
    this.cubeMap.format = THREE.RGBFormat;

    this.imgLoader = new THREE.ImageLoader();
    this.imgLoader.load(skyboxtexture, image => {
      const getSide = function(x, y) {
        const size = 1024;

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext('2d');
        context.drawImage(image, -x * size, -y * size);

        return canvas;
      };

      this.cubeMap.images[0] = getSide(2, 1); // px
      this.cubeMap.images[1] = getSide(0, 1); // nx
      this.cubeMap.images[2] = getSide(1, 0); // py
      this.cubeMap.images[3] = getSide(1, 2); // ny
      this.cubeMap.images[4] = getSide(1, 1); // pz
      this.cubeMap.images[5] = getSide(3, 1); // nz
      this.cubeMap.needsUpdate = true;
    });

    const cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = this.cubeMap;

    const skyBoxMaterial = new THREE.ShaderMaterial({
      fragmentShader: cubeShader.fragmentShader,
      vertexShader: cubeShader.vertexShader,
      uniforms: cubeShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    const skyBox = new THREE.Mesh(
      new THREE.BoxGeometry(1000000, 1000000, 1000000),
      skyBoxMaterial
    );

    this.scene.add(skyBox);

    // Sphere
    const icosahedronGeometry = new THREE.IcosahedronGeometry(300, 3);

    for (let i = 0, j = icosahedronGeometry.faces.length; i < j; i++) {
      icosahedronGeometry.faces[i].color.setHex(Math.random() * 0xffffff);
    }

    const icosahedronMaterial = new THREE.MeshPhongMaterial({
      vertexColors: THREE.FaceColors,
      shininess: 100,
      envMap: this.cubeMap
    });

    this.sphere = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    this.scene.add(this.sphere);

    // Platform 1
    const pf1Geometry = new THREE.BoxGeometry(2000, 1, 6000);
    const pf1Material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      shininess: 100,
      envMap: this.cubeMap
    });
    const platform1 = new THREE.Mesh(pf1Geometry, pf1Material);
    platform1.position.set(0, -1000, -2000);
    this.scene.add(platform1);

    // Platform 2
    // const pf2Geometry = new THREE.BoxGeometry(2000, 1, 4000);
    // const pf2Material = new THREE.MeshPhongMaterial({
    //   color: 0xff7700,
    //   shininess: 100,
    //   envMap: this.cubeMap
    // });
    // const platform2 = new THREE.Mesh(pf2Geometry, pf2Material);
    // platform2.position.set(1707, -293, 3000);
    // platform2.rotation.z = Math.PI / 4;
    // this.scene.add(platform2);

    // Platform 3
    // const pf3Geometry = new THREE.BoxGeometry(2000, 1, 4000);
    // const pf3Material = new THREE.MeshPhongMaterial({
    //   color: 0xff3300,
    //   shininess: 100,
    //   envMap: this.cubeMap
    // });
    // const platform3 = new THREE.Mesh(pf3Geometry, pf3Material);
    // platform3.position.set(2915, 1280, 7000);
    // platform3.rotation.z = Math.PI / 3;
    // this.scene.add(platform3);

    // Gate 1-1
    // const gtGeometry = new THREE.BoxGeometry(2000, 50, 6000);
    // const gt3Material = new THREE.MeshPhongMaterial({
    //   color: 0xff0000,
    //   shininess: 100,
    //   envMap: this.cubeMap
    // });
    // const gateL1 = new THREE.Mesh(gtGeometry, gt3Material);
    // gateL1.position.set(2000, 2260, 9025);
    // gateL1.rotation.x = Math.PI / 2;
    // this.scene.add(gateL1);
    
    // monteriggioniObj 
    // monteriggioniMaterial
    // const onProgress = (xhr) => {
    //   if (xhr.lengthComputable) {
    //     console.log( Math.round(xhr.loaded / xhr.total * 100, 2) + '% downloaded' );
    //   }
    // };
    // const onError = (xhr) => { console.log(xhr) };
    // const mtlLoader = new this.THREE.MTLLoader();
    // mtlLoader.setBaseUrl( process.env.PUBLIC_URL + 'obj/' );
    // mtlLoader.setPath( process.env.PUBLIC_URL + 'obj/' );
    // mtlLoader.load(monteriggioniMaterial, (materials) => {
    //   materials.preload();
    //   const objLoader = new this.THREE.OBJLoader();
    //   objLoader.setMaterials(materials);
    //   objLoader.load(monteriggioniObj, (object) => {
    //     object.position.z = -595;
    //     object.scale.set(100,100,100);
    //     this.scene.add(object);
    //   }, onProgress, onError);
    // });
     //
    window.addEventListener('resize', this.onWindowResize, false);
  };

  initCannon = () => {
    this.dt = 1 / 60; // timeStep
    this.inputVelocity = new THREE.Vector3();

    // Setup our world
    this.world = new CANNON.World();
    this.world.gravity.set(0, -800, 0); // -9.82 m/s²
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;
    this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
    this.world.defaultContactMaterial.contactEquationRegularizationTime = 10;

    // Create a sphere
    const radius = 300; // m
    this.sphereBody = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(0, 500, -4500), // m
      shape: new CANNON.Sphere(radius)
    });
    this.velocity = this.sphereBody.velocity;
    this.sphereBody.linearDamping = this.sphereBody.angularDamping = 0.4;
    this.world.addBody(this.sphereBody);

    // Add an initial impulse to the front
    this.frontPoint = new CANNON.Vec3(0, 0, -4000);
    this.initialForce = new CANNON.Vec3(0, -50000, 0);
    this.sphereBody.applyForce(this.initialForce, this.frontPoint);

    // Create a hidden ground
    this.groundBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -2000, 0),
      shape: new CANNON.Plane()
    });
    this.groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    );

    // Respawn
    this.groundBody.addEventListener('collide', e => {
      this.velocity.set(0, 0, 0);
      this.inputVelocity.set(0, 0, 0);
      this.sphereBody.angularVelocity.set(0, 0, 0);
      this.sphereBody.position.set(0, 500, -4500);
      this.sphereBody.quaternion.copy(new THREE.Quaternion());
      this.sphereBody.applyForce(this.initialForce, this.frontPoint);
    });

    this.world.addBody(this.groundBody);

    // Create a platform 1
    const platform1 = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, -1000, -2000),
      shape: new CANNON.Box(new CANNON.Vec3(1000, 1, 3000))
    });
    this.world.addBody(platform1);

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
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);

    // Start the timer
    this.setState({ startTimer: true });
  };

  onKeyDown = e => {
    switch (e.keyCode) {
      case 38: // up
        this.moveForward = true;
        break;
      case 37: // left
        this.moveLeft = true;
        break;
      case 40: // down
        this.moveBackward = true;
        break;
      case 39: // right
        this.moveRight = true;
        break;
      default:
        break;
    }
  };

  onKeyUp = e => {
    switch (e.keyCode) {
      case 38: // up
        this.moveForward = false;
        break;
      case 37: // left
        this.moveLeft = false;
        break;
      case 40: // down
        this.moveBackward = false;
        break;
      case 39: // right
        this.moveRight = false;
        break;
      default:
        break;
    }
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.updatePhysics();
    this.renderGame();
  };

  updatePhysics = () => {
    this.delta *= 0.1;

    this.inputVelocity.set(0, 0, 0);

    if (this.moveForward) {
      this.inputVelocity.z = 22 * this.delta;
    }
    if (this.moveBackward) {
      this.inputVelocity.z = -22 * this.delta;
    }

    if (this.moveLeft) {
      this.inputVelocity.x = 22 * this.delta;
    }
    if (this.moveRight) {
      this.inputVelocity.x = -22 * this.delta;
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
    // var time = performance.now() * 0.001;
    // sphere.position.y = Math.sin( time ) * 500 + 250;
    // sphere.rotation.x = time * 0.5;
    // this.camera.lookAt(this.sphere.position);
    // this.camera.position.z = this.sphere.position.z - 3500;
    // this.camera.position.x = this.sphere.position.x;
    // this.camera.position.y = this.sphere.position.y + 750;

    this.delta = Date.now() - this.time;
    this.renderer.render(this.scene, this.camera);
    this.time = Date.now();
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}

export default Game;
