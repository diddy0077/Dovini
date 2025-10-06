import React, { useState, useEffect } from 'react';
import { Camera, Zap, Package, Phone, TrendingUp, Cpu, Gift, Headset, Aperture, ZoomIn, Focus, Plane, BatteryCharging, Filter, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { categories } from '../data/categories';

// --- Data & Helpers ---


// Slides for the central carousel
const slides = [
    {
        title: 'CAPTURE THE MOMENT',
        subtitle: 'Up to 40% Off Premium Lenses and Kits.',
        colorClass: 'bg-gray-800',
        tag: 'SHUTTER SALE',
        tagColor: 'bg-red-600',
    },
    {
        title: 'NEW DOVINI MARK V',
        subtitle: 'Pre-order now and get a free battery grip!',
        colorClass: 'bg-red-700',
        tag: 'PRE-ORDER',
        tagColor: 'bg-gray-900',
    },
    {
        title: 'DRONE FLYAWAY SALE',
        subtitle: 'Massive discounts on all Aerial Gear. Limited stock!',
        colorClass: 'bg-blue-800',
        tag: 'FLY HIGH',
        tagColor: 'bg-red-600',
    },
];

// Promotional tiles for the horizontal scroller
const promoTiles = [
    { 
        title: 'Gear Deals', 
        subtitle: 'Flash Savings', 
        bgColor: 'bg-red-600', 
        textColor: 'text-white', 
        imgText: 'DEALS', 
        link: '#' 
    },
    { 
        title: 'Clearance', 
        subtitle: 'Up to 70% Off', 
        bgColor: 'bg-gray-200', 
        textColor: 'text-gray-800', 
        imgText: 'SAVE', 
        link: '#' 
    },
    { 
        title: 'Dovini Pro', 
        subtitle: 'Exclusive Service', 
        bgColor: 'bg-black', 
        textColor: 'text-red-500', 
        imgText: 'PRO', 
        link: '#' 
    },
    { 
        title: 'Used Gear Sell', 
        subtitle: 'Quick Cash Offer', 
        bgColor: 'bg-yellow-500', 
        textColor: 'text-gray-900', 
        imgText: 'SELL', 
        link: '#' 
    },
    { 
        title: 'Trade-Up Bonus', 
        subtitle: '10% Extra Credit', 
        bgColor: 'bg-green-600', 
        textColor: 'text-white', 
        imgText: 'TRADE', 
        link: '#' 
    },
    { 
        title: 'New Arrivals', 
        subtitle: 'Latest Gear', 
        bgColor: 'bg-indigo-600', 
        textColor: 'text-white', 
        imgText: 'NEW', 
        link: '#' 
    },
    { 
        title: 'Accessories', 
        subtitle: 'Bags & Straps', 
        bgColor: 'bg-orange-500', 
        textColor: 'text-white', 
        imgText: 'ACCESSORY', 
        link: '#' 
    },
    { 
        title: 'Support', 
        subtitle: '24/7 Experts', 
        bgColor: 'bg-pink-500', 
        textColor: 'text-white', 
        imgText: 'HELP', 
        link: '#' 
    },
];

// Reusable Button Component for the Right Panel
const InfoButton = ({ title, description, Icon }) => (
    <div className="flex items-center p-3 transition duration-300 ease-in-out cursor-pointer hover:bg-gray-50 rounded-lg">
        <Icon className="w-6 h-6 mr-3 text-red-600" />
        <div>
            <div className="text-sm font-semibold text-gray-800">{title}</div>
            <div className="text-xs text-gray-500">{description}</div>
        </div>
    </div>
);

// --- Main App Component ---

const Hero = () => {
    // State for the main carousel
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;

    // Auto-advance logic for the carousel
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000); // Change slide every 5 seconds (5000ms)

        return () => clearTimeout(timer);
    }, [currentSlide, totalSlides]);

    const slide = slides[currentSlide];
    
    // Function to handle horizontal scrolling of the promo tiles
    const scrollContainer = (direction) => {
        const container = document.getElementById('promo-scroll-container');
        if (container) {
            const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the visible width
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid lg:grid-cols-12 gap-6 mb-8">

                    {/* 1. Left Categories Sidebar (Jumia-style menu) */}
                    <div className="lg:col-span-3 xl:col-span-2 hidden lg:block">
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                            <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Shop Categories</h2>
                            <ul className="space-y-1">
                                {categories.map((category, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-700 p-2 rounded-lg transition duration-150 hover:bg-red-50 hover:text-red-600 cursor-pointer">
                                        <category.icon className="w-4 h-4 mr-3 opacity-70" />
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* 2. Central Main Banner (Carousel Slider) */}
                    <div className="lg:col-span-6 xl:col-span-7">
                        <div className={`relative overflow-hidden h-[400px] sm:h-[450px] ${slide.colorClass} rounded-xl shadow-2xl flex items-center justify-between p-6 md:p-12 transition-all duration-500 ease-in-out`}>
                            
                            {/* Decorative Tag */}
                            <div className={`absolute top-0 left-0 ${slide.tagColor} text-white px-6 py-2 rounded-br-xl text-lg font-extrabold shadow-md transform -translate-x-1 -translate-y-1 rotate-1`}>
                                <Zap className="w-5 h-5 inline mr-2" />
                                {slide.tag}
                            </div>

                            {/* Text Content */}
                            <div className="z-10 max-w-md">
                                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-2">
                                    <span className="text-red-400">DOVINI</span> {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl font-light text-gray-200 mb-6">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-white text-red-600 text-lg font-semibold px-8 py-3 rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:scale-[1.02] active:scale-[0.98]">
                                    Shop Now
                                </button>
                            </div>

                            {/* Image Placeholder (Dynamic background color based on slide) */}
                            <div className="relative z-10 hidden sm:block">
                                <img
                                    src={`https://placehold.co/200x200/FFFFFF/${slide.colorClass.replace('bg-', '')}?text=GEAR+${currentSlide + 1}`}
                                    alt={`Slide ${currentSlide + 1} promotion`}
                                    className="rounded-lg object-cover shadow-2xl w-52 h-52 transition-transform duration-500"
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/4B5563/FFFFFF?text=Dovini+Gear" }}
                                />
                            </div>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            currentSlide === index ? 'bg-red-400 w-5' : 'bg-white opacity-50'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Right Info Panel (Utility Links) */}
                    <div className="lg:col-span-3 xl:col-span-3">
                        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 space-y-2">
                            <InfoButton
                                title="Expert Support"
                                description="Schedule a call with a pro technician"
                                Icon={Headset}
                            />
                            <div className="h-px bg-gray-200 mx-3"></div>
                            <InfoButton
                                title="Buy Your Gears"
                                description="Get a quote for your used equipment"
                                Icon={TrendingUp}
                            />
                            <div className="h-px bg-gray-200 mx-3"></div>
                            <InfoButton
                                title="Trade-In Program"
                                description="Upgrade your current camera today"
                                Icon={Gift}
                            />
                        </div>

                        {/* Secondary Banner */}
                        <div className="mt-6 bg-red-600 p-4 rounded-xl shadow-lg text-white">
                             <Phone className="w-6 h-6 mb-2" />
                            <h3 className="text-xl font-bold">CALL FOR ADVICE</h3>
                            <p className="text-2xl font-extrabold mt-1">1-800-DOVINI</p>
                        </div>
                    </div>
                </div>

                {/* --- New Section: Horizontal Scrolling Promo Tiles --- */}
                <div className="relative py-4">
                    {/* Scroll Buttons */}
                    <button 
                        onClick={() => scrollContainer('left')}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition hidden md:block"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    
                    <button 
                        onClick={() => scrollContainer('right')}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition hidden md:block"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>

                    <div 
                        id="promo-scroll-container"
                        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for various browsers
                    >
                        {/* Custom utility for hiding scrollbar in CSS */}
                        <style>{`
                            #promo-scroll-container::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {promoTiles.map((tile, index) => (
                            <a 
                                key={index} 
                                href={tile.link}
                                className="flex-shrink-0 w-32 sm:w-40 md:w-48 group cursor-pointer"
                            >
                                {/* Tile Image/Content Block */}
                                <div className={`relative h-32 w-full ${tile.bgColor} rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02] border-4 border-white`}>
                                    {/* Placeholder Image/Icon */}
                                    <div className={`flex items-center justify-center h-full w-full p-2`}>
                                        {tile.imgText === 'DEALS' ? (
                                            <div className="text-4xl font-extrabold text-white text-center leading-none">
                                                <span className="text-red-400">DOVINI</span> 
                                                <br/>
                                                DEALS
                                            </div>
                                        ) : tile.imgText === 'SAVE' ? (
                                            <div className="text-4xl font-extrabold text-red-600 text-center leading-none">
                                                <Zap className='w-8 h-8 mx-auto text-red-600'/>
                                                SALE
                                            </div>
                                        ) : (
                                            <div className={`text-2xl font-black ${tile.textColor} text-center leading-none opacity-80`}>
                                                <CheckCircle className={`w-8 h-8 mx-auto mb-1 ${tile.textColor}`}/>
                                                {tile.imgText}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Tile Text */}
                                <div className="text-center mt-2">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition">{tile.title}</p>
                                    <p className="text-xs text-gray-500">{tile.subtitle}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* --- End New Section --- */}
            </main>
        </div>
    );
};

export default Hero;
