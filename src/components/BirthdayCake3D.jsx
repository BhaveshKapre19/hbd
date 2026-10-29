import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { celebrationAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Flame, Wind, RotateCcw, Sparkles } from 'lucide-react';

export default function BirthdayCake3D({ onCandlesBlown }) {
  const mountRef = useRef(null);
  const [isLit, setIsLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [blowCount, setBlowCount] = useState(0);

  // References to 3D objects for animation & state toggling
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const flamesRef = useRef([]);
  const lightsRef = useRef([]);
  const smokeParticlesRef = useRef([]);
  const sparklesRef = useRef(null);
  const cakeGroupRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const isMobile = width < 540;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, isMobile ? 4.1 : 3.8, isMobile ? 9.6 : 7.8);
    camera.lookAt(0, 0.5, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // AMBIENT & DIRECTIONAL LIGHTING (Warm luxury light)
    const ambientLight = new THREE.AmbientLight(0xFFF7EC, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF0D6, 2.0);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xFDF1DF, 0.8);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    // CAKE ROOT GROUP
    const cakeGroup = new THREE.Group();
    cakeGroupRef.current = cakeGroup;
    scene.add(cakeGroup);

    // MATERIALS
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.85,
      roughness: 0.25,
    });

    const ivoryFrostingMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFDF7,
      roughness: 0.35,
      metalness: 0.05,
    });

    const blushFrostingMaterial = new THREE.MeshStandardMaterial({
      color: 0xF7D6D8,
      roughness: 0.4,
      metalness: 0.05,
    });

    const creamPipingMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFF9EE,
      roughness: 0.2,
      metalness: 0.05,
    });

    const strawberryMaterial = new THREE.MeshStandardMaterial({
      color: 0xC92A42,
      roughness: 0.3,
      metalness: 0.1,
    });

    // 1. BASE STAND (Golden Pedestal)
    const standPlateGeo = new THREE.CylinderGeometry(2.7, 2.8, 0.2, 48);
    const standPlate = new THREE.Mesh(standPlateGeo, goldMaterial);
    standPlate.position.y = -1.1;
    standPlate.receiveShadow = true;
    cakeGroup.add(standPlate);

    const standBaseGeo = new THREE.CylinderGeometry(1.6, 2.0, 0.3, 36);
    const standBase = new THREE.Mesh(standBaseGeo, goldMaterial);
    standBase.position.y = -1.35;
    standBase.receiveShadow = true;
    cakeGroup.add(standBase);

    // 2. BOTTOM TIER (Ivory Fondant)
    const bottomTierGeo = new THREE.CylinderGeometry(2.3, 2.3, 1.1, 48);
    const bottomTier = new THREE.Mesh(bottomTierGeo, ivoryFrostingMaterial);
    bottomTier.position.y = -0.45;
    bottomTier.castShadow = true;
    bottomTier.receiveShadow = true;
    cakeGroup.add(bottomTier);

    // Bottom tier pearl border
    const pearlCount = 32;
    const pearlRadius = 2.3;
    const pearlGeo = new THREE.SphereGeometry(0.09, 16, 16);
    for (let i = 0; i < pearlCount; i++) {
      const angle = (i / pearlCount) * Math.PI * 2;
      const pearl = new THREE.Mesh(pearlGeo, creamPipingMaterial);
      pearl.position.set(Math.cos(angle) * pearlRadius, -0.98, Math.sin(angle) * pearlRadius);
      cakeGroup.add(pearl);
    }

    // 3. MIDDLE TIER (Blush Strawberry Velvet)
    const midTierGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.95, 48);
    const midTier = new THREE.Mesh(midTierGeo, blushFrostingMaterial);
    midTier.position.y = 0.58;
    midTier.castShadow = true;
    midTier.receiveShadow = true;
    cakeGroup.add(midTier);

    // Middle tier golden bead ring
    const midBeadCount = 26;
    const midBeadRadius = 1.7;
    for (let i = 0; i < midBeadCount; i++) {
      const angle = (i / midBeadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(pearlGeo, goldMaterial);
      bead.position.set(Math.cos(angle) * midBeadRadius, 0.12, Math.sin(angle) * midBeadRadius);
      cakeGroup.add(bead);
    }

    // 4. TOP TIER (Pure Cream Fondant)
    const topTierGeo = new THREE.CylinderGeometry(1.1, 1.1, 0.8, 48);
    const topTier = new THREE.Mesh(topTierGeo, ivoryFrostingMaterial);
    topTier.position.y = 1.45;
    topTier.castShadow = true;
    topTier.receiveShadow = true;
    cakeGroup.add(topTier);

    // Top tier cream dollops
    const topDollopCount = 10;
    const topDollopRadius = 1.05;
    const dollopGeo = new THREE.ConeGeometry(0.12, 0.22, 16);
    for (let i = 0; i < topDollopCount; i++) {
      const angle = (i / topDollopCount) * Math.PI * 2;
      const dollop = new THREE.Mesh(dollopGeo, creamPipingMaterial);
      dollop.position.set(Math.cos(angle) * topDollopRadius, 1.86, Math.sin(angle) * topDollopRadius);
      dollop.rotation.y = angle;
      cakeGroup.add(dollop);
    }

    // Strawberries / Macaron toppings
    const strawberryGeo = new THREE.ConeGeometry(0.16, 0.32, 16);
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + 0.3;
      const berry = new THREE.Mesh(strawberryGeo, strawberryMaterial);
      berry.position.set(Math.cos(angle) * 0.72, 1.95, Math.sin(angle) * 0.72);
      berry.rotation.x = Math.PI;
      berry.rotation.z = (Math.random() - 0.5) * 0.3;
      cakeGroup.add(berry);
    }

    // 5. CANDLES (3 Slender Golden Candles for Plam)
    const candlePositions = [
      { x: 0, z: 0 },
      { x: -0.42, z: 0.25 },
      { x: 0.42, z: 0.25 },
    ];

    const candleGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.75, 16);
    const wickGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8);
    const wickMaterial = new THREE.MeshBasicMaterial({ color: 0x2B2724 });

    const flames = [];
    const lights = [];

    candlePositions.forEach((pos, idx) => {
      // Candle stick
      const candle = new THREE.Mesh(candleGeo, goldMaterial);
      candle.position.set(pos.x, 2.22, pos.z);
      candle.castShadow = true;
      cakeGroup.add(candle);

      // Wick
      const wick = new THREE.Mesh(wickGeo, wickMaterial);
      wick.position.set(pos.x, 2.62, pos.z);
      cakeGroup.add(wick);

      // Flame group (flame mesh + inner glow)
      const flameGroup = new THREE.Group();
      flameGroup.position.set(pos.x, 2.75, pos.z);

      const flameOuterGeo = new THREE.ConeGeometry(0.075, 0.26, 16);
      flameOuterGeo.translate(0, 0.13, 0);
      const flameOuterMat = new THREE.MeshBasicMaterial({
        color: 0xFFA500,
        transparent: true,
        opacity: 0.95,
      });
      const flameOuter = new THREE.Mesh(flameOuterGeo, flameOuterMat);

      const flameInnerGeo = new THREE.ConeGeometry(0.04, 0.18, 16);
      flameInnerGeo.translate(0, 0.09, 0);
      const flameInnerMat = new THREE.MeshBasicMaterial({
        color: 0xFFFEE0,
      });
      const flameInner = new THREE.Mesh(flameInnerGeo, flameInnerMat);

      flameGroup.add(flameOuter);
      flameGroup.add(flameInner);
      cakeGroup.add(flameGroup);
      flames.push(flameGroup);

      // Warm point light for flickering candle aura
      const candleLight = new THREE.PointLight(0xFFB03B, 1.2, 4.5);
      candleLight.position.set(pos.x, 2.85, pos.z);
      cakeGroup.add(candleLight);
      lights.push(candleLight);
    });

    flamesRef.current = flames;
    lightsRef.current = lights;

    // 6. SPARKLES (Floating Golden Dust Particles around the cake)
    const sparkleCount = 65;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    const sparkleScales = new Float32Array(sparkleCount);

    for (let i = 0; i < sparkleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = 1.4 + Math.random() * 2.2;
      const y = -0.5 + Math.random() * 3.8;
      sparklePositions[i * 3] = Math.cos(theta) * rad;
      sparklePositions[i * 3 + 1] = y;
      sparklePositions[i * 3 + 2] = Math.sin(theta) * rad;
      sparkleScales[i] = Math.random();
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));

    const sparkleMat = new THREE.PointsMaterial({
      color: 0xE5B83B,
      size: 0.07,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    cakeGroup.add(sparkles);
    sparklesRef.current = sparkles;

    // MOUSE INTERACTION (Rotate 3D Cake with click & drag)
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      if (cakeGroupRef.current) {
        cakeGroupRef.current.rotation.y += deltaX * 0.01;
        cakeGroupRef.current.rotation.x = Math.max(-0.2, Math.min(0.4, cakeGroupRef.current.rotation.x + deltaY * 0.005));
      }

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile/tablets
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      if (cakeGroupRef.current) {
        cakeGroupRef.current.rotation.y += deltaX * 0.012;
      }

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || (newWidth < 540 ? 340 : 420);
      const isMob = newWidth < 540;
      camera.aspect = newWidth / newHeight;
      camera.position.z = isMob ? 9.6 : 7.8;
      camera.position.y = isMob ? 4.1 : 3.8;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto rotation when user is not dragging
      if (!isDraggingRef.current && cakeGroupRef.current) {
        cakeGroupRef.current.rotation.y += 0.004;
      }

      // Flame flicker animation & light pulsing
      flamesRef.current.forEach((flame, index) => {
        if (flame.visible) {
          const flicker = Math.sin(elapsedTime * 14 + index * 2.3) * 0.12;
          const wobbleX = Math.sin(elapsedTime * 8 + index) * 0.08;
          const wobbleZ = Math.cos(elapsedTime * 9 + index) * 0.08;
          flame.scale.set(1 + flicker, 1 + flicker * 1.4, 1 + flicker);
          flame.rotation.x = wobbleX;
          flame.rotation.z = wobbleZ;

          if (lightsRef.current[index]) {
            lightsRef.current[index].intensity = 1.1 + flicker * 1.2;
          }
        }
      });

      // Sparkles floating rotation
      if (sparklesRef.current) {
        sparklesRef.current.rotation.y = elapsedTime * 0.08;
      }

      // Animate smoke particles if any
      for (let i = smokeParticlesRef.current.length - 1; i >= 0; i--) {
        const particle = smokeParticlesRef.current[i];
        particle.position.y += particle.userData.speedY;
        particle.position.x += particle.userData.speedX;
        particle.scale.multiplyScalar(1.02);
        particle.material.opacity -= 0.015;

        if (particle.material.opacity <= 0) {
          scene.remove(particle);
          smokeParticlesRef.current.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  // BLOW CANDLE ACTION
  const handleBlowCandles = () => {
    if (!isLit || isBlowing) return;
    setIsBlowing(true);

    // Play breath audio
    celebrationAudio.playBlowingSound();

    // Create smoke particles at each flame location
    const scene = sceneRef.current;
    if (scene && flamesRef.current.length > 0) {
      flamesRef.current.forEach((flame) => {
        const candleWorldPos = new THREE.Vector3();
        flame.getWorldPosition(candleWorldPos);

        for (let i = 0; i < 9; i++) {
          const smokeGeo = new THREE.SphereGeometry(0.045 + Math.random() * 0.03, 8, 8);
          const smokeMat = new THREE.MeshBasicMaterial({
            color: 0xD0C8BA,
            transparent: true,
            opacity: 0.65,
          });
          const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
          smokeMesh.position.copy(candleWorldPos);
          smokeMesh.position.x += (Math.random() - 0.5) * 0.1;
          smokeMesh.position.z += (Math.random() - 0.5) * 0.1;

          smokeMesh.userData = {
            speedY: 0.015 + Math.random() * 0.02,
            speedX: (Math.random() - 0.5) * 0.01,
          };

          scene.add(smokeMesh);
          smokeParticlesRef.current.push(smokeMesh);
        }
      });
    }

    // Extinguish flames smoothly
    setTimeout(() => {
      flamesRef.current.forEach((flame) => {
        flame.visible = false;
      });
      lightsRef.current.forEach((light) => {
        light.intensity = 0;
      });
      setIsLit(false);
      setIsBlowing(false);
      setBlowCount((prev) => prev + 1);

      // Play triumphant fanfare and confetti!
      celebrationAudio.playCheerFanfare();

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5B83B', '#DF9C9D', '#F4ECE0', '#FFFFFF', '#6B1D2F'],
        shapes: ['circle', 'square'],
      });

      if (onCandlesBlown) {
        onCandlesBlown();
      }
    }, 450);
  };

  // RELIGHT CANDLES ACTION
  const handleRelightCandles = () => {
    celebrationAudio.playSparkleChime();
    flamesRef.current.forEach((flame) => {
      flame.visible = true;
    });
    lightsRef.current.forEach((light) => {
      light.intensity = 1.2;
    });
    setIsLit(true);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-[320px] sm:h-[400px] md:h-[460px] cursor-grab active:cursor-grabbing relative flex items-center justify-center select-none touch-none"
        title="Click and drag to rotate the 3D cake in 360°"
      />

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-1 z-10">
        {isLit ? (
          <button
            onClick={handleBlowCandles}
            disabled={isBlowing}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#1E1D24] text-[#FFFDF9] font-medium text-sm tracking-wide shadow-luxury hover:bg-[#2F2C38] active:scale-95 transition-all duration-200 border border-[#D4AF37]/40"
          >
            <Wind className="w-4 h-4 text-[#E5B83B] group-hover:rotate-12 transition-transform duration-300" />
            <span>Make a Wish & Blow Candles</span>
            <span className="w-2 h-2 rounded-full bg-[#E5B83B] animate-ping" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleRelightCandles}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF6EE] text-[#1E1D24] font-medium text-sm border border-[#DECBAE] shadow-sm hover:bg-[#F3ECE0] active:scale-95 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4 text-[#A17415]" />
              <span>Light Candles Again</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F5EFE4] text-[#7E6036] text-xs font-semibold tracking-wide border border-[#DECBAE]/50">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A322]" />
              <span>Wish Sent to the Stars! ✨</span>
            </div>
          </div>
        )}
      </div>

      {/* Helpful Hint */}
      <p className="text-xs text-[#8C8275] mt-2.5 flex items-center gap-1.5">
        <span>✨ Drag around the cake to inspect every angle • Click to blow the flame</span>
      </p>
    </div>
  );
}

