import * as THREE from 'three';
import skyboxtexture from '../textures/skybox.png';

export default (context) => {
  context.cubeMap = new THREE.CubeTexture([]);
  context.cubeMap.format = THREE.RGBFormat;

  context.imgLoader = new THREE.ImageLoader();
  context.imgLoader.load(skyboxtexture, image => {
    const getSide = (x, y) => {
      const size = 1024;

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext('2d');
      context.drawImage(image, -x * size, -y * size);

      return canvas;
    };

    context.cubeMap.images[0] = getSide(2, 1); // px
    context.cubeMap.images[1] = getSide(0, 1); // nx
    context.cubeMap.images[2] = getSide(1, 0); // py
    context.cubeMap.images[3] = getSide(1, 2); // ny
    context.cubeMap.images[4] = getSide(1, 1); // pz
    context.cubeMap.images[5] = getSide(3, 1); // nz
    context.cubeMap.needsUpdate = true;
  });

  const cubeShader = THREE.ShaderLib['cube'];
  cubeShader.uniforms['tCube'].value = context.cubeMap;

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

  context.scene.add(skyBox);
}
