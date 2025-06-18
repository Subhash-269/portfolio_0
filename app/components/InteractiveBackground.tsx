'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

interface MousePosition {
    x: number;
    y: number;
}

interface MorphingShape {
    id: number;
    initialY: string;
    middleY: string;
    endY: string;
}

interface FloatingElement {
    id: number;
    left: string;
    top: string;
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [morphingShapes, setMorphingShapes] = useState<MorphingShape[]>([]);
    const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
    const [isClient, setIsClient] = useState(false);

    // Initialize particles
    const initParticles = useCallback((width: number, height: number) => {
        const particleCount = Math.min(50, Math.floor((width * height) / 15000));
        const newParticles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)` // Blue to cyan range
            });
        }
        return newParticles;
    }, []);

    // Handle mouse movement
    const handleMouseMove = useCallback((event: MouseEvent) => {
        setMousePos({ x: event.clientX, y: event.clientY });
    }, []);

    // Update canvas dimensions
    const updateDimensions = useCallback(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, []);    useEffect(() => {
        setIsClient(true);
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [updateDimensions, handleMouseMove]);

    // Initialize morphing shapes and floating elements on client only
    useEffect(() => {
        if (!isClient) return;

        // Initialize morphing shapes
        const shapes: MorphingShape[] = [];
        for (let i = 0; i < 3; i++) {
            shapes.push({
                id: i,
                initialY: `${Math.random() * 100}vh`,
                middleY: `${Math.random() * 100}vh`,
                endY: `${Math.random() * 100}vh`,
            });
        }
        setMorphingShapes(shapes);

        // Initialize floating elements
        const elements: FloatingElement[] = [];
        for (let i = 0; i < 5; i++) {
            elements.push({
                id: i,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
            });
        }        setFloatingElements(elements);
    }, [isClient]);    useEffect(() => {
        if (dimensions.width && dimensions.height && isClient) {
            setParticles(initParticles(dimensions.width, dimensions.height));
        }
    }, [dimensions, initParticles, isClient]);

    // Update particles ref when particles state changes
    useEffect(() => {
        particlesRef.current = particles;
    }, [particles]);    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isClient || particles.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            // Update particles directly without setState in animation loop
            const updatedParticles = particlesRef.current.map(particle => {
                // Mouse interaction
                const dx = mousePos.x - particle.x;
                const dy = mousePos.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.vx += (dx / distance) * force * 0.01;
                    particle.vy += (dy / distance) * force * 0.01;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Boundary checking
                if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

                // Keep particles in bounds
                particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
                particle.y = Math.max(0, Math.min(dimensions.height, particle.y));

                // Apply friction
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.replace('60%)', `${particle.opacity})`);
                ctx.fill();

                return particle;
            });

            // Update the ref for next frame
            particlesRef.current = updatedParticles;

            // Draw connections
            updatedParticles.forEach((particle, i) => {
                updatedParticles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(100, 200, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }        };
    }, [mousePos.x, mousePos.y, dimensions.width, dimensions.height, isClient, particles]); // Only depend on mouse position and dimensions

    return (
        <>
            {/* Only render when client-side */}
            {!isClient ? null : (
                <>
                    {/* Particle Canvas */}
                    <canvas
                        ref={canvasRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        className="fixed inset-0 pointer-events-none z-0"
                        style={{ background: 'transparent' }}
                    />

                    {/* Animated Grid Background */}
                    <div className="fixed inset-0 pointer-events-none z-0">
                        <motion.div
                            className="absolute inset-0 opacity-5 dark:opacity-10"
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'linear'
                            }}
                            style={{
                                backgroundImage: `
                                    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                                    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                                `,
                                backgroundSize: '50px 50px'
                            }}
                        />
                    </div>

                    {/* Morphing Shapes */}
                    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                        {morphingShapes.map((shape, i) => (
                            <motion.div
                                key={shape.id}
                                className="absolute rounded-full opacity-5 dark:opacity-10"
                                style={{
                                    background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
                                    width: '300px',
                                    height: '300px',
                                }}
                                animate={{
                                    x: ['-150px', 'calc(100vw + 150px)', '-150px'],
                                    y: [shape.initialY, shape.middleY, shape.endY],
                                    scale: [1, 1.5, 1],
                                    rotate: [0, 360, 0],
                                }}
                                transition={{
                                    duration: 15 + i * 5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: i * 5
                                }}
                            />
                        ))}
                    </div>

                    {/* Parallax Floating Elements */}
                    <div className="fixed inset-0 pointer-events-none z-0">
                        {floatingElements.map((element, i) => (
                            <motion.div
                                key={element.id}
                                className="absolute"
                                style={{
                                    left: element.left,
                                    top: element.top,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, -5, 0],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: i * 0.5
                                }}
                            >
                                <div
                                    className="w-4 h-4 bg-blue-400/20 dark:bg-blue-300/30 rounded-full"
                                    style={{
                                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
