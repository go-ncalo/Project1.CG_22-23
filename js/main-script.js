//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera1, camera2, camera3, camera4, camera5, scene, renderer;
var geometry, material, mesh;
var activeCamera;
const materials = [];

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    scene.background = new THREE.Color(0xdcefef);
    createMaterials();
    createTorso();
    
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras(){
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    camera1 = new THREE.OrthographicCamera(width / - 100, width / 100, height / 100, height / - 100, -10, 1000 );
    camera1.position.z = 2;

    camera2 = new THREE.OrthographicCamera(width / - 100, width / 100, height / 100, height / - 100, -10, 1000 );
    camera2.position.x = 2;

    camera3 = new THREE.OrthographicCamera(width / - 100, width / 100, height / 100, height / - 100, -10, 1000 );
    camera3.position.y = 2;

    camera4 = new THREE.OrthographicCamera(width / - 100, width / 100, height / 100, height / - 100, -10, 1000 );
    camera4.position.x = 2;
    camera4.position.y = 2;
    camera4.position.z = 2;

    camera5 = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera5.position.x = 5;
    camera5.position.y = 5;
    camera5.position.z = 5;


    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(scene.position);
    camera4.lookAt(scene.position);
    camera5.lookAt(scene.position);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createMaterials() {
    'use strict';
    var material = new THREE.MeshBasicMaterial({ color: 0xcfd0d2, wireframe: false });
    materials.push(material);
    material = new THREE.MeshBasicMaterial({ color: 0xc44048, wireframe: false });
    materials.push(material);
    material = new THREE.MeshBasicMaterial({ color: 0x00000, wireframe: false });
    materials.push(material);
    material = new THREE.MeshBasicMaterial({ color: 0xb1b2b3, wireframe: false });
    materials.push(material);
}
function createAbdomen(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(2, 0.5, 1);
    var abdomen = new THREE.Mesh(geometry, materials[0]);
    obj.add(abdomen);
}

function createThorax(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(4, 2, 1);
    var thorax = new THREE.Mesh(geometry, materials[1]);
    thorax.position.y = 1.25;
    obj.add(thorax);
}
function createWaist(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(3, 1, 1);
    var waist = new THREE.Mesh(geometry, materials[3]);
    waist.position.y = -0.75;
    obj.add(waist);
}

function createWheel(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
    var wheel = new THREE.Mesh(geometry, materials[2]);
    wheel.rotateZ(Math.PI / 2);
    wheel.position.x = x;
    wheel.position.y = y;
    wheel.position.z = z;
    obj.add(wheel);
}

function createTorso() {
    'use strict';

    var torso = new THREE.Object3D();

    createAbdomen(torso);
    createThorax(torso);
    createWaist(torso);
    createWheel(torso, 1.75, -0.75, 0);
    createWheel(torso, -1.75, -0.75, 0);

    scene.add(torso);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, activeCamera);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();
    activeCamera = camera1;

    render();

    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    render();

    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            activeCamera = camera1;
            break;
        case 50: //2
            activeCamera = camera2;
            break;
        case 51: //3
            activeCamera = camera3;
            break;
        case 52: //4
            activeCamera = camera4;
            break;
        case 53: //5
            activeCamera = camera5;
            break;
        case 54: //6
            for (let m in materials) {
                materials[m].wireframe = !materials[m].wireframe;
            }
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}