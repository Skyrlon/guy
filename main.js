import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//SET CAMERA POSITION
camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;
camera.lookAt(scene.position);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();