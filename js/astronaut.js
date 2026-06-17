import * as THREE from 'https://unpkg.com/three@0.165.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js';

if (window.innerWidth <= 700) {

  const container = document.getElementById('astronaut-3d');

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(
    0xffffff,
    2
  );

  scene.add(ambient);

  const dir = new THREE.DirectionalLight(
    0xffffff,
    3
  );

  dir.position.set(5, 5, 5);

  scene.add(dir);

  let astronaut;

  const loader = new GLTFLoader();

  loader.load(
    'assets/astronaut.glb',

    (gltf) => {

      astronaut = gltf.scene;

      astronaut.scale.set(
        1.3,
        1.3,
        1.3
      );

      scene.add(astronaut);
    }
  );

  let targetRotation = 0;

  container.addEventListener('touchmove', (e) => {

    const touch = e.touches[0];

    const x =
      touch.clientX / window.innerWidth;

    targetRotation =
      (x - 0.5) * 1.2;

  });

  function animate(time) {

    requestAnimationFrame(animate);

    if (astronaut) {

      astronaut.rotation.y += 0.008;

      astronaut.rotation.y +=
        (targetRotation -
          astronaut.rotation.y) * 0.03;

      astronaut.position.y =
        Math.sin(time * 0.0015) * 0.18;

      astronaut.rotation.z =
        Math.sin(time * 0.0012) * 0.08;
    }

    renderer.render(
      scene,
      camera
    );
  }

  animate();

  window.addEventListener(
    'resize',
    () => {

      camera.aspect =
        container.clientWidth /
        container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    }
  );
}