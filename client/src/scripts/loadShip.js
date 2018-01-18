import * as THREE from 'three';
import * as CANNON from 'cannon';

import OBJLoader from 'three-react-obj-loader';
// it couldn't minify es6 script of mtl loader, therefore
import MTLLoader from './esfMtlLoader';
import mesh2shape from 'three-to-cannon';

// Tiki Treasure!(https://sketchfab.com/models/cbcf188a01f54d63a10f10c227c5a6ff) by glenatron(https://sketchfab.com/glenatron) is licensed under CC Attribution(http://creativecommons.org/licenses/by/4.0/)
import shipObj from '../obj/pirate.obj';
import shipMtl from '../obj/pirate.mtl';
import { shipTextures } from '../textures/shipTextures.js';
import reducedShip from '../obj/reducedPirate.obj';

export const loadShip = context => {
  const onProgress = xhr => {
    if (xhr.lengthComputable) {
      console.log(
        Math.round(xhr.loaded / xhr.total * 100, 2) +
          '% downloaded three.js ship'
      );
    }
  };
  const onError = xhr => {
    console.log(xhr);
  };
  const mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath('../textures/');
  mtlLoader.load(shipMtl, materials => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      shipObj,
      object => {
        object.traverse(child => {
          if (child instanceof THREE.Mesh) {
            if (child.material.name === 'emissive') return;
            for (let i = 0; i < shipTextures.length; i++) {
              child.material[i].map = new THREE.TextureLoader().load(
                shipTextures[i]
              );
            }
          }
        });
        context.scene.add(object);
      },
      onProgress,
      onError
    );
  });
};

export const loadShipBody = context => {
  const onProgress = xhr => {
    if (xhr.lengthComputable) {
      console.log(
        Math.round(xhr.loaded / xhr.total * 100, 2) + '% downloaded cannon.js'
      );
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
};
