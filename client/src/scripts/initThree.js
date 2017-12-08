import * as THREE from 'three';

import OrbitControls from 'three-orbitcontrols';

import loadSkyBox from '../scripts/skyBox.js';
import loadShip from '../scripts/loadShip.js';

export default (context) => {
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
    3000000
  );
  context.camera.position.set(0, 750, -3500);

  // Orbit Controls
  context.controls = new OrbitControls(context.camera, context.renderer.domElement);
  context.controls.enablePan = true;
  context.controls.minDistance = 1000.0;
  context.controls.maxDistance = 9000.0; // 5000
  context.controls.maxPolarAngle = Math.PI * 1; // 0.495
  context.controls.keys = { LEFT: 65, UP: 87, RIGHT: 68, BOTTOM: 83 };
  // context.controls.target.set( 0, 500, 0 );
  context.controls.update();

  // Light
  const light = new THREE.DirectionalLight(0xffffbb, 3);
  light.position.set(-1, 3, -5);
  context.scene.add(light);
  context.scene.add(new THREE.AmbientLight(0x777777));

  // Skybox
  loadSkyBox(context);

  // Ship
  loadShip(context);

  // Sphere
  const icosahedronGeometry = new THREE.IcosahedronGeometry(200, 3);

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

  // Platform 1
  const pf1Geometry = new THREE.BoxGeometry(2000, 1, 6000);
  const pf1Material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 100,
    envMap: context.cubeMap
  });
  const platform1 = new THREE.Mesh(pf1Geometry, pf1Material);
  platform1.position.set(0, -1000, -2000);
  context.scene.add(platform1);

  // Platform 2
  // const pf2Geometry = new THREE.BoxGeometry(2000, 1, 4000);
  // const pf2Material = new THREE.MeshPhongMaterial({
  //   color: 0xff7700,
  //   shininess: 100,
  //   envMap: context.cubeMap
  // });
  // const platform2 = new THREE.Mesh(pf2Geometry, pf2Material);
  // platform2.position.set(1707, -293, 3000);
  // platform2.rotation.z = Math.PI / 4;
  // context.scene.add(platform2);

  // Platform 3
  // const pf3Geometry = new THREE.BoxGeometry(2000, 1, 4000);
  // const pf3Material = new THREE.MeshPhongMaterial({
  //   color: 0xff3300,
  //   shininess: 100,
  //   envMap: context.cubeMap
  // });
  // const platform3 = new THREE.Mesh(pf3Geometry, pf3Material);
  // platform3.position.set(2915, 1280, 7000);
  // platform3.rotation.z = Math.PI / 3;
  // context.scene.add(platform3);

  // Gate 1-1
  // const gtGeometry = new THREE.BoxGeometry(2000, 50, 6000);
  // const gt3Material = new THREE.MeshPhongMaterial({
  //   color: 0xff0000,
  //   shininess: 100,
  //   envMap: context.cubeMap
  // });
  // const gateL1 = new THREE.Mesh(gtGeometry, gt3Material);
  // gateL1.position.set(2000, 2260, 9025);
  // gateL1.rotation.x = Math.PI / 2;
  // context.scene.add(gateL1);
  
    
  window.addEventListener('resize', () => {
    context.camera.aspect = window.innerWidth / window.innerHeight;
    context.camera.updateProjectionMatrix();
    context.renderer.setSize(window.innerWidth, window.innerHeight);
  }, false);
}