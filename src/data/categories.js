import { 
  Camera, 
  Aperture, 
  Zap, 
  Focus, 
  Cpu, 
  Package, 
  Video, 
  Lightbulb, 
  SunMedium, 
  BatteryCharging, 
  SlidersHorizontal 
} from 'lucide-react';

export const categories = [
  { 
    id: 1, 
    name: 'Softboxes', 
    image: 'https://images.openai.com/thumbnails/url/WSbURnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70cw1NrwoO8Y7MLAkrcNTNKAmszC1zS88xNbNIyc8Ny6kw9jLLTYuPd3VNVyu2NTQAAB6oJYw',
    icon: SunMedium
  },
  { 
    id: 2, 
    name: 'Gimbals & Stabilizers', 
    image: 'https://images.unsplash.com/photo-1574281813181-02b512471486?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    icon: Focus
  },
  { 
    id: 3, 
    name: 'Microphones', 
    image: 'https://burst.shopifycdn.com/photos/black-microphone-set-against-a-pink-background.jpg?exif=0&format=pjpg&iptc=0&width=1000',
    icon: Cpu
  },
  { 
    id: 4, 
    name: 'LED Panel Lights', 
    image: 'https://lumecube.com/cdn/shop/files/Studio_Panel_Lighting_Kit_UCSD-09339-1160x1500-64b44e5_1160x.jpg?v=1704215663',
    icon: Zap
  },
  { 
    id: 5, 
    name: 'COB Lights', 
    image: 'https://www.lighting-geek.com/wp-content/uploads/2023/05/14-3-1-e1689965711325.png',
    icon: Lightbulb
  },
  { 
    id: 6, 
    name: 'Strobes & Speed Lights', 
    image: 'https://freestockfootagearchive.com/wp-content/uploads/2019/08/Glitchy-Shapes-Strobe-Light-Overlay-Effect.jpeg',
    icon: BatteryCharging
  },
  { 
    id: 7, 
    name: 'Light Stands', 
    image: 'https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-studio-lighting-isolated-on-black02-11-10-e852f1a4722511624c5d4d237891e5857f2abad0c0b13f9912f6708d40fc8dfd.jpg',
    icon: Package
  },
  { 
    id: 8, 
    name: 'Video Tripods & Monopods', 
    image: 'https://www.ulanzi.com/cdn/shop/files/2_2x-2.png?v=1753167291',
    icon: Video
  },
];
