import React from 'react';
import './App.css';

import face from './textures/cat.jpg';

//import {Button} from 'rsuite';
import '../node_modules/rsuite/dist/styles/rsuite-default.css';

import * as THREE from "three";
import { TimelineMax } from 'gsap/all';

function App() {

  let mount = null;

  React.useEffect(()=>{

    var scene = new THREE.Scene();

    const near = 0.1;
    const far = 6.5;
    const color = 'grey';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setClearColor("#000");
    renderer.setSize( window.innerWidth, window.innerHeight );

    mount.appendChild( renderer.domElement );

/*     var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});

    const loader = new THREE.TextureLoader();
     
    const material = new THREE.MeshBasicMaterial({
      map: loader.load('textures/cat.jpg'),
    })

    var cube = new THREE.Mesh( geometry, material );
    scene.add(cube); */

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const loader = new THREE.TextureLoader();

    const material = new THREE.MeshBasicMaterial({
      map: loader.load(face),
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(0,0,0);
    scene.add(light);
    
    var light1 = new THREE.PointLight(0xFFFFFF, 2, 1000)
    light1.position.set(0,0,25);
    scene.add(light1);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseClick(event) {

      event.preventDefault();

      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      var intersects = raycaster.intersectObjects(scene.children, true);
      for (var i = 0; i < intersects.length; i++) {
        var tl = new TimelineMax();
        tl.to(intersects[i].object.scale, 1, {x: Math.random() * 3, y: Math.random() * 3, z: Math.random() * 3})
        //intersects[i].object.scale.set(, Math.random()*3, Math.random()*3);
      }
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };

    animate();

    window.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onResize);

    function cleanUp() {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('click', onMouseClick);
      geometry.dispose();
      material.dispose();
      scene.dispose();
    }

    return cleanUp;

  });

  return (
    <div ref={ref => (mount = ref)} />
  );
}

export default App;
