import './style.css'

import * as THREE from 'three';


//set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(5);


//define elements
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0xff00ff } );
const diamond = new THREE.Mesh( geometry, material);


//define lights
const ambientLight = new THREE.AmbientLight( 0x404040 );
const pointLightBlue = new THREE.PointLight( 0x0000ff );
const pointLightRed = new THREE.PointLight( 0xff0000 );
pointLightRed.position.set(5, 5, 0);
pointLightBlue.position.set(-5, -5, 0);

//add elements to scene
scene.add( diamond );
scene.add( ambientLight );
scene.add( pointLightBlue );
scene.add( pointLightRed );


//animation loop
function animate() {
  requestAnimationFrame(animate);
  
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

