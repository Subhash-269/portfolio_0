'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMobile } from '../hooks/useMobile';

interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    githubUrl?: string;
    demoType: 'image-upload' | 'interactive' | 'iframe' | 'simulation';
    features: string[];
    metrics?: {
        label: string;
        value: string;
        color: string;
    }[];
}

interface ClassificationResult {
    class: string;
    confidence: string;
    allPredictions: {
        class: string;
        confidence: string;
    }[];
}

interface PredictionItem {
    class: string;
    confidence: string;
}

const projects: Project[] = [
    {
        id: 'cifar10',
        title: 'CIFAR-10 Image Classification',
        description: 'Deep learning model using ResNet-18 for real-time image classification with 94% accuracy.',
        tech: ['Python', 'PyTorch', 'FastAPI', 'Streamlit', 'ResNet-18'],
        liveUrl: 'https://cifar-image-classifier.streamlit.app/',
        githubUrl: 'https://github.com/yourusername/cifar10-classifier',
        demoType: 'image-upload',
        features: [
            'Real-time image classification',
            'Model quantization for speed',
            'SQLite prediction tracking',
            '10 class detection (plane, car, bird, etc.)'
        ],
        metrics: [
            { label: 'Accuracy', value: '94%', color: 'text-green-400' },
            { label: 'Inference Time', value: '<100ms', color: 'text-blue-400' },
            { label: 'Model Size', value: '2.3MB', color: 'text-purple-400' }
        ]
    },
    {
        id: 'smartcart',
        title: 'Smart Cart Price Optimizer',
        description: 'AI-powered shopping assistant that finds the lowest prices across multiple vendors.',
        tech: ['Django', 'PostgreSQL', 'React', 'Google Gemini API', 'Hugging Face'],
        githubUrl: 'https://github.com/aatmaj28/Innovaite-2025/tree/main',
        demoType: 'interactive',
        features: [
            'Multi-vendor price comparison',
            'Automated deal detection',
            'Inventory management',
            'Smart shopping recommendations'
        ],
        metrics: [
            { label: 'Time Saved', value: '70%', color: 'text-green-400' },
            { label: 'Cost Reduction', value: '25%', color: 'text-blue-400' },
            { label: 'Vendors', value: '50+', color: 'text-purple-400' }
        ]
    },
    {
        id: 'brain-tumor',
        title: 'Medical Brain Tumor Detection',
        description: 'Deep learning model for brain tumor detection in MRI scans with 85% precision.',
        tech: ['Deep Neural Networks', 'Computer Vision', 'Transfer Learning', 'Medical Imaging'],
        demoType: 'simulation',
        features: [
            'MRI scan analysis',
            'Multi-class tumor detection',
            'Transfer learning optimization',
            'Medical-grade accuracy'
        ],
        metrics: [
            { label: 'Precision', value: '85%', color: 'text-green-400' },
            { label: 'Training Images', value: '6K+', color: 'text-blue-400' },
            { label: 'Classes', value: '4', color: 'text-purple-400' }
        ]
    }
];

// Simulated CIFAR-10 classes for demo
const cifarClasses = [
    'airplane', 'automobile', 'bird', 'cat', 'deer', 
    'dog', 'frog', 'horse', 'ship', 'truck'
];

export default function ProjectDemos() {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<ClassificationResult | null>(null);
    const [cartItems, setCartItems] = useState<string[]>(['iPhone 15', 'MacBook Pro', 'AirPods']);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isMobile = useMobile();

    // Simulate image classification
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageUrl = e.target?.result as string;
            setUploadedImage(imageUrl);
            setIsAnalyzing(true);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate classification result
            const randomClass = cifarClasses[Math.floor(Math.random() * cifarClasses.length)];
            const confidence = (85 + Math.random() * 10).toFixed(1);
            
            setAnalysisResult({
                class: randomClass,
                confidence: confidence,
                allPredictions: cifarClasses.map(cls => ({
                    class: cls,
                    confidence: (Math.random() * 100).toFixed(1)
                })).sort((a, b) => parseFloat(b.confidence) - parseFloat(a.confidence))
            });
            setIsAnalyzing(false);
        };
        reader.readAsDataURL(file);
    };

    // Simulate price comparison
    const simulatePriceComparison = () => {
        const vendors = ['Amazon', 'Best Buy', 'Target', 'Walmart', 'eBay'];
        return cartItems.map(item => ({
            item,
            prices: vendors.map(vendor => ({
                vendor,
                price: (Math.random() * 500 + 100).toFixed(2),
                shipping: Math.random() > 0.5 ? 'Free' : '$9.99',
                rating: (4 + Math.random()).toFixed(1)
            })).sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }));
    };

    const renderDemo = (project: Project) => {
        switch (project.demoType) {
            case 'image-upload':
                return (
                    <div className="space-y-6">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 active:scale-95 ${
                                    isMobile.isTouchDevice ? 'min-h-[44px] text-base' : ''
                                }`}
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none'
                                }}
                            >
                                Upload Image for Classification
                            </button>
                            <p className="text-gray-400 mt-2">Upload any image to see CIFAR-10 classification</p>
                        </div>

                        {uploadedImage && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                                <div>
                                    <h4 className="text-lg font-semibold mb-3">Uploaded Image</h4>
                                    <div className="relative w-full h-64">
                                        <Image 
                                            src={uploadedImage} 
                                            alt="Uploaded image for classification" 
                                            fill
                                            className="object-cover rounded-lg border border-gray-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-3">Classification Results</h4>
                                    {isAnalyzing ? (
                                        <div className="flex items-center space-x-3">
                                            <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                            <span>Analyzing image...</span>
                                        </div>
                                    ) : analysisResult ? (
                                        <div className="space-y-3">
                                            <div className="bg-gray-800 p-4 rounded-lg">
                                                <div className="text-xl font-bold text-green-400">
                                                    {analysisResult.class}
                                                </div>
                                                <div className="text-gray-300">
                                                    Confidence: {analysisResult.confidence}%
                                                </div>
                                            </div>                                            <div className="space-y-2">
                                                <h5 className="font-semibold">Top Predictions:</h5>
                                                {analysisResult.allPredictions.slice(0, 5).map((pred: PredictionItem, idx: number) => (
                                                    <div key={idx} className="flex justify-between bg-gray-800/50 p-2 rounded">
                                                        <span>{pred.class}</span>
                                                        <span>{pred.confidence}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'interactive':
                const priceComparison = simulatePriceComparison();
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h4 className="text-lg font-semibold mb-3">Your Shopping Cart</h4>
                            <div className="space-y-2">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <span>{item}</span>
                                        <button
                                            onClick={() => setCartItems(cartItems.filter((_, i) => i !== idx))}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setCartItems([...cartItems, `Item ${cartItems.length + 1}`])}
                                className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition-colors"
                            >
                                Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Price Comparison Results</h4>
                            {priceComparison.map((item, idx) => (
                                <div key={idx} className="bg-gray-800 p-4 rounded-lg">
                                    <h5 className="font-semibold mb-3">{item.item}</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {item.prices.slice(0, 3).map((price, pidx) => (
                                            <div 
                                                key={pidx} 
                                                className={`p-3 rounded border ${pidx === 0 ? 'border-green-500 bg-green-500/10' : 'border-gray-600'}`}
                                            >
                                                <div className="font-semibold">{price.vendor}</div>
                                                <div className="text-lg font-bold text-green-400">${price.price}</div>
                                                <div className="text-sm text-gray-400">{price.shipping} shipping</div>
                                                <div className="text-sm">⭐ {price.rating}</div>
                                                {pidx === 0 && <div className="text-xs text-green-400 mt-1">Best Deal!</div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'simulation':
                return (
                    <div className="space-y-6">
                        <div className="text-center">
                            <p className="text-gray-400 mb-4">
                                This medical AI model analyzes MRI brain scans to detect tumors.
                                Due to privacy and medical regulations, this is a simulation.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-3">Sample MRI Scan</h4>
                                    <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400">MRI Brain Scan Placeholder</span>
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-lg">
                                    <h4 className="font-semibold mb-3">Detection Results</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Tumor Detected:</span>
                                            <span className="text-red-400">Positive</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Confidence:</span>
                                            <span className="text-green-400">85.3%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Type:</span>
                                            <span className="text-blue-400">Glioma</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span>Frontal Lobe</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Demo not available</div>;
        }
    };

    return (
        <section data-section="projects" className="py-12 sm:py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        Interactive Project Demos
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Experience my AI projects firsthand. Try live demos, explore interactive features, 
                        and see the technology in action.
                    </p>
                </motion.div>

                <div className={`grid gap-6 ${
                    isMobile.isMobile 
                        ? 'grid-cols-1' 
                        : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
                }`}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                <div className="flex gap-2">
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                            title="Live Demo"
                                        >
                                            🚀
                                        </a>
                                    )}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="View Code"
                                        >
                                            📁
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-400 mb-4">{project.description}</p>

                            {/* Metrics */}
                            {project.metrics && (
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {project.metrics.map((metric, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className={`text-lg font-bold ${metric.color}`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-xs text-gray-400">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded border border-gray-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>                            {/* Demo Button */}
                            <button
                                onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                                className={`w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 font-semibold active:scale-95 ${
                                    isMobile.isTouchDevice ? 'min-h-[44px] text-base' : ''
                                }`}
                                style={{
                                    WebkitTapHighlightColor: 'transparent',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none'
                                }}
                            >
                                {selectedProject === project.id ? 'Hide Demo' : 'Try Interactive Demo'}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Expanded Demo Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedProject(null)}
                        >                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`bg-gray-900/95 backdrop-blur-lg border border-gray-700 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto ${
                                    isMobile.isMobile ? 'p-4 mx-2' : 'p-6'
                                }`}
                            >
                                {(() => {
                                    const project = projects.find(p => p.id === selectedProject);
                                    if (!project) return null;

                                    return (
                                        <>
                                            <div className="flex items-start justify-between mb-6">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-gray-400">{project.description}</p>
                                                </div>                                                <button
                                                    onClick={() => setSelectedProject(null)}
                                                    className={`text-gray-400 hover:text-white transition-all duration-300 active:scale-95 ${
                                                        isMobile.isTouchDevice ? 'min-h-[44px] min-w-[44px] flex items-center justify-center' : ''
                                                    }`}
                                                    style={{
                                                        WebkitTapHighlightColor: 'transparent',
                                                        WebkitUserSelect: 'none',
                                                        userSelect: 'none'
                                                    }}
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {renderDemo(project)}
                                        </>
                                    );
                                })()}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
