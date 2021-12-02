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
camera.position.setZ(10);


//define elements
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xff00ff} );
const diamond = new THREE.Mesh( geometry, material);

//add elements to scene
scene.add( diamond );


//animation loop
function animate() {
  requestAnimationFrame(animate);
  
  diamond.rotation.x += 0.01;
  diamond.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

