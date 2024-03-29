import * as THREE from 'three';

import OrbitControls from 'three-orbitcontrols';

import loadSkyBox from '../scripts/skyBox.js';
import { loadShip } from '../scripts/loadShip.js';

export default context => {
  context.container = document.getElementById('Game');

  // Renderer
  context.renderer = new THREE.WebGLRenderer({ antialias: true });
  context.renderer.setPixelRatio(window.devicePixelRatio);
  context.renderer.setSize(window.innerWidth, window.innerHeight);
  context.container.appendChild(context.renderer.domElement);

  // Scene
  context.scene = new THREE.Scene();

  // Camera
  context.camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.5,
    3000000 // 3000000
  );
  context.camera.position.set(0, 13, 30);

  // Orbit Controls
  context.controls = new OrbitControls(
    context.camera,
    context.renderer.domElement
  );
  context.controls.enablePan = true;
  context.controls.minDistance = 10.0; // 1000
  context.controls.maxDistance = 500.0; // 9000
  context.controls.maxPolarAngle = Math.PI * 1; // 0.495
  context.controls.keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83 };
  // context.controls.target.set( 0, 500, 0 );
  context.controls.update();

  // Light
  const light = new THREE.DirectionalLight(0xffffbb, 3);
  light.position.set(-1, 4, 20);
  context.scene.add(light);
  context.scene.add(new THREE.AmbientLight(0x777777));

  // Skybox
  loadSkyBox(context);

  // Ship
  loadShip(context);

  // Sphere
  const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 2);

  for (let i = 0, j = icosahedronGeometry.faces.length; i < j; i++) {
    icosahedronGeometry.faces[i].color.setHex(Math.random() * 0xffffff);
  }

  const icosahedronMaterial = new THREE.MeshPhongMaterial({
    vertexColors: THREE.FaceColors,
    shininess: 100,
    envMap: context.cubeMap
  });

  context.sphere = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
  context.scene.add(context.sphere);

  // Flag
  const flagGeometry = new THREE.BoxGeometry(1, 1, 1);
  const flagMaterial = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100,
    envMap: context.cubeMap
  });
  const flag = new THREE.Mesh(flagGeometry, flagMaterial);
  flag.position.set(-6, 14, 2.2);
  flag.rotateX(4);
  context.scene.add(flag);

  // Resize
  window.addEventListener(
    'resize',
    () => {
      context.camera.aspect = window.innerWidth / window.innerHeight;
      context.camera.updateProjectionMatrix();
      context.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );
};
