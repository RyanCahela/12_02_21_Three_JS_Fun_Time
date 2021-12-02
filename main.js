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


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  
  for(let i=0; i < 1000; i++) {
    const star = new THREE.Mesh(geometry, material);
    const randomX = addRandomNegative({number: Math.random() * 100, probability: 0.5});
    const randomY = addRandomNegative({number: Math.random() * 100, probability: 0.5});
    const randomZ = addRandomNegative({number: Math.random() * 100, probabilyt: 0.5});
    star.position.set(randomX, randomY, randomZ);
    scene.add(star);
  }

  //helper function
  function addRandomNegative({number, probability = 0.5}) {
    const randomNum = Math.random();
    if(randomNum > probability) {
      return -number;
    } else {
      return number;
    } 
  }
}


//define elements
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0xff00ff } );
const diamond = new THREE.Mesh( geometry, material);


//define lights
const ambientLight = new THREE.AmbientLight( 0x404040);
const pointLightBlue = new THREE.SpotLight( 0x0000ff, 1, 10 );
const pointLightRed = new THREE.SpotLight( 0xff0000, 1, 10 );
pointLightRed.position.set(2, 0, 0);
pointLightBlue.position.set(-2, 0, 0);


//define debug helpers
const redLightHelper = new THREE.SpotLightHelper(pointLightRed);
const blueLightHelper = new THREE.SpotLightHelper(pointLightBlue);
const gridHelper = new THREE.GridHelper(100, 100);


//add elements to scene
scene.add( diamond );
scene.add( ambientLight );
scene.add( pointLightBlue );
scene.add( pointLightRed );
scene.add( redLightHelper, blueLightHelper );
scene.add( gridHelper );
addStar();


//animation loop
function animate() {
  requestAnimationFrame(animate);
  
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

