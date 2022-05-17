/////////////////////////////////////////////////////////////////////////
///// IMPORT
import './main.css'
import * as THREE from 'three'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
// const gui = new GUI()

/////////////////////////////////////////////////////////////////////////
//// DRACO LOADER TO LOAD DRACO COMPRESSED MODELS FROM BLENDER
const dracoLoader = new DRACOLoader()
const loader = new GLTFLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
dracoLoader.setDecoderConfig({ type: 'js' })
loader.setDRACOLoader(dracoLoader)

/////////////////////////////////////////////////////////////////////////
///// DIV CONTAINER CREATION TO HOLD THREEJS EXPERIENCE
const container = document.getElementById('canvas-container');
const containerDetails = document.getElementById('canvas-container-details');

/////////////////////////////////////////////////////////////////////////
///// SCENE CREATION
const scene = new THREE.Scene()

/////////////////////////////////////////////////////////////////////////
///// RENDERER CONFIG
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true})
renderer.autoClear = true;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize( container.clientWidth, container.clientHeight)
renderer.outputEncoding = THREE.sRGBEncoding
container.appendChild(renderer.domElement)

const renderer2 = new THREE.WebGLRenderer({ antialias: false})
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer2.setSize( container.clientWidth, container.clientHeight)
renderer2.outputEncoding = THREE.sRGBEncoding
containerDetails.appendChild(renderer2.domElement)


/////////////////////////////////////////////////////////////////////////
///// CAMERAS CONFIG
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 1, 100)
camera.position.set(19,1.54,-0.1)
cameraGroup.add(camera)

const camera2 = new THREE.PerspectiveCamera(35, containerDetails.clientWidth / containerDetails.clientHeight, 1, 100)
camera2.position.set(1.9,2.7,2.7)
camera2.rotation.set(0,1.1,0)

scene.add(camera2)

/////////////////////////////////////////////////////////////////////////
///// MAKE EXPERIENCE FULL SCREEN
window.addEventListener('resize', () => {
    const width = container.clientWidth
    const height = container.clientHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    
    camera2.aspect = containerDetails.clientWidth / containerDetails.clientHeight
    camera2.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer2.setSize(containerDetails.clientWidth, containerDetails.clientHeight)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/////////////////////////////////////////////////////////////////////////
///// CREATE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)

/////////////////////////////////////////////////////////////////////////
///// SCENE LIGHTS
const sunLight = new THREE.DirectionalLight(0x435c72, 0.08)
sunLight.position.set(-100,0,-100)
scene.add(sunLight)

const fillLight = new THREE.PointLight(0x88b2d9, 2.7, 4, 3)
fillLight.position.set(30,3,1.8)
scene.add(fillLight)

/////////////////////////////////////////////////////////////////////////
let oldMaterial

/////////////////////////////////////////////////////////////////////////
///// LOADING GLB/GLTF MODEL FROM BLENDER
loader.load('models/gltf/graces-draco2.glb', function (gltf) {

    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            oldMaterial = obj.material
            obj.material = new THREE.MeshPhongMaterial({
                shininess: 45 
            })
        }
    })
    clearScene()
    scene.add(gltf.scene)
})

function clearScene(){
    oldMaterial.dispose()
    renderer.renderLists.dispose();
}

/////////////////////////////////////////////////////////////////////////
//// INTRO CAMERA ANIMATION USING TWEEN
function introAnimation() {
    new TWEEN.Tween(camera.position.set(0,4,2.7)).to({ x: 0, y: 2, z: 8.8}, 3500).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    
    new TWEEN.Tween(controls.target.set(0,6,-1.5)).to({ x: 0.2, y: 2.6, z: -0.3}, 3500).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        document.querySelector('.header').classList.add('ended')
        document.querySelector('.first>p').classList.add('ended')
        TWEEN.remove(this)
    })
}
controls.enabled = false

introAnimation()


//////////////////////////////////////////////////
//// CLICK LISTENERS
document.getElementById('aglaea').addEventListener('click', () => {
    document.getElementById('aglaea').classList.add('active')
    document.getElementById('euphre').classList.remove('active')
    document.getElementById('thalia').classList.remove('active')
    document.getElementById('content').innerHTML = 'She was venerated as the goddess of beauty, splendor, glory, magnificence, and adornment. She is the youngest of the Charites according to Hesiod.[4] Aglaea is one of three daughters of Zeus and either the Oceanid Eurynome, or of Eunomia, the goddess of good order and lawful conduct.'

    new TWEEN.Tween(camera2.position).to({ x: 1.9, y: 2.7, z: 2.7 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    new TWEEN.Tween(camera2.rotation).to({ y: 1.1 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    
})

document.getElementById('thalia').addEventListener('click', () => {
    document.getElementById('thalia').classList.add('active')
    document.getElementById('aglaea').classList.remove('active')
    document.getElementById('euphre').classList.remove('active')
    document.getElementById('content').innerHTML = 'Thalia, in Greek religion, one of the nine Muses, patron of comedy; also, according to the Greek poet Hesiod, a Grace (one of a group of goddesses of fertility). She is the mother of the Corybantes, celebrants of the Great Mother of the Gods, Cybele, the father being Apollo, a god related to music and dance. In her hands she carried the comic mask and the shepherd’s staff.'

    new TWEEN.Tween(camera2.position).to({ x: -0.9, y: 3.1, z: 2.6 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    new TWEEN.Tween(camera2.rotation).to({ y: -0.1 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    
})

document.getElementById('euphre').addEventListener('click', () => {
    document.getElementById('euphre').classList.add('active')
    document.getElementById('aglaea').classList.remove('active')
    document.getElementById('thalia').classList.remove('active')
    document.getElementById('content').innerHTML = 'Euphrosyne is a Goddess of Good Cheer, Joy and Mirth. Her name is the female version of a Greek word euphrosynos, which means "merriment". The Greek poet Pindar states that these goddesses were created to fill the world with pleasant moments and good will. Usually the Charites attended the goddess of beauty Aphrodite.'

    new TWEEN.Tween(camera2.position).to({ x: -0.4, y: 2.7, z: 1.9 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    new TWEEN.Tween(camera2.rotation).to({ y: -0.6 }, 1800).easing(TWEEN.Easing.Quadratic.InOut).start()
    .onComplete(function () {
        TWEEN.remove(this)
    })
    
})

/////////////////////////////////////////////////////////////////////////
//// PARALLAX CONFIG
const cursor = {}
cursor.x = 0
cursor.y = 0
const clock = new THREE.Clock()
let previousTime = 0

/////////////////////////////////////////////////////////////////////////
//// RENDER LOOP FUNCTION
function rendeLoop() {

    TWEEN.update() // update animations

    controls.update() // update orbit controls

    renderer.render(scene, camera) // render the scene using the camera
    renderer2.render(scene, camera2) // render the scene using the camera

    requestAnimationFrame(rendeLoop) //loop the render function

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    const parallaxY = cursor.y
    fillLight.position.y -= ( parallaxY *9 + fillLight.position.y -2) * deltaTime

    const parallaxX = cursor.x
    fillLight.position.x += (parallaxX *8 - fillLight.position.x) * 2 * deltaTime

    // cameraGroup.position.y -= (parallaxY + cameraGroup.position.y) * 2 * deltaTime
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltaTime

}

rendeLoop()

//////////////////////////////////////////////////
//// ON MOUSE MOVE TO GET CAMERA POSITION
document.addEventListener('mousemove', (event) => {
    event.preventDefault()

    cursor.x = event.clientX / container.clientWidth -0.5
    cursor.y = event.clientY / container.clientHeight -0.5
    // console.log(camera2.position)
    // console.log(controls.target)

}, false)

// under development... stop execution when isn't visible to gain performance
const watch = document.querySelector('.second')

function obCallback(payload) {
    console.log(payload);
}

const ob = new IntersectionObserver(obCallback);
ob.observe(watch);