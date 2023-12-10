import {
  BoxGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  AnimationMixer,
  Clock,
} from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let camera, controls, scene, renderer, mixer, clock;

clock = new Clock();
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

  camera.position.set(0, 0, -500);

  const geometry = new BoxGeometry(1, 1, 1);

  const material = new MeshBasicMaterial();

  const cube = new Mesh(geometry, material);

  //scene.add(cube);

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
  const light = new AmbientLight("white", 5);

  light.position.set(10, 10, 10);
  scene.add(light);
  loadModel();
}

function loadModel() {
  const loader = new GLTFLoader();
  loader.load(
    "assets/mannequin_v2.glb",
    function (gltf) {
      gltf.scene.rotation.set(0, degToRad(180), 0);
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      scene.add(gltf.scene);
      mixer = new AnimationMixer(gltf.scene);

      mixer.clipAction(gltf.animations[0]).play();
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
  let delta = clock.getDelta();

  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}
