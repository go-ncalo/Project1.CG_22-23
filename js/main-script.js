//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera1, camera2, camera3, camera4, camera5, scene, renderer;
var geometry, material, mesh;
var activeCamera;

var head, armLeft, armRight, lowerBody, feet;

const materials = [];
var keyMap = {};

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene() {
    'use strict';
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    scene.background = new THREE.Color(0xdcefef);
    createMaterials();
    createRobot(0, 1, 0);

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameras() {
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera1 = new THREE.OrthographicCamera(width / - 80, width / 80, height / 80, height / - 80, -10, 1000);
    camera1.position.z = 2;

    camera2 = new THREE.OrthographicCamera(width / - 80, width / 80, height / 80, height / - 80, -10, 1000);
    camera2.position.x = 2;

    camera3 = new THREE.OrthographicCamera(width / - 80, width / 80, height / 80, height / - 80, -10, 1000);
    camera3.position.y = 2;

    camera4 = new THREE.OrthographicCamera(width / - 80, width / 80, height / 80, height / - 80, -10, 1000);
    camera4.position.x = 2;
    camera4.position.y = 2;
    camera4.position.z = 2;

    camera5 = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
    camera5.position.x = -2.5;
    camera5.position.y = 2.5;
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

    feet.position.set(x, y, z);
    obj.add(feet);
}

function createLowerBody(obj, x, y, z) {
    'use strict';

    lowerBody = new THREE.Object3D();

    createThigh(lowerBody, 0.75, -.5, -0.25);
    createThigh(lowerBody, -0.75, -.5, -0.25);
    createLeg(lowerBody, 1, -2.75, 0);
    createLeg(lowerBody, -1, -2.75, 0);
    createWheel(lowerBody, 1.75, -2, 0);
    createWheel(lowerBody, 1.75, -3.5, 0);
    createWheel(lowerBody, -1.75, -2, 0);
    createWheel(lowerBody, -1.75, -3.5, 0);
    createFeet(lowerBody, 0, -4.5, 0);

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
    
    head.position.set(x, y, z);
    obj.add(head);
}

function createRobot(x, y, z) {
    'use strict';

    var robot = new THREE.Object3D();

    createTorso(robot);
    createLowerBody(robot, 0, -1.5, 0);
    armRight = createArmMember(robot, 2.5);
    armLeft =  createArmMember(robot, -2.5);
    createHead(robot, 0, 2.5, 0);

    scene.add(robot);

    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions() {
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions() {
    'use strict';

}

////////////
/* UPDATE */
////////////
function update() {
    'use strict';
    if (keyMap[69] || keyMap[101]) { // E
        armLeft.position.x = THREE.MathUtils.clamp(armLeft.position.x + 0.05, -2.5, -1.5);
        armRight.position.x = THREE.MathUtils.clamp(armRight.position.x - 0.05, 1.5, 2.5);
    }

    if (keyMap[68] || keyMap[100]) { // D
        armLeft.position.x = THREE.MathUtils.clamp(armLeft.position.x - 0.05, -2.5, -1.5);
        armRight.position.x = THREE.MathUtils.clamp(armRight.position.x + 0.05, 1.5, 2.5);
    }

    if (keyMap[70] || keyMap[102]) { // F
        head.rotation.x = THREE.MathUtils.clamp(head.rotation.x + 0.05, -Math.PI, 0);
    }

    if (keyMap[82] || keyMap[114]) { // R
        head.rotation.x = THREE.MathUtils.clamp(head.rotation.x - 0.05, -Math.PI, 0);
    }

    if (keyMap[87] || keyMap[119]) { // W
        lowerBody.rotation.x = THREE.MathUtils.clamp(lowerBody.rotation.x + 0.05, 0, Math.PI/2);
    }

    if (keyMap[83] || keyMap[115]) { // S
        lowerBody.rotation.x = THREE.MathUtils.clamp(lowerBody.rotation.x - 0.05, 0, Math.PI/2);
    }

    if (keyMap[65] || keyMap[97]) { // A
        feet.rotation.x = THREE.MathUtils.clamp(feet.rotation.x - 0.05, 0, Math.PI/2);
    }

    if (keyMap[81] || keyMap[113]) { // Q
        feet.rotation.x = THREE.MathUtils.clamp(feet.rotation.x + 0.05, 0, Math.PI/2);
    }
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, activeCamera);
    update();
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
    // window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
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
    keyMap[e.keyCode] = true;
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

function onKeyUp(e) {
    'use strict';
    keyMap[e.keyCode] = false;
}