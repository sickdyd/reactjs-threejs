import React from 'react';
import './App.css';

//import {Button} from 'rsuite';
import '../node_modules/rsuite/dist/styles/rsuite-default.css';

import * as THREE from "three";
import { TimelineMax } from 'gsap/all';

function App() {

  let mount = null;

  React.useEffect(()=>{

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor("#000");

    mount.appendChild( renderer.domElement );

    /* var light = new THREE.AmbientLight({color: 0xffffff, intensity: 1});
    light.position.set(0,0,25);
    light.castShadow = true;
    scene.add(light); */

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    //var material = THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true, transparent: true, opacity: 0.85 } )
    var cube = new THREE.Mesh( geometry, material );

    scene.add(cube);

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

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };

    animate();

    window.addEventListener('click', onMouseClick);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth,window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });

  });

  return (
    <div ref={ref => (mount = ref)} />
  );
}

export default App;
