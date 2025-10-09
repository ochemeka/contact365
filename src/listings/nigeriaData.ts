// src/listings/nigeriaData.ts

export interface Business {
  id: number;
  title: string;
  description: string;
  category: string;
  state: string;
  lga: string;
  area: string;
  rating: number;
  featured?: boolean;
  trending?: boolean;
  image: string;
  price?: string;
  phone?: string;
  whatsapp?: string;
  slug?: string;
  mapEmbed?: string;
  website?: string;
}

// Nigerian States with their LGAs
export const nigeriaLocationData = [
  {
    state: "Lagos",
    lgas: [
      {
        name: "Ikeja",
        areas: ["Computer Village", "Allen Avenue", "Opebi", "Alausa", "GRA"]
      },
      {
        name: "Lagos Island",
        areas: ["Marina", "Broad Street", "Idumota", "Balogun", "CMS"]
      },
      {
        name: "Surulere",
        areas: ["Adeniran Ogunsanya", "Ojuelegba", "Shitta", "Aguda"]
      },
      {
        name: "Yaba",
        areas: ["Akoka", "Sabo", "Onike", "Makoko"]
      },
      {
        name: "Alimosho",
        areas: ["Ikotun", "Egbeda", "Idimu", "Ipaja", "Iyana-Ipaja"]
      }
    ]
  },
  {
    state: "Abuja",
    lgas: [
      {
        name: "Municipal Area Council",
        areas: ["Wuse", "Garki", "Asokoro", "Maitama", "Central Business District"]
      },
      {
        name: "Gwagwalada",
        areas: ["Gwagwalada Town", "Kutunku", "Tunga-Maje"]
      },
      {
        name: "Kuje",
        areas: ["Kuje Town", "Rubochi", "Gudape"]
      }
    ]
  },
  {
    state: "Kano",
    lgas: [
      {
        name: "Kano Municipal",
        areas: ["Sabon Gari", "Fagge", "Dala", "Gwale"]
      },
      {
        name: "Nassarawa",
        areas: ["Nassarawa GRA", "Zoo Road", "Kofar Nassarawa"]
      }
    ]
  },
  {
    state: "Rivers",
    lgas: [
      {
        name: "Port Harcourt",
        areas: ["GRA", "Trans Amadi", "D-Line", "Rumuola", "Elekahia"]
      },
      {
        name: "Obio-Akpor",
        areas: ["Rumuokoro", "Choba", "Ozuoba", "Port Harcourt Township"]
      }
    ]
  },
  {
    state: "Oyo",
    lgas: [
      {
        name: "Ibadan North",
        areas: ["Bodija", "Agodi", "Sango", "Mokola"]
      },
      {
        name: "Ibadan South-West",
        areas: ["Ring Road", "Oke-Ado", "Molete"]
      }
    ]
  }
];

// Business categories specific to Nigeria
export const nigeriaCategories = [
  "Electronics & Phones",
  "Fashion & Tailoring",
  "Food & Restaurants",
  "Beauty & Salon",
  "Auto Repair & Parts",
  "Real Estate",
  "Construction & Building",
  "Agriculture & Farming",
  "Transportation",
  "Healthcare",
  "Education & Training",
  "Legal Services",
  "Financial Services",
  "Event Planning",
  "Security Services",
  "Technology & IT",
  "Trading & Commerce",
  "Hospitality",
  "Printing & Publishing",
  "Crafts & Artisan"
];

// Sample Nigerian business listings
export const nigeriaBusinessData: Business[] = [
  // Lagos - Ikeja - Computer Village
  {
    id: 1,
    title: "TechHub Electronics",
    description: "Leading supplier of laptops, phones, and computer accessories in Computer Village.",
    category: "Electronics & Phones",
    state: "Lagos",
    lga: "Ikeja",
    area: "Computer Village",
    rating: 4.8,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1555775261-6726d7bff57f?w=600&q=80",
    price: "₦5,000 - ₦500,000",
    phone: "+234-803-123-4567",
    whatsapp: "+234-803-123-4567",
    slug: "techhub-electronics-computer-village"
  },
  {
    id: 2,
    title: "Slot Systems Limited",
    description: "Authorized dealer for phones, laptops and gadgets with warranty.",
    category: "Electronics & Phones",
    state: "Lagos",
    lga: "Ikeja",
    area: "Computer Village",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=600&q=80",
    price: "₦10,000 - ₦800,000",
    phone: "+234-809-234-5678",
    slug: "slot-systems-computer-village"
  },

  // Lagos - Ikeja - Allen Avenue
  {
    id: 3,
    title: "Mama Put Delicacies",
    description: "Authentic Nigerian cuisine - Jollof rice, Egusi soup, Pounded yam.",
    category: "Food & Restaurants",
    state: "Lagos",
    lga: "Ikeja",
    area: "Allen Avenue",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&q=80",
    price: "₦1,500 - ₦5,000",
    phone: "+234-805-345-6789",
    slug: "mama-put-delicacies-allen"
  },

  // Lagos - Surulere
  {
    id: 4,
    title: "Adire Fashion Hub",
    description: "Traditional and modern Adire fabrics, custom tailoring services.",
    category: "Fashion & Tailoring",
    state: "Lagos",
    lga: "Surulere",
    area: "Adeniran Ogunsanya",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1594736797933-d0601ba51eae?w=600&q=80",
    price: "₦8,000 - ₦50,000",
    phone: "+234-807-456-7890",
    slug: "adire-fashion-hub-surulere"
  },

  // Lagos - Alimosho - Ikotun
  {
    id: 5,
    title: "Queens Beauty Salon",
    description: "Professional hair styling, manicure, pedicure, and makeup services.",
    category: "Beauty & Salon",
    state: "Lagos",
    lga: "Alimosho",
    area: "Ikotun",
    rating: 4.4,
    trending: true,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    price: "₦2,000 - ₦25,000",
    phone: "+234-806-567-8901",
    slug: "queens-beauty-salon-ikotun"
  },

  // Abuja - Wuse
  {
    id: 6,
    title: "Capital Auto Clinic",
    description: "Complete car maintenance, AC repair, engine diagnostics and panel beating.",
    category: "Auto Repair & Parts",
    state: "Abuja",
    lga: "Municipal Area Council",
    area: "Wuse",
    rating: 4.6,
    featured: true,
    image: "https://images.unsplash.com/photo-1632823471565-1ecdf4ef2567?w=600&q=80",
    price: "₦5,000 - ₦200,000",
    phone: "+234-808-678-9012",
    slug: "capital-auto-clinic-wuse"
  },

  // Abuja - Garki
  {
    id: 7,
    title: "Garki Property Consultants",
    description: "Real estate sales, rentals, property management across Abuja.",
    category: "Real Estate",
    state: "Abuja",
    lga: "Municipal Area Council",
    area: "Garki",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    price: "₦500,000 - ₦50,000,000",
    phone: "+234-809-789-0123",
    slug: "garki-property-consultants"
  },

  // Kano
  {
    id: 8,
    title: "Kano Textile Merchants",
    description: "Wholesale and retail of quality fabrics, Ankara, lace materials.",
    category: "Fashion & Tailoring",
    state: "Kano",
    lga: "Kano Municipal",
    area: "Sabon Gari",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    price: "₦3,000 - ₦80,000",
    phone: "+234-810-890-1234",
    slug: "kano-textile-merchants"
  },

  // Port Harcourt
  {
    id: 9,
    title: "Rivers Suya Spot",
    description: "Best suya in town - beef, chicken, gizzard with fresh salad.",
    category: "Food & Restaurants",
    state: "Rivers",
    lga: "Port Harcourt",
    area: "GRA",
    rating: 4.7,
    trending: true,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
    price: "₦1,000 - ₦8,000",
    phone: "+234-811-901-2345",
    slug: "rivers-suya-spot-ph"
  },

  // Ibadan
  {
    id: 10,
    title: "Bodija Tech Solutions",
    description: "Web development, mobile apps, digital marketing for Nigerian businesses.",
    category: "Technology & IT",
    state: "Oyo",
    lga: "Ibadan North",
    area: "Bodija",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    price: "₦50,000 - ₦2,000,000",
    phone: "+234-812-012-3456",
    slug: "bodija-tech-solutions"
  },

  // Add more diverse listings
  {
    id: 11,
    title: "Lagos Island Fish Market",
    description: "Fresh fish daily - Tilapia, Catfish, Mackerel, Croaker wholesale and retail.",
    category: "Trading & Commerce",
    state: "Lagos",
    lga: "Lagos Island",
    area: "Marina",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
    price: "₦800 - ₦15,000/kg",
    phone: "+234-813-123-4567",
    slug: "lagos-island-fish-market"
  },
  {
    id: 12,
    title: "Praise Chapel Printing Press",
    description: "Quality printing services - business cards, banners, souvenirs.",
    category: "Printing & Publishing",
    state: "Lagos",
    lga: "Yaba",
    area: "Sabo",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
    price: "₦500 - ₦50,000",
    phone: "+234-814-234-5678",
    slug: "praise-chapel-printing-yaba"
  }
];