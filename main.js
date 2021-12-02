import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//set up controls
const controls = new OrbitControls(camera, renderer.domElement);

function addStars(numberOfStars) {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  for (let i = 0; i < numberOfStars; i++) {
    const star = new THREE.Mesh(geometry, material);
    const randomX = THREE.MathUtils.randFloatSpread(100);
    const randomY = THREE.MathUtils.randFloatSpread(100);
    const randomZ = THREE.MathUtils.randFloatSpread(100);
    star.position.set(randomX, randomY, randomZ);
    scene.add(star);
  }
}

//load textures
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
const jeffTexture = new THREE.TextureLoader().load("ryan.jpeg");
const spaceStationTexture = new THREE.TextureLoader().load("space-station.jpg");
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
scene.background = spaceTexture;

//define elements
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
  map: spaceStationTexture,
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);

const ryan = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({
    map: jeffTexture,
  })
);

ryan.position.set(5, 5, 5);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

//define lights
const ambientLight = new THREE.AmbientLight(0xffffff);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 10);

//define debug helpers
const gridHelper = new THREE.GridHelper(100, 100);

//add elements to scene
scene.add(torus);
scene.add(moon);
scene.add(ryan);
scene.add(ambientLight);
scene.add(pointLight);
scene.add(gridHelper);
addStars(100);

//animation loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;

  controls.update();

  renderer.render(scene, camera);
}

animate();

function moveCamera() {
  const top = -Math.abs(document.body.getBoundingClientRect().top);

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  ryan.rotation.y += 0.01;
  ryan.rotation.z += 0.01;

  camera.position.z = -top * 0.1;
  // camera.position.x = top * -0.0002;
  // camera.position.y = top * -0.0002;
  console.log(camera.position);
  console.log("top", top);
}

document.body.onscroll = moveCamera;
