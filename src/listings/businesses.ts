// src/listings/businesses.ts

export interface Business {
  id: number;
  title: string;
  description: string;
  category: string;
  country: string;
  location: string;
  rating: number;
  featured?: boolean;
  trending?: boolean;
  image: string;
  price?: string;
  phone?: string;
  whatsapp?: string;
  slug?: string;
  mapEmbed?: string;
  currency?: string;
}


export const africanCountryData = [
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    states: [
      "Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Benin City", 
      "Kaduna", "Jos", "Ilorin", "Aba", "Onitsha", "Warri", "Calabar", 
      "Enugu", "Abeokuta", "Akure", "Bauchi", "Maiduguri", "Sokoto", "Uyo"
    ],
    categories: [
      "Fashion & Tailoring", "Agriculture & Farming", "Food & Restaurants", 
      "Transportation", "Mobile Money & Banking", "Education & Training",
      "Healthcare", "Construction & Building", "Auto Repair", "Beauty & Salon",
      "Electronics & Phones", "Real Estate", "Trading & Commerce", "Security Services",
      "Event Planning", "Crafts & Artisan", "Technology & IT", "Legal Services"
    ],
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    states: [
      "Greater Accra", "Ashanti", "Western", "Central", "Eastern", "Volta",
      "Northern", "Upper East", "Upper West", "Brong-Ahafo", "Oti", "Ahafo",
      "Bono East", "North East", "Savannah", "Western North"
    ],
    categories: [
      "Cocoa Trading", "Gold Mining Services", "Kente & Textiles", "Palm Oil Production",
      "Mobile Money (MTN/Vodafone)", "Tro-tro Transport", "Chop Bar & Local Food",
      "Traditional Medicine", "Carpentry & Furniture", "Poultry Farming",
      "Fishing & Aquaculture", "Shea Butter Production", "Tourism & Hospitality",
      "Waste Management", "Solar Energy", "Educational Services", "Healthcare",
      "Construction & Real Estate"
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    states: [
      "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi",
      "Kitale", "Garissa", "Kakamega", "Nyeri", "Machakos", "Meru", "Embu",
      "Kericho", "Naivasha", "Nanyuki", "Lamu", "Isiolo", "Marsabit"
    ],
    categories: [
      "Coffee Farming", "Tea Production", "Matatu Transport", "M-Pesa Agents",
      "Safari Tourism", "Flower Export", "Livestock Trading", "Beadwork & Crafts",
      "Cybercafé Services", "Boda Boda Transport", "Miraa Trading", "Construction",
      "Telecommunications", "Banking & Finance", "Education", "Healthcare",
      "Real Estate", "Security Services", "Agriculture Equipment", "Textiles"
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    states: [
      "Western Cape", "Gauteng", "KwaZulu-Natal", "Eastern Cape", "Limpopo",
      "Mpumalanga", "North West", "Northern Cape", "Free State"
    ],
    categories: [
      "Mining Services", "Wine Production", "Automotive", "Financial Services",
      "Tourism & Safari", "Manufacturing", "Agriculture", "Technology & IT",
      "Renewable Energy", "Telecommunications", "Real Estate", "Healthcare",
      "Education", "Retail & Commerce", "Construction", "Transportation",
      "Media & Entertainment", "Legal Services"
    ],
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    states: [
      "Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez",
      "Luxor", "Mansoura", "Tanta", "Asyut", "Ismailia", "Fayyum", "Zagazig",
      "Aswan", "Damietta", "Minya", "Damanhur", "Beni Suef", "Hurghada", "Qena"
    ],
    categories: [
      "Tourism & Archaeology", "Cotton Trading", "Textile Manufacturing",
      "Suez Canal Services", "Agriculture & Irrigation", "Construction",
      "Oil & Gas", "Banking & Finance", "Telecommunications", "Real Estate",
      "Transportation", "Healthcare", "Education", "Food Processing",
      "Handicrafts & Papyrus", "Information Technology", "Shipping & Logistics"
    ],
  },
  {
    code: "MA",
    name: "Morocco",
    flag: "🇲🇦",
    states: [
      "Casablanca", "Rabat", "Fez", "Marrakech", "Agadir", "Tangier", "Meknès",
      "Oujda", "Kenitra", "Tetouan", "Safi", "Mohammedia", "Khouribga",
      "Beni Mellal", "El Jadida", "Nador", "Taza", "Settat", "Berrechid", "Khemisset"
    ],
    categories: [
      "Argan Oil Production", "Tourism & Riads", "Carpet & Textile Weaving",
      "Phosphate Mining", "Agriculture & Olives", "Handicrafts & Pottery",
      "Transportation", "Real Estate", "Banking & Finance", "Telecommunications",
      "Construction", "Healthcare", "Education", "Food Processing",
      "Leather Goods", "Solar Energy", "Fishing & Seafood", "IT Services"
    ],
  },
  {
    code: "ET",
    name: "Ethiopia",
    flag: "🇪🇹",
    states: [
      "Addis Ababa", "Dire Dawa", "Mekelle", "Gondar", "Hawassa", "Bahir Dar",
      "Dessie", "Jimma", "Jijiga", "Shashamane", "Nekemte", "Debre Birhan",
      "Arba Minch", "Hosaena", "Harar", "Debre Markos", "Kombolcha", "Adama",
      "Wolaita Sodo", "Gambela"
    ],
    categories: [
      "Coffee Export", "Livestock Trading", "Textile Manufacturing", "Teff Farming",
      "Leather Production", "Honey & Beekeeping", "Handicrafts & Weaving",
      "Transportation", "Construction", "Telecommunications", "Banking & Microfinance",
      "Education", "Healthcare", "Tourism", "Agriculture Equipment",
      "Spice Trading", "Real Estate", "Renewable Energy"
    ],
  },
  {
    code: "UG",
    name: "Uganda",
    flag: "🇺🇬",
    states: [
      "Kampala", "Entebbe", "Mbarara", "Gulu", "Lira", "Jinja", "Mbale",
      "Kasese", "Kabale", "Soroti", "Arua", "Masaka", "Hoima", "Tororo",
      "Fort Portal", "Mukono", "Iganga", "Kitgum", "Moroto", "Bundibugyo"
    ],
    categories: [
      "Coffee Farming", "Banana Cultivation", "Fish Processing", "Tourism & Gorilla Trekking",
      "Motorcycle Transport (Boda Boda)", "Mobile Money", "Matooke Trading",
      "Poultry Farming", "Construction", "Telecommunications", "Healthcare",
      "Education", "Real Estate", "Handicrafts", "Agriculture Equipment",
      "Solar Energy", "Transportation", "Banking & Microfinance"
    ],
  }
];

// Sample listings data for African countries
export const africanListingsData: Business[] = [
  // Nigeria
  {
    id: 1,
    title: "Adunni Fashion House",
    description: "Custom Ankara dresses, traditional wear, and modern African fashion.",
    category: "Fashion & Tailoring",
    country: "Nigeria",
    location: "Lagos",
    rating: 4.8,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1594736797933-d0601ba51eae?w=400&q=80",
    price: "₦15,000 - ₦50,000",
    phone: "+234-801-234-5678",
    whatsapp: "+234-801-234-5678",
    slug: "adunni-fashion-house-lagos"
  },
  {
    id: 2,
    title: "Eko Rice Farms",
    description: "Premium local rice production and wholesale distribution.",
    category: "Agriculture & Farming",
    country: "Nigeria",
    location: "Lagos",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    price: "₦25,000/bag",
    phone: "+234-802-345-6789",
    slug: "eko-rice-farms-lagos"
  },
  {
    id: 3,
    title: "Mama Cass Jollof Palace",
    description: "Authentic Nigerian cuisine, jollof rice, pepper soup, and suya.",
    category: "Food & Restaurants",
    country: "Nigeria",
    location: "Abuja",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80",
    price: "₦2,000 - ₦8,000",
    phone: "+234-803-456-7890",
    slug: "mama-cass-jollof-palace-abuja"
  },
  {
    id: 4,
    title: "Lagos Island Danfo Services",
    description: "Reliable public transportation across Lagos metropolis.",
    category: "Transportation",
    country: "Nigeria",
    location: "Lagos",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80",
    price: "₦200 - ₦500",
    phone: "+234-804-567-8901",
    slug: "lagos-danfo-services"
  },

  // Ghana
  {
    id: 5,
    title: "Kumasi Kente Weavers",
    description: "Authentic handwoven Kente cloth, traditional Ghanaian textiles.",
    category: "Kente & Textiles",
    country: "Ghana",
    location: "Ashanti",
    rating: 4.9,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    price: "GH₵150 - GH₵800",
    phone: "+233-24-123-4567",
    slug: "kumasi-kente-weavers"
  },
  {
    id: 6,
    title: "Golden Bean Cocoa Cooperative",
    description: "Premium cocoa beans directly from local farmers.",
    category: "Cocoa Trading",
    country: "Ghana",
    location: "Western",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571197942495-a88c6ac71bc3?w=400&q=80",
    price: "GH₵8,500/ton",
    phone: "+233-26-234-5678",
    slug: "golden-bean-cocoa-cooperative"
  },
  {
    id: 7,
    title: "Aunty Ama's Chop Bar",
    description: "Delicious local dishes: banku, kenkey, fufu, and fresh fish.",
    category: "Chop Bar & Local Food",
    country: "Ghana",
    location: "Greater Accra",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
    price: "GH₵15 - GH₵45",
    phone: "+233-27-345-6789",
    slug: "aunty-ama-chop-bar"
  },

  // Kenya
  {
    id: 8,
    title: "Kilimanjaro Coffee Estate",
    description: "Premium Arabica coffee beans from the highlands of Kenya.",
    category: "Coffee Farming",
    country: "Kenya",
    location: "Nairobi",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    price: "KSh 1,200/kg",
    phone: "+254-712-345-678",
    slug: "kilimanjaro-coffee-estate"
  },
  {
    id: 9,
    title: "Maasai Bead Craft Center",
    description: "Authentic Maasai jewelry, beadwork, and traditional crafts.",
    category: "Beadwork & Crafts",
    country: "Kenya",
    location: "Nairobi",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    price: "KSh 500 - KSh 5,000",
    phone: "+254-723-456-789",
    slug: "maasai-bead-craft-center"
  },
  {
    id: 10,
    title: "Safari Dreams Tours",
    description: "Unforgettable safari experiences in Maasai Mara and Amboseli.",
    category: "Safari Tourism",
    country: "Kenya",
    location: "Nairobi",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80",
    price: "KSh 15,000 - KSh 80,000",
    phone: "+254-734-567-890",
    slug: "safari-dreams-tours"
  },

  // South Africa
  {
    id: 11,
    title: "Cape Town Wine Estate",
    description: "Award-winning wines from the beautiful Western Cape region.",
    category: "Wine Production",
    country: "South Africa",
    location: "Western Cape",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?w=400&q=80",
    price: "R150 - R850",
    phone: "+27-21-123-4567",
    slug: "cape-town-wine-estate"
  },
  {
    id: 12,
    title: "Johannesburg Mining Consultancy",
    description: "Expert mining engineering and geological consulting services.",
    category: "Mining Services",
    country: "South Africa",
    location: "Gauteng",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    price: "R2,500 - R25,000",
    phone: "+27-11-234-5678",
    slug: "johannesburg-mining-consultancy"
  },

  // Egypt
  {
    id: 13,
    title: "Pharaoh's Heritage Tours",
    description: "Guided tours to pyramids, museums, and ancient Egyptian sites.",
    category: "Tourism & Archaeology",
    country: "Egypt",
    location: "Cairo",
    rating: 4.8,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=400&q=80",
    price: "EGP 800 - EGP 3,500",
    phone: "+20-2-123-4567",
    slug: "pharaohs-heritage-tours"
  },
  {
    id: 14,
    title: "Nile Cotton Textiles",
    description: "High-quality Egyptian cotton fabrics and garments.",
    category: "Textile Manufacturing",
    country: "Egypt",
    location: "Alexandria",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80",
    price: "EGP 250 - EGP 1,200",
    phone: "+20-3-234-5678",
    slug: "nile-cotton-textiles"
  },

  // Morocco
  {
    id: 15,
    title: "Atlas Argan Oil Cooperative",
    description: "Pure, organic argan oil produced by Berber women's cooperative.",
    category: "Argan Oil Production",
    country: "Morocco",
    location: "Marrakech",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
    price: "MAD 200 - MAD 650",
    phone: "+212-524-123-456",
    slug: "atlas-argan-oil-cooperative"
  },
  {
    id: 16,
    title: "Moroccan Carpet Bazaar",
    description: "Handwoven Berber rugs, traditional carpets, and tapestries.",
    category: "Carpet & Textile Weaving",
    country: "Morocco",
    location: "Fez",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    price: "MAD 800 - MAD 15,000",
    phone: "+212-535-234-567",
    slug: "moroccan-carpet-bazaar"
  },

  // Ethiopia
  {
    id: 17,
    title: "Ethiopian Highland Coffee",
    description: "Single-origin coffee beans from Sidamo and Yirgacheffe regions.",
    category: "Coffee Export",
    country: "Ethiopia",
    location: "Addis Ababa",
    rating: 4.9,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    price: "ETB 450 - ETB 850/kg",
    phone: "+251-11-123-4567",
    slug: "ethiopian-highland-coffee"
  },
  {
    id: 18,
    title: "Habesha Traditional Crafts",
    description: "Authentic Ethiopian pottery, baskets, and cultural artifacts.",
    category: "Handicrafts & Weaving",
    country: "Ethiopia",
    location: "Addis Ababa",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    price: "ETB 200 - ETB 2,500",
    phone: "+251-91-234-5678",
    slug: "habesha-traditional-crafts"
  },

  // Uganda
  {
    id: 19,
    title: "Bwindi Gorilla Expeditions",
    description: "Mountain gorilla trekking and eco-tourism in Bwindi Forest.",
    category: "Tourism & Gorilla Trekking",
    country: "Uganda",
    location: "Kampala",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80",
    price: "UGX 2,200,000 - UGX 4,500,000",
    phone: "+256-772-123-456",
    slug: "bwindi-gorilla-expeditions"
  },
  {
    id: 20,
    title: "Kampala Matooke Market",
    description: "Fresh matooke, cassava, and other local produce wholesale.",
    category: "Matooke Trading",
    country: "Uganda",
    location: "Kampala",
    rating: 4.3,
    trending: true,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
    price: "UGX 3,000 - UGX 15,000",
    phone: "+256-783-234-567",
    slug: "kampala-matooke-market"
  },

  // Additional diverse listings across countries
  {
    id: 21,
    title: "Accra Mobile Money Hub",
    description: "MTN Mobile Money, Vodafone Cash, and AirtelTigo Money services.",
    category: "Mobile Money (MTN/Vodafone)",
    country: "Ghana",
    location: "Greater Accra",
    rating: 4.4,
    trending: true,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
    price: "GH₵1 - GH₵10,000",
    phone: "+233-50-123-4567",
    slug: "accra-mobile-money-hub"
  },
  {
    id: 22,
    title: "Mombasa Spice Market",
    description: "Fresh spices, cardamom, cinnamon, and coastal trading.",
    category: "Spice Trading",
    country: "Kenya",
    location: "Mombasa",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    price: "KSh 150 - KSh 2,500/kg",
    phone: "+254-741-234-567",
    slug: "mombasa-spice-market"
  },
  {
    id: 23,
    title: "Durban Automotive Services",
    description: "Complete car maintenance, repairs, and spare parts.",
    category: "Automotive",
    country: "South Africa",
    location: "KwaZulu-Natal",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1632823471565-1ecdf4ef2567?w=400&q=80",
    price: "R500 - R15,000",
    phone: "+27-31-345-6789",
    slug: "durban-automotive-services"
  },
  {
    id: 24,
    title: "Casablanca Digital Solutions",
    description: "Web development, mobile apps, and digital marketing services.",
    category: "IT Services",
    country: "Morocco",
    location: "Casablanca",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    price: "MAD 5,000 - MAD 50,000",
    phone: "+212-522-123-456",
    slug: "casablanca-digital-solutions"
  },
  {
    id: 25,
    title: "Dire Dawa Honey Collective",
    description: "Pure Ethiopian honey and traditional tej (honey wine).",
    category: "Honey & Beekeeping",
    country: "Ethiopia",
    location: "Dire Dawa",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
    price: "ETB 380 - ETB 850/kg",
    phone: "+251-25-123-4567",
    slug: "dire-dawa-honey-collective"
  }
];

// Legacy data for backward compatibility
export const countryData = africanCountryData;
export const listingsData = africanListingsData;