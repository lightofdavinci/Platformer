import * as THREE from 'three';

import OBJLoader from "three-react-obj-loader";
import MTLLoader from "three-react-mtl-loader";

// Tiki Treasure!(https://sketchfab.com/models/cbcf188a01f54d63a10f10c227c5a6ff) by glenatron(https://sketchfab.com/glenatron) is licensed under CC Attribution(http://creativecommons.org/licenses/by/4.0/)
import shipObj from '../obj/pirate.obj';
import shipMtl from '../obj/pirate.mtl';
import { shipTextures } from '../textures/shipTextures.js';

export default (context) => {
  const onProgress = (xhr) => {
    if (xhr.lengthComputable) {
      console.log( Math.round(xhr.loaded / xhr.total * 100, 2) + '% downloaded' );
    }
  };
  const onError = (xhr) => { console.log(xhr) };
  const mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath( process.env.PUBLIC_URL + '../textures/'); // temp fix for console
  mtlLoader.load(shipMtl, (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(shipObj, (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh){
              if (child.material.name === 'emissive') return;
              for (let i = 0; i < shipTextures.length; i++) {
                child.material[i].map = new THREE.TextureLoader().load(shipTextures[i]);
              }               
          }
      });
      context.scene.add(object);
    }, onProgress, onError);
  });
}