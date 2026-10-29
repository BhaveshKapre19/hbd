import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { celebrationAudio } from '../utils/audio';
import { Sparkles, Plus, Heart } from 'lucide-react';

const COMPLIMENTS = [
  "Plam Buddy: The sweetest soul in Bulgaria! 🇧🇬",
  "Your laugh makes everything brighter! ✨",
  "Queen of good vibes & endless kindness 👑",
  "Cheers to the most awesome friend ever! 🥂",
  "May this year bring your wildest dreams true! 💖",
  "Unstoppable, brilliant & one in a million! 🌟",
  "Warmest hugs & love from across the miles! 💌",
];

export default function FloatingBalloons3D() {
  const mountRef = useRef(null);
  const [poppedMessage, setPoppedMessage] = useState(null);
  const [balloonCount, setBalloonCount] = useState(6);
  const balloonsRef = useRef([]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  // Palette of luxury balloon materials
  const colors = [
    { color: 0xD4AF37, metalness: 0.8, roughness: 0.2, name: "Champagne Gold" },
    { color: 0xE8A598, metalness: 0.5, roughness: 0.25, name: "Rose Blush" },
    { color: 0x8E283B, metalness: 0.6, roughness: 0.3, name: "Ruby Red" },
    { color: 0xFFF8EE, metalness: 0.4, roughness: 0.2, name: "Pearl Cream" },
    { color: 0xB58E62, metalness: 0.7, roughness: 0.2, name: "Warm Bronze" },
    { color: 0xDDA0DD, metalness: 0.5, roughness: 0.3, name: "Lavender Glow" },
  ];

  const spawnBalloon = (scene, index, total) => {
    const balloonGroup = new THREE.Group();

    const colorConfig = colors[index % colors.length];
    const balloonMat = new THREE.MeshStandardMaterial({
      color: colorConfig.color,
      metalness: colorConfig.metalness,
      roughness: colorConfig.roughness,
    });

    // 1. Balloon Body (Oval Sphere)
    const bodyGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const bodyMesh = new THREE.Mesh(bodyGeo, balloonMat);
    bodyMesh.scale.set(1.0, 1.28, 1.0);
    bodyMesh.castShadow = true;
    balloonGroup.add(bodyMesh);

    // 2. Balloon Knot (Small Cone at bottom)
    const knotGeo = new THREE.ConeGeometry(0.12, 0.18, 16);
    const knotMesh = new THREE.Mesh(knotGeo, balloonMat);
    knotMesh.position.y = -1.02;
    knotMesh.rotation.x = Math.PI;
    balloonGroup.add(knotMesh);

    // 3. Hanging String (Curved line)
    const stringPoints = [];
    let currentY = -1.1;
    let currentX = 0;
    for (let j = 0; j < 8; j++) {
      stringPoints.push(new THREE.Vector3(currentX, currentY, 0));
      currentY -= 0.28;
      currentX += Math.sin(j * 0.8) * 0.06;
    }
    const stringCurve = new THREE.CatmullRomCurve3(stringPoints);
    const stringGeo = new THREE.BufferGeometry().setFromPoints(stringCurve.getPoints(24));
    const stringMat = new THREE.LineBasicMaterial({ color: 0x998B7D, linewidth: 1.5 });
    const stringLine = new THREE.Line(stringGeo, stringMat);
    balloonGroup.add(stringLine);

    // Initial positioning in 3D space
    const spreadAngle = (index / total) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 2.4 + Math.random() * 1.6;
    const posX = Math.cos(spreadAngle) * distance;
    const posZ = Math.sin(spreadAngle) * distance * 0.7;
    const posY = -0.5 + Math.random() * 2.2;

    balloonGroup.position.set(posX, posY, posZ);

    // Custom animation parameters
    balloonGroup.userData = {
      baseY: posY,
      baseX: posX,
      baseZ: posZ,
      floatSpeed: 0.8 + Math.random() * 0.6,
      swaySpeed: 1.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      bodyMesh: bodyMesh,
      id: Math.random(),
    };

    scene.add(balloonGroup);
    balloonsRef.current.push(balloonGroup);
    return balloonGroup;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isMobile = width < 540;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, isMobile ? 9.2 : 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xFFF9F0, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFE8C8, 2.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xFFFDF7, 1.0);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Spawn initial balloons
    balloonsRef.current = [];
    for (let i = 0; i < 6; i++) {
      spawnBalloon(scene, i, 6);
    }

    // RAYCASTING FOR INTERACTION (Click & Touch to Pop)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const triggerPopAt = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check hits against balloon body meshes
      const interactiveMeshes = balloonsRef.current.map(b => b.userData.bodyMesh).filter(Boolean);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const hitBalloonGroup = hitMesh.parent;

        if (hitBalloonGroup) {
          // Play pop sound
          celebrationAudio.playPopSound();

          // Compliment random message
          const randomCompliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
          setPoppedMessage(randomCompliment);

          // Remove balloon with scale pop effect
          hitBalloonGroup.scale.set(1.4, 1.4, 1.4);
          setTimeout(() => {
            scene.remove(hitBalloonGroup);
            balloonsRef.current = balloonsRef.current.filter(b => b !== hitBalloonGroup);
            setBalloonCount(balloonsRef.current.length);
          }, 80);
        }
      }
    };

    const handleClick = (e) => {
      triggerPopAt(e.clientX, e.clientY);
    };

    const handleTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        triggerPopAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('touchstart', handleTouch, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || (w < 540 ? 280 : 360);
      const isMob = w < 540;
      camera.aspect = w / h;
      camera.position.z = isMob ? 9.2 : 7.5;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      balloonsRef.current.forEach((balloon) => {
        const { baseY, baseX, baseZ, floatSpeed, swaySpeed, phase } = balloon.userData;
        // Natural gentle bobbing & breeze
        balloon.position.y = baseY + Math.sin(time * floatSpeed + phase) * 0.35;
        balloon.position.x = baseX + Math.cos(time * swaySpeed * 0.6 + phase) * 0.15;
        balloon.rotation.z = Math.sin(time * swaySpeed + phase) * 0.08;
        balloon.rotation.y = Math.cos(time * 0.5 + phase) * 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('click', handleClick);
      container.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const handleAddBalloons = () => {
    if (!sceneRef.current) return;
    celebrationAudio.playSparkleChime();
    for (let i = 0; i < 3; i++) {
      spawnBalloon(sceneRef.current, balloonsRef.current.length + i, balloonsRef.current.length + 3);
    }
    setBalloonCount(balloonsRef.current.length);
  };

  return (
    <div className="relative w-full luxury-card rounded-2xl p-6 sm:p-8 overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE0CF] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DE] text-[#936C22] text-xs font-semibold tracking-wide uppercase mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Interactive 3D Balloons</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#1E1D24]">
            Plam's Floating Celebration Canopy
          </h3>
          <p className="text-sm text-[#706B62] mt-0.5">
            Click any floating balloon to pop it and reveal a secret birthday praise!
          </p>
        </div>

        <button
          onClick={handleAddBalloons}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF6EE] hover:bg-[#F3EAD7] text-[#1E1D24] font-medium text-xs border border-[#DECBAE] transition-all duration-200 active:scale-95 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5 text-[#A17415]" />
          <span>Release More Balloons ({balloonCount} Active)</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-[270px] sm:h-[350px] relative cursor-pointer touch-none"
        title="Tap or click on any balloon to pop it!"
      />

      {/* Sweet Compliment Banner when popped */}
      {poppedMessage && (
        <div className="mt-4 p-4 rounded-xl bg-[#FFF9EE] border border-[#DECBAE] flex items-center justify-between animate-fadeIn shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FCECEE] flex items-center justify-center text-[#C97A7E]">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A17415] font-semibold">Special Friendship Note</p>
              <p className="text-sm font-medium text-[#1E1D24]">{poppedMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setPoppedMessage(null)}
            className="text-xs text-[#8C8275] hover:text-[#1E1D24] px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

