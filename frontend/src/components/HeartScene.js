import * as THREE from 'three';
import api from '../api/client.js';

export class HeartScene {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 50;
        
        this.hearts = [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.initHearts();
        this.bindEvents();
        this.animate();
    }
    
    initHearts() {
        // Create 444 hearts
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        shape.moveTo( x + 2.5, y + 2.5 );
        shape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
        shape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0,y + 3.5 );
        shape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
        shape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
        shape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
        shape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

        const geometry = new THREE.ShapeGeometry( shape );
        // center geometry
        geometry.computeBoundingBox();
        const centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
        const centerOffsetY = -0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y );
        geometry.translate( centerOffset, centerOffsetY, 0 );

        // scale down
        geometry.scale(0.2, 0.2, 0.2); // Increased size
        // rotate to point up
        geometry.rotateZ(Math.PI);

        const material = new THREE.MeshBasicMaterial( { color: 0xff0000, transparent: true, opacity: 0.8 } );

        for(let i=0; i<444; i++) {
            const mesh = new THREE.Mesh(geometry, material.clone());
            mesh.position.x = (Math.random() - 0.5) * 100;
            mesh.position.y = (Math.random() - 0.5) * 100;
            mesh.position.z = (Math.random() - 0.5) * 50;
            
            // Random base rotation and floating speeds
            mesh.userData = {
                speedY: Math.random() * 0.05 + 0.01,
                speedRot: (Math.random() - 0.5) * 0.02,
                baseX: mesh.position.x,
                baseY: mesh.position.y
            };
            
            this.scene.add(mesh);
            this.hearts.push(mesh);
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        window.addEventListener('click', this.onClick.bind(this));
    }
    
    async onClick(event) {
        let closestHeart = null;
        let minDistance = Infinity;

        const mousePx = new THREE.Vector2(event.clientX, event.clientY);

        this.hearts.forEach(heart => {
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(heart.matrixWorld);
            vector.project(this.camera);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (vector.y * -0.5 + 0.5) * window.innerHeight;
            
            const screenPos = new THREE.Vector2(x, y);
            const dist = mousePx.distanceTo(screenPos);
            
            if (dist < minDistance) {
                minDistance = dist;
                closestHeart = heart;
            }
        });

        // 60 pixel generous click radius
        if (closestHeart && minDistance < 60) {
            
            // Remove heart
            this.scene.remove(closestHeart);
            this.hearts = this.hearts.filter(h => h !== closestHeart);
            
            // Call API
            try {
                const res = await api.post('/hearts/click/');
                this.showWhisper(res.data.text, event.clientX, event.clientY);
            } catch (err) {
                console.error(err);
                if(err.response && err.response.data.error === "No more messages") {
                   this.showWhisper("You've found all my thoughts...", event.clientX, event.clientY);
                } else {
                   this.showWhisper("...", event.clientX, event.clientY);
                }
            }
        }
    }
    
    showWhisper(text, x, y) {
        const div = document.createElement('div');
        div.className = 'whisper-message';
        div.innerText = text;
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        document.body.appendChild(div);
        
        // Background music start on first click if not already
        const bgm = document.getElementById('bgm');
        if(bgm && bgm.paused) {
            bgm.play().catch(e => console.log('Audio play failed', e));
        }
        
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Gentle float and follow mouse slightly
        const targetX = this.mouse.x * 5;
        const targetY = this.mouse.y * 5;
        
        this.hearts.forEach(heart => {
            heart.position.y += heart.userData.speedY;
            if (heart.position.y > 50) {
                heart.position.y = -50;
            }
            heart.rotation.z += heart.userData.speedRot;
            
            // follow mouse slightly
            heart.position.x += (heart.userData.baseX + targetX - heart.position.x) * 0.05;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}
