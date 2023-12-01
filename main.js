import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

let camera, controls, scene, renderer;

init();

animate();

function init() {
  const container = document.querySelector("#scene-container");

  scene = new Scene();

  scene.background = new Color("skyblue");

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 100;

  camera = new PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(0, 0, 5);

  const geometry = new BoxGeometry(1, 1, 1);

  const material = new MeshBasicMaterial();

  const cube = new Mesh(geometry, material);

  scene.add(cube);

  renderer = new WebGLRenderer();

  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  container.append(renderer.domElement);

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 10;
  controls.maxDistance = 100;

  controls.maxPolarAngle = Math.PI / 2;

  const loader = new GLTFLoader();

  loader.load(
    "assets/guy.glb",
    function (gltf) {
      scene.add(gltf.scene);
      gltf.animations.push("assets/Crouch To Stand.fbx");
      console.log(gltf.animations); // Array<THREE.AnimationClip>
      console.log(gltf.scene); // THREE.Group
      console.log(gltf.scenes); // Array<THREE.Group>
      console.log(gltf.cameras); // Array<THREE.Camera>
      console.log(gltf.asset); // Object
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();
}

function render() {
  renderer.render(scene, camera);
}
