//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var camera1, camera2, camera3, camera4, camera5, scene, renderer;
var geometry, material, mesh;
var activeCamera;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    scene.background = new THREE.Color(0xdcefef);
    createCube()

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    camera1 = new THREE.OrthographicCamera(width / - 200, width / 200, height / 200, height / - 200, 1, 1000 );
    camera1.position.x = 2;

    camera2 = new THREE.OrthographicCamera(width / - 200, width / 200, height / 200, height / - 200, 1, 1000 );
    camera2.position.y = 2;

    camera3 = new THREE.OrthographicCamera(width / - 200, width / 200, height / 200, height / - 200, 1, 1000 );
    camera3.position.z = 2;

    camera4 = new THREE.OrthographicCamera(width / - 200, width / 200, height / 200, height / - 200, 1, 1000 );
    camera4.position.x = 2;
    camera4.position.y = 2;
    camera4.position.z = 2;

    camera5 = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera5.position.x = 10;
    camera5.position.y = 10;
    camera5.position.z = 10;


    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(scene.position);
    camera4.lookAt(scene.position);
    camera5.lookAt(scene.position);
}
/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createCube() {
    'use strict';
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
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
    createCamera();
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
            // TODO: Change to more efficient way
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}