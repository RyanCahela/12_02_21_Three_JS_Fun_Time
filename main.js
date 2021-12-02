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


//define elements
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0xff00ff } );
const diamond = new THREE.Mesh( geometry, material);


//define lights
const ambientLight = new THREE.AmbientLight( 0x404040 );
const pointLightBlue = new THREE.PointLight( 0x0000ff );
const pointLightRed = new THREE.PointLight( 0xff0000 );
pointLightRed.position.set(2, 0, 0);
pointLightBlue.position.set(-2, 0, 0);


//define debug helpers
const redLightHelper = new THREE.PointLightHelper(pointLightRed);
const blueLightHelper = new THREE.PointLightHelper(pointLightBlue);
const gridHelper = new THREE.GridHelper(100, 100);


//add elements to scene
scene.add( diamond );
scene.add( ambientLight );
scene.add( pointLightBlue );
scene.add( pointLightRed );
scene.add( redLightHelper, blueLightHelper );
scene.add( gridHelper );


//animation loop
function animate() {
  requestAnimationFrame(animate);
  
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

