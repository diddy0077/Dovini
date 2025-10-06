import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderAd = () => {
  const ads = [
    { 
      id: 1,
      message: "📷 Save 30% on DSLR Cameras!", 
      link: "/category/cameras", 
      image: "https://img.lovepik.com/desgin_photo/40161/4978_detail.jpg%21detail808" 
    },
    { 
      id: 2,
      message: "🎥 Free Tripod with Every Camera Purchase", 
      link: "/category/tripods", 
      image: "https://images.squarespace-cdn.com/content/v1/5c159e6650a54f728a2868b6/1628790763242-GIFR5HGEYEHS14XPGEY5/Rear%2BScreen%2Band%2BLenses%2Bfor%2BOne-on-One%2BTraining%2BPromo-12.jpg" 
    },
    { 
      id: 3,
      message: "💡 Studio Lighting Kits Starting at $99", 
      link: "/category/lighting", 
      image: "/assets/lighting-kit.png" 
    },
    { 
      id: 4,
      message: "🛒 Accessories Clearance – Up to 50% OFF", 
      link: "/category/accessories", 
      image: "/assets/accessories-sale.png" 
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 4000); // rotate every 4s
    return () => clearInterval(timer);
  }, [ads.length]);

  return (
    <div className="bg-red-600 text-white px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.a
            key={ads[index].id}
            href={ads[index].link}
            className="flex items-center gap-3 text-sm sm:text-base font-medium hover:underline"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={ads[index].image} 
              alt="ad" 
              className="h-10 sm:h-8 w-auto object-contain" 
            />
            <span>{ads[index].message}</span>
          </motion.a>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeaderAd;
