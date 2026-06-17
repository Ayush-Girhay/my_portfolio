const script1 = document.createElement("script");
script1.src =
  "https://unpkg.com/three@0.165.0/build/three.min.js";

document.head.appendChild(script1);

script1.onload = () => {

  const script2 = document.createElement("script");

  script2.src =
    "https://unpkg.com/three@0.165.0/examples/js/loaders/GLTFLoader.js";

  document.head.appendChild(script2);

  script2.onload = initAstronaut;
};

function initAstronaut() {

  if(window.innerWidth > 700) return;

  const container =
    document.getElementById("astronaut-3d");

  if(!container) return;

  const scene = new THREE.Scene();

  const camera =
    new THREE.PerspectiveCamera(
      45,
      container.clientWidth /
      container.clientHeight,
      0.1,
      1000
    );

  camera.position.z = 4;

  const renderer =
    new THREE.WebGLRenderer({
      alpha:true,
      antialias:true
    });

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );

  container.appendChild(renderer.domElement);

  const ambient =
    new THREE.AmbientLight(
      0xffffff,
      2
    );

  scene.add(ambient);

  const light =
    new THREE.DirectionalLight(
      0xffffff,
      3
    );

  light.position.set(5,5,5);

  scene.add(light);

  let astronaut;

  const loader =
    new THREE.GLTFLoader();

  loader.load(
    "assets/astronaut.glb",

    function(gltf){

      astronaut = gltf.scene;

      astronaut.scale.set(
        1,
        1,
        1
      );

      scene.add(astronaut);
    }
  );

  function animate(){

    requestAnimationFrame(
      animate
    );

    if(astronaut){

      astronaut.rotation.y +=
        0.01;

      astronaut.position.y =
        Math.sin(
          Date.now()*0.002
        ) * 0.2;
    }

    renderer.render(
      scene,
      camera
    );
  }

  animate();
}