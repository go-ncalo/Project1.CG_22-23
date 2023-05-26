//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera1, camera2, camera3, camera4, camera5, scene, renderer;
var geometry, material, mesh;
var activeCamera;

var head, armLeft, armRight, lowerBody, feet, robot, trailer;
var collision = false;
var collisionFinished = false;
var AABBMinTruck, AABBMaxTruck, AABBMinTrailer, AABBMaxTrailer;

var delta;
const clock = new THREE.Clock();
const materials = [];
var k = {};

const
    Q = 81, W = 87, E = 69, R = 82,
    S = 83, A = 65, D = 68, F = 70, 
    LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40,
    N1 = 49, N2 = 50, N3 = 51, N4 = 52, N5 = 53, N6 = 54;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xdcefef);
    createMaterials();
    createRobot(0, 1, 3);
    createTrailer(0, 3, -9);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras() {
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera1 = new THREE.OrthographicCamera(width / - 70, width / 70, height / 70, height / - 70, -10, 1000);
    camera1.position.z = 2;

    camera2 = new THREE.OrthographicCamera(width / - 70, width / 70, height / 70, height / - 70, -10, 1000);
    camera2.position.x = 2;

    camera3 = new THREE.OrthographicCamera(width / - 70, width / 70, height / 70, height / - 70, -10, 1000);
    camera3.position.y = 2;

    camera4 = new THREE.OrthographicCamera(width / - 70, width / 70, height / 70, height / - 70, -10, 1000);
    camera4.position.x = 2;
    camera4.position.y = 2;
    camera4.position.z = 2;

    camera5 = new THREE.PerspectiveCamera(90, width / height, 1, 1000);
    camera5.position.x = 7;
    camera5.position.y = 5;
    camera5.position.z = 7;

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
    material = new THREE.MeshBasicMaterial({ color: 0x2a7fbb, wireframe: false });
    materials.push(material);
    material = new THREE.MeshBasicMaterial({ color: 0x13639c, wireframe: false });
    materials.push(material);
    material = new THREE.MeshBasicMaterial({ color: 0xb03a41, wireframe: false });
    materials.push(material);
}
function createAbdomen(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(2, 1, 1);
    var abdomen = new THREE.Mesh(geometry, materials[0]);
    obj.add(abdomen);
}

function createThorax(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(4, 2, 1);
    var thorax = new THREE.Mesh(geometry, materials[1]);
    thorax.position.y = 1.5;
    obj.add(thorax);
}
function createWaist(obj) {
    'use strict';
    var geometry = new THREE.BoxGeometry(3, 1, 1);
    var waist = new THREE.Mesh(geometry, materials[3]);
    waist.position.y = -1;
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

function createTorso(obj) {
    'use strict';

    var torso = new THREE.Object3D();

    createAbdomen(torso);
    createThorax(torso);
    createWaist(torso);
    createWheel(torso, 1.75, -1, 0);
    createWheel(torso, -1.75, -1, 0);

    obj.add(torso);
}

function createThigh(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    var thigh = new THREE.Mesh(geometry, materials[0]);

    thigh.position.x = x;
    thigh.position.y = y;
    thigh.position.z = z;
    obj.add(thigh);
}

function createLeg(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 3.5, 1);
    var leg = new THREE.Mesh(geometry, materials[4]);

    leg.position.x = x;
    leg.position.y = y;
    leg.position.z = z;
    obj.add(leg);
}

function createFoot(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 0.5, 1.5);
    var foot = new THREE.Mesh(geometry, materials[5]);

    foot.position.x = x;
    foot.position.y = y;
    foot.position.z = z;
    obj.add(foot);
}

function createFeet(obj, x, y, z) {
    'use strict';

    feet = new THREE.Object3D();

    createFoot(feet, 1, -0.25, 0.25);
    createFoot(feet, -1, -0.25, 0.25);

    feet.position.set(x, y, z - 0.01);
    obj.add(feet);
}

function createLowerBody(obj, x, y, z) {
    'use strict';

    lowerBody = new THREE.Object3D();

    createThigh(lowerBody, 0.75, -1, -0.25);
    createThigh(lowerBody, -0.75, -1, -0.25);
    createLeg(lowerBody, 1, -3.25, 0);
    createLeg(lowerBody, -1, -3.25, 0);
    createWheel(lowerBody, 1.75, -2.5, 0);
    createWheel(lowerBody, 1.75, -4, 0);
    createWheel(lowerBody, -1.75, -2.5, 0);
    createWheel(lowerBody, -1.75, -4, 0);
    createFeet(lowerBody, 0, -5, 0);

    lowerBody.position.set(x, y, z);
    obj.add(lowerBody);
}

function createArm(obj, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 2, 1);
    var arm = new THREE.Mesh(geometry, materials[6]);

    arm.position.y = y;
    arm.position.z = z;
    obj.add(arm);
}

function createForearm(obj, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var forearm = new THREE.Mesh(geometry, materials[6]);

    forearm.position.y = y;
    forearm.position.z = z;
    obj.add(forearm);
}

function createPipeA(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 32);
    var pipeA = new THREE.Mesh(geometry, materials[0]);

    pipeA.position.x = x;
    pipeA.position.y = y;
    pipeA.position.z = z;
    obj.add(pipeA);
}

function createPipeB(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(0.25 / 2, 0.25 / 2, 1, 32);
    var pipeA = new THREE.Mesh(geometry, materials[3]);

    pipeA.position.x = x;
    pipeA.position.y = y;
    pipeA.position.z = z;
    obj.add(pipeA);
}

function createArmMember(obj, x) {
    'use strict';

    var armMember = new THREE.Object3D();

    createArm(armMember, 1.5, -1);
    createForearm(armMember, 0, 0);
    createPipeA(armMember, x > 0 ? 0.75 : -0.75, 1.5, -1);
    createPipeB(armMember, x > 0 ? 0.75 : -0.75, 2.5, -1)

    armMember.position.x = x;
    obj.add(armMember);

    return armMember;
}

function createSkull(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var skull = new THREE.Mesh(geometry, materials[4]);

    skull.position.set(x, y, z);
    obj.add(skull);
}

function createAntenna(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
    var antenna = new THREE.Mesh(geometry, materials[5]);

    antenna.position.set(x, y, z);
    obj.add(antenna);
}

function createEye(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(0.25, 0.25, 0.1);
    var eye = new THREE.Mesh(geometry, materials[5]);

    eye.position.set(x, y, z);
    obj.add(eye);
}

function createHead(obj, x, y, z) {
    'use strict';

    head = new THREE.Object3D();

    createSkull(head, 0, 0.5, 0);
    createAntenna(head, 0.375, 1.125, 0);
    createAntenna(head, -0.375, 1.125, 0);
    createEye(head, 0.375, 0.7, 0.55);
    createEye(head, -0.375, 0.7, 0.55);
    head.scale.set(0.9, 0.9, 0.9);
    
    head.position.set(x, y - 0.01, z);
    obj.add(head);
}

function createCube(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(geometry, materials[0]);

    cube.position.set(x, y, z);
    obj.add(cube);
}

function createRobot(x, y, z) {
    'use strict';

    robot = new THREE.Object3D();

    createTorso(robot);
    createLowerBody(robot, 0, -1, 0);
    armRight = createArmMember(robot, 2.5);
    armLeft =  createArmMember(robot, -2.5);
    createHead(robot, 0, 2.5, 0);

    scene.add(robot);

    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
}

function createContainer(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(4, 5, 9);
    var container = new THREE.Mesh(geometry, materials[3]);

    container.position.set(x, y, z);
    obj.add(container);
}

function createHook(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 0.5, 1);
    var hook = new THREE.Mesh(geometry, materials[0]);

    hook.position.set(x, y, z);
    obj.add(hook);
}

function createTrailer(x, y, z) {
    'use strict';

    trailer = new THREE.Object3D();

    createContainer(trailer, 0, 0, 0);
    createWheel(trailer, 1.75, -3, -3.5);
    createWheel(trailer, 1.75, -3, -2.5);
    createWheel(trailer, -1.75, -3, -3.5);
    createWheel(trailer, -1.75, -3, -2.5);
    createHook(trailer, 0, -2.25, 5);

    scene.add(trailer);

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;
}

function isTruckForm() {
    'use strict';
    return armRight.position.x === 1.5 && armLeft.position.x === -1.5 &&
        head.rotation.x === -Math.PI && lowerBody.rotation.x === Math.PI/2 &&
        feet.rotation.x === Math.PI/2
}

function calculateBoundingBoxes() {
    'use strict';
    AABBMaxTruck = new THREE.Vector3(robot.position.x + 2.5, robot.position.y + 3, robot.position.z + 0.5);
    AABBMinTruck = new THREE.Vector3(robot.position.x - 2.5, robot.position.y - 1.5, robot.position.z - 6);

    AABBMaxTrailer = new THREE.Vector3(trailer.position.x + 2, trailer.position.y + 2.5, trailer.position.z + 5.5);
    AABBMinTrailer = new THREE.Vector3(trailer.position.x - 2, trailer.position.y - 2.5, trailer.position.z - 4.5);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions() {
    'use strict';
    return AABBMinTruck.x <= AABBMaxTrailer.x && AABBMaxTruck.x >= AABBMinTrailer.x
        && AABBMinTruck.y <= AABBMaxTrailer.y && AABBMaxTruck.y >= AABBMinTrailer.y
        && AABBMinTruck.z <= AABBMaxTrailer.z && AABBMaxTruck.z >= AABBMinTrailer.z;

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions() {
    'use strict';
    let attachment = new THREE.Vector3(0, 3, -6);

    if (collisionFinished) { 
        collision = false;
        return;
    }
    
    if (attachment.distanceTo(trailer.position) > 0.1) {
        trailer.position.x < attachment.x ? trailer.position.x += 1 * delta : trailer.position.x -= 1 * delta;
        trailer.position.z < attachment.z ? trailer.position.z += 1 * delta : trailer.position.z -= 1 * delta;
    } else {
        trailer.position.x = attachment.x;
        trailer.position.z = attachment.z;
        collisionFinished = true;
    }
}

////////////
/* UPDATE */
////////////
function update() {
    'use strict';
    console.log(collision);
    console.log(isTruckForm());

    if (collision && isTruckForm()) {
        return;
    }
    
    if (k[E]) { // E
        armLeft.position.x = THREE.MathUtils.clamp(armLeft.position.x + 2 * delta, -2.5, -1.5);
        armRight.position.x = THREE.MathUtils.clamp(armRight.position.x - 2 * delta, 1.5, 2.5);
    }

    if (k[D]) { // D
        armLeft.position.x = THREE.MathUtils.clamp(armLeft.position.x - 2 * delta, -2.5, -1.5);
        armRight.position.x = THREE.MathUtils.clamp(armRight.position.x + 2 * delta, 1.5, 2.5);
    }

    if (k[F]) { // F
        head.rotation.x = THREE.MathUtils.clamp(head.rotation.x + 4 * delta, -Math.PI, 0);
    }

    if (k[R]) { // R
        head.rotation.x = THREE.MathUtils.clamp(head.rotation.x - 4 * delta, -Math.PI, 0);
    }

    if (k[W]) { // W
        lowerBody.rotation.x = THREE.MathUtils.clamp(lowerBody.rotation.x + 2 * delta, 0, Math.PI/2);
    }

    if (k[S]) { // S
        lowerBody.rotation.x = THREE.MathUtils.clamp(lowerBody.rotation.x - 2 * delta, 0, Math.PI/2);
    }

    if (k[A]) { // A
        feet.rotation.x = THREE.MathUtils.clamp(feet.rotation.x - 2 * delta, 0, Math.PI/2);
    }

    if (k[Q]) { // Q
        feet.rotation.x = THREE.MathUtils.clamp(feet.rotation.x + 2 * delta, 0, Math.PI/2);
    }

    let vector = new THREE.Vector3(0,0,0);
    if (k[LEFT]) { // LEFT
        vector.x -= 1;
    }

    if (k[RIGHT]) { // RIGHT
        vector.x += 1;
    }

    if (k[UP]) { // UP
        vector.z -= 1;
    }

    if (k[DOWN]) { // DOWN
        vector.z += 1;
    }
    vector.normalize();
    trailer.position.add(vector.multiplyScalar(3  * delta));

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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    delta = clock.getDelta();
    // collision here
    calculateBoundingBoxes();
    if (isTruckForm()) {
        collision = checkCollisions();
        if (collision) {
            handleCollisions();
        } else {
            collisionFinished = false;
        }
    }
    update();
    render();
    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        activeCamera.aspect = window.innerWidth / window.innerHeight;
        activeCamera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    if (!k[e.keyCode])
        switch (e.keyCode) {
            case N1: //1
                activeCamera = camera1;
                break;
            case N2: //2
                activeCamera = camera2;
                break;
            case N3: //3
                activeCamera = camera3;
                break;
            case N4: //4
                activeCamera = camera4;
                break;
            case N5: //5
                activeCamera = camera5;
                break;
            case N6: //6
                for (let m in materials) {
                    materials[m].wireframe = !materials[m].wireframe;
                }
                break;
        }
    k[e.keyCode] = true;
}


///////////////////////
/* KEY UP CALLBACK */
///////////////////////

function onKeyUp(e) {
    'use strict';
    k[e.keyCode] = false;
}