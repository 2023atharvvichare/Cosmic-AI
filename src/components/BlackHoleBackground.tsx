import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BlackHoleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Black hole (event horizon)
    const blackHoleGeometry = new THREE.SphereGeometry(1, 64, 64);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      transparent: true,
      opacity: 0.95
    });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    // Event horizon glow
    const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x06B6D4) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(color, 1.0) * intensity * (0.8 + 0.2 * sin(time));
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Accretion disk with aurora colors
    const diskGeometry = new THREE.RingGeometry(1.5, 3.5, 128);
    const diskMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          float dist = length(vPosition);
          float angle = atan(vPosition.y, vPosition.x);
          
          // Create spiral pattern with rotation
          float spiral = sin(angle * 3.0 + time * 0.8 + dist * 2.0);
          
          // Aurora color palette - 8 vibrant colors for smooth transitions
          vec3 color1 = vec3(0.0, 1.0, 0.5);      // Bright cyan-green
          vec3 color2 = vec3(0.2, 0.8, 1.0);      // Sky blue
          vec3 color3 = vec3(0.4, 0.5, 1.0);      // Royal blue
          vec3 color4 = vec3(0.6, 0.2, 1.0);      // Purple
          vec3 color5 = vec3(1.0, 0.2, 0.8);      // Magenta
          vec3 color6 = vec3(1.0, 0.4, 0.5);      // Pink-coral
          vec3 color7 = vec3(0.0, 0.9, 0.8);      // Turquoise
          vec3 color8 = vec3(0.2, 1.0, 0.3);      // Lime green
          
          // Ultra-smooth color transitions based on time and position
          float colorMix = mod(time * 0.25 + dist * 0.6 + angle * 0.15, 8.0);
          vec3 color;
          
          // Smooth interpolation using smoothstep for extra smoothness
          float t = fract(colorMix);
          t = smoothstep(0.0, 1.0, t); // Apply smoothstep for smoother transitions
          
          if (colorMix < 1.0) {
            color = mix(color1, color2, t);
          } else if (colorMix < 2.0) {
            color = mix(color2, color3, t);
          } else if (colorMix < 3.0) {
            color = mix(color3, color4, t);
          } else if (colorMix < 4.0) {
            color = mix(color4, color5, t);
          } else if (colorMix < 5.0) {
            color = mix(color5, color6, t);
          } else if (colorMix < 6.0) {
            color = mix(color6, color7, t);
          } else if (colorMix < 7.0) {
            color = mix(color7, color8, t);
          } else {
            color = mix(color8, color1, t);
          }
          
          // Add shimmering effect
          float shimmer = 0.8 + 0.3 * sin(time * 2.0 + dist * 3.0) + 0.2 * spiral;
          color *= shimmer;
          
          // Fade at edges
          float alpha = smoothstep(3.5, 2.5, dist) * smoothstep(1.5, 2.0, dist) * shimmer;
          
          gl_FragColor = vec4(color, alpha * 0.85);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    disk.rotation.x = Math.PI / 3;
    scene.add(disk);

    // Particles for gravitational lensing effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color particles with cosmic colors
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 0.02; colors[i3 + 1] = 0.71; colors[i3 + 2] = 0.83; // Cyan
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.66; colors[i3 + 1] = 0.33; colors[i3 + 2] = 0.97; // Purple
      } else {
        colors[i3] = 0.98; colors[i3 + 1] = 0.45; colors[i3 + 2] = 0.09; // Orange
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add star field in background with galaxy formations
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Create galaxy spiral arms and constellation clusters
      const spiralArm = Math.floor(Math.random() * 4);
      const armAngle = (spiralArm * Math.PI / 2) + Math.random() * 0.8;
      const armRadius = 15 + Math.random() * 30;
      const spiralTightness = 0.3;
      
      // Some stars in spiral arms, some in clusters
      if (Math.random() < 0.7) {
        // Spiral galaxy arms
        const theta = armAngle + armRadius * spiralTightness;
        const phi = Math.random() * Math.PI;
        const radiusVariation = armRadius + (Math.random() - 0.5) * 3;
        
        starPositions[i3] = radiusVariation * Math.sin(phi) * Math.cos(theta);
        starPositions[i3 + 1] = radiusVariation * Math.sin(phi) * Math.sin(theta);
        starPositions[i3 + 2] = radiusVariation * Math.cos(phi) + (Math.random() - 0.5) * 2;
      } else {
        // Constellation clusters
        const clusterCenter = {
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          z: (Math.random() - 0.5) * 60
        };
        const clusterSpread = 2 + Math.random() * 3;
        
        starPositions[i3] = clusterCenter.x + (Math.random() - 0.5) * clusterSpread;
        starPositions[i3 + 1] = clusterCenter.y + (Math.random() - 0.5) * clusterSpread;
        starPositions[i3 + 2] = clusterCenter.z + (Math.random() - 0.5) * clusterSpread;
      }
      
      // Variable star sizes for depth
      starSizes[i] = 0.03 + Math.random() * 0.08;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starsMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Add foreground particles with physics
    const foregroundGeometry = new THREE.BufferGeometry();
    const fgCount = 1000;
    const fgPositions = new Float32Array(fgCount * 3);
    const fgVelocities = new Float32Array(fgCount * 3);
    const fgColors = new Float32Array(fgCount * 3);
    
    for (let i = 0; i < fgCount; i++) {
      const i3 = i * 3;
      fgPositions[i3] = (Math.random() - 0.5) * 20;
      fgPositions[i3 + 1] = (Math.random() - 0.5) * 20;
      fgPositions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      fgVelocities[i3] = 0;
      fgVelocities[i3 + 1] = 0;
      fgVelocities[i3 + 2] = 0;
      
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        fgColors[i3] = 0.02; fgColors[i3 + 1] = 0.71; fgColors[i3 + 2] = 0.83;
      } else if (colorChoice < 0.66) {
        fgColors[i3] = 0.66; fgColors[i3 + 1] = 0.33; fgColors[i3 + 2] = 0.97;
      } else {
        fgColors[i3] = 0.98; fgColors[i3 + 1] = 0.45; fgColors[i3 + 2] = 0.09;
      }
    }
    
    foregroundGeometry.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));
    foregroundGeometry.setAttribute('color', new THREE.BufferAttribute(fgColors, 3));
    const foregroundMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const foregroundParticles = new THREE.Points(foregroundGeometry, foregroundMaterial);
    scene.add(foregroundParticles);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Camera follows mouse smoothly
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate accretion disk with aurora effect
      disk.rotation.z += 0.005;
      
      // Animate background particles
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      // Slowly rotate stars
      stars.rotation.y += 0.0001;
      
      // Simulate gravitational pull on foreground particles
      const posAttribute = foregroundGeometry.getAttribute('position');
      for (let i = 0; i < fgCount; i++) {
        const i3 = i * 3;
        const x = posAttribute.getX(i);
        const y = posAttribute.getY(i);
        const z = posAttribute.getZ(i);
        
        // Calculate distance to black hole
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Apply gravitational force (inverse square law) - reduced speed
        if (distance > 0.1) {
          const force = 0.0003 / (distance * distance); // Reduced from 0.001 to 0.0003
          fgVelocities[i3] -= (x / distance) * force;
          fgVelocities[i3 + 1] -= (y / distance) * force;
          fgVelocities[i3 + 2] -= (z / distance) * force;
        }
        
        // Add slight random drift
        fgVelocities[i3] += (Math.random() - 0.5) * 0.0001;
        fgVelocities[i3 + 1] += (Math.random() - 0.5) * 0.0001;
        fgVelocities[i3 + 2] += (Math.random() - 0.5) * 0.0001;
        
        // Apply velocity with damping
        posAttribute.setX(i, x + fgVelocities[i3]);
        posAttribute.setY(i, y + fgVelocities[i3 + 1]);
        posAttribute.setZ(i, z + fgVelocities[i3 + 2]);
        
        fgVelocities[i3] *= 0.99;
        fgVelocities[i3 + 1] *= 0.99;
        fgVelocities[i3 + 2] *= 0.99;
        
        // Reset particles that get too close or too far
        const newDist = Math.sqrt(
          posAttribute.getX(i) ** 2 + 
          posAttribute.getY(i) ** 2 + 
          posAttribute.getZ(i) ** 2
        );
        if (newDist < 1.2 || newDist > 25) {
          posAttribute.setX(i, (Math.random() - 0.5) * 20);
          posAttribute.setY(i, (Math.random() - 0.5) * 20);
          posAttribute.setZ(i, (Math.random() - 0.5) * 10);
          fgVelocities[i3] = 0;
          fgVelocities[i3 + 1] = 0;
          fgVelocities[i3 + 2] = 0;
        }
      }
      posAttribute.needsUpdate = true;
      
      // Update shader uniforms
      glowMaterial.uniforms.time.value = time;
      diskMaterial.uniforms.time.value = time;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #000000 0%, #000000 100%)' }}
    />
  );
};
