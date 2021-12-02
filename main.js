import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(5);

//set up controls
const controls = new OrbitControls(camera, renderer.domElement);


function addStars(numberOfStars) {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  
  for(let i=0; i < numberOfStars; i++) {
    const star = new THREE.Mesh(geometry, material);
    const randomX = THREE.MathUtils.randFloatSpread( 100 );
    const randomY = THREE.MathUtils.randFloatSpread( 100 );
    const randomZ = THREE.MathUtils.randFloatSpread( 100 ); 
    star.position.set(randomX, randomY, randomZ);
    scene.add(star);
  }
}


//define elements
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0xff00ff } );
const diamond = new THREE.Mesh( geometry, material);


//define lights
const ambientLight = new THREE.AmbientLight( 0xffffff);


//define debug helpers
const gridHelper = new THREE.GridHelper(100, 100);


//add elements to scene
scene.add( diamond );
scene.add( ambientLight );
scene.add( gridHelper );
addStars(100);


//animation loop
function animate() {
  requestAnimationFrame(animate);
  
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

