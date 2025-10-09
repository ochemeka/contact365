// src/app/[slug]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Globe,
  Bookmark,
  Share2,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

import { nigeriaBusinessData, Business } from "../../listings/nigeriaData";
import ReviewCard from "../../components/ReviewCard";
import EventCard from "../../components/EventCard";
import JobCard from "../../components/JobCard";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BusinessProfilePage() {
  const params = useParams();
  const slug = params?.slug as string; // FIX: Extract slug from params object
  
  const business = nigeriaBusinessData.find((b) => b.slug === slug);

  const [activeTab, setActiveTab] = useState<
  "Profile" | "Reviews" | "Events" | "Jobs" | "Store"
>("Profile");


  // const [activeTab, setActiveTab] = useState
  //   "Profile" | "Reviews" | "Events" | "Jobs" | "Store"
  // >("Profile");

  if (!business)
    return (
      <>
        <Header />
        <div className="p-6 text-center min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Business not found
          </h1>
          <p className="text-gray-500 mt-2">Try exploring other listings.</p>
          <Link href="/explore" className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Browse Businesses
          </Link>
        </div>
        <Footer />
      </>
    );

  // Mock Data
  const reviews = [
    {
      name: "Adewale Johnson",
      rating: 5,
      comment: "Excellent service! Very reliable and professional.",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Chioma Nwosu",
      rating: 4,
      comment: "Good quality products. Will definitely come back.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "Ibrahim Musa",
      rating: 5,
      comment: "Best prices in the area. Highly recommend!",
    },
    {
      name: "Blessing Okafor",
      rating: 4,
      comment: "Great experience overall. Fast service.",
    },
  ];

  const events = [
    { title: "Customer Appreciation Day", date: "Oct 15, 2025" },
    { title: "New Product Launch", date: "Nov 20, 2025" },
  ];

  const jobs = [
    { title: "Sales Representative", type: "Full-time" },
    { title: "Customer Service Agent", type: "Part-time" },
  ];

  const products = [
    { name: "Product A", price: "₦20,000" },
    { name: "Product B", price: "₦45,000" },
    { name: "Product C", price: "₦75,000" },
  ];

  const galleryImages = Array.from({ length: 6 }).map((_, i) => ({
    src: `https://picsum.photos/600/400?random=${i + 1}`,
    alt: `Gallery Image ${i + 1}`,
  }));

  const relatedPages = nigeriaBusinessData
    .filter((b) => b.slug !== slug && (b.state === business.state || b.category === business.category))
    .slice(0, 4)
    .map((b, i) => ({
      ...b,
      image: b.image || `https://picsum.photos/400/300?random=${i + 10}`,
    }));

  const getWebsiteUrl = (business: Business): string => {
    return 'website' in business && typeof (business as any).website === 'string' 
      ? (business as any).website 
      : "#";
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="relative w-full h-[400px] md:h-[500px]">
          <img
            src={business.image || `https://picsum.photos/1200/500?random=20`}
            alt={business.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 md:p-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold">
              {business.title}
            </h1>
            <p className="text-lg md:text-xl">{business.category}</p>
            <p className="text-sm md:text-base flex items-center gap-2 mt-2">
              <MapPin size={16} />
              {business.area}, {business.lga}, {business.state}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-6 gap-4">
          {[
            { icon: MessageCircle, label: "Message", href: `/chat/${business.id}` },
            { icon: Phone, label: "Call", href: business.phone ? `tel:${business.phone}` : "#" },
            { icon: Globe, label: "Website", href: getWebsiteUrl(business) },
            { icon: Bookmark, label: "Save", href: "#" },
            { icon: Share2, label: "Share", href: "#" },
            { icon: ShieldCheck, label: "Claim", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center p-3 border rounded-lg bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-lg transition-transform w-full text-center"
            >
              <Icon size={20} />
              <span className="text-sm mt-1">{label}</span>
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
          {["Profile", "Reviews", "Events", "Jobs", "Store"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 text-center font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 w-full">
          {activeTab === "Profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Description */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
                  <h3 className="text-xl font-semibold">Description</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {business.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Verified Business",
                      "Nigerian Owned",
                      "Quality Service",
                      "Fast Delivery",
                      "WhatsApp Support",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-3">
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  {business.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-green-600" />
                      <a href={`tel:${business.phone}`} className="text-green-600 hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  )}
                  {business.whatsapp && (
                    <div className="flex items-center gap-3">
                      <MessageCircle size={18} className="text-green-600" />
                      <a 
                        href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        WhatsApp: {business.whatsapp}
                      </a>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MapPin size={20} /> Location
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Area:</strong> {business.area}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>LGA:</strong> {business.lga}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>State:</strong> {business.state}
                    </p>
                  </div>
                  {business.mapEmbed && (
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: business.mapEmbed,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Opening Hours */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                {/* Gallery */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {galleryImages.map((img, i) => (
                      <img
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>

                {/* Business Category */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">Category</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {business.category}
                  </p>
                </div>

                {/* Pricing */}
                {business.price && (
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Price Range</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-bold text-green-600">
                      {business.price}
                    </p>
                  </div>
                )}

                {/* Contact Form */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-4">
                    Contact Business
                  </h3>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    ></textarea>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "Reviews" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((r, i) => (
                <ReviewCard key={i} {...r} />
              ))}
            </div>
          )}
          {activeTab === "Events" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {events.map((e, i) => (
                <EventCard key={i} {...e} />
              ))}
            </div>
          )}
          {activeTab === "Jobs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {jobs.map((j, i) => (
                <JobCard key={i} {...j} />
              ))}
            </div>
          )}
          {activeTab === "Store" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <ProductCard key={i} {...p} />
              ))}
            </div>
          )}
        </div>

        {/* Related Pages */}
      {/* Related Pages */}
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
          <h3 className="text-xl font-semibold">Similar Businesses</h3>
          {(() => {
            // Try to find similar businesses with fallback logic
            let similar = nigeriaBusinessData
              .filter((b) => b.slug !== slug && b.state === business.state && b.category === business.category)
              .slice(0, 4);

            // If not enough in same state + category, add from same state
            if (similar.length < 4) {
              const additionalFromState = nigeriaBusinessData
                .filter((b) => 
                  b.slug !== slug && 
                  b.state === business.state && 
                  !similar.some(s => s.id === b.id)
                )
                .slice(0, 4 - similar.length);
              similar = [...similar, ...additionalFromState];
            }

            // If still not enough, add from same category
            if (similar.length < 4) {
              const additionalFromCategory = nigeriaBusinessData
                .filter((b) => 
                  b.slug !== slug && 
                  b.category === business.category && 
                  !similar.some(s => s.id === b.id)
                )
                .slice(0, 4 - similar.length);
              similar = [...similar, ...additionalFromCategory];
            }

            // If still not enough, just get any other businesses
            if (similar.length < 4) {
              const anyOthers = nigeriaBusinessData
                .filter((b) => b.slug !== slug && !similar.some(s => s.id === b.id))
                .slice(0, 4 - similar.length);
              similar = [...similar, ...anyOthers];
            }

            if (similar.length === 0) {
              return (
                <div className="text-center py-8 text-gray-500">
                  <p>No similar businesses found yet. Check back soon!</p>
                  <Link href="/explore" className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Explore All Businesses
                  </Link>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {similar.map((b) => (
                  <Link key={b.id} href={`/${b.slug}`}>
                    <div className="relative overflow-hidden rounded-lg cursor-pointer group bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition">
                      <img
                        src={b.image}
                        alt={b.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{b.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{b.category}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin size={12} />
                          {b.area}, {b.lga}
                        </p>
                        {b.price && (
                          <p className="text-sm text-green-600 font-semibold mt-2">
                            {b.price}
                          </p>
                        )}
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white text-sm font-medium">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>
      </main>

      <Footer />
    </div>
  );
}


// // src/app/[slug]/page.tsx
// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import {
//   MapPin,
//   Phone,
//   Globe,
//   Bookmark,
//   Share2,
//   ShieldCheck,
//   MessageCircle,
// } from "lucide-react";

// // Fix: Use consistent import names
// import { africanListingsData, Business } from "../../listings/businesses";
// import ReviewCard from "../../components/ReviewCard";
// import EventCard from "../../components/EventCard";
// import JobCard from "../../components/JobCard";
// import ProductCard from "../../components/ProductCard";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// export default function BusinessProfilePage() {
//   const { slug } = useParams();
//   // Fix: Use the correct data variable name
//   const business = africanListingsData.find((b) => b.slug === slug);
//   const [activeTab, setActiveTab] = useState<
//     "Profile" | "Reviews" | "Events" | "Jobs" | "Store"
//   >("Profile");

//   if (!business)
//     return (
//       <>
//         <Header />
//         <div className="p-6 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//             Business not found
//           </h1>
//           <p className="text-gray-500 mt-2">Try exploring other listings.</p>
//         </div>
//         <Footer />
//       </>
//     );

//   // Mock Data
//   const reviews = [
//     {
//       name: "Jane Doe",
//       rating: 5,
//       comment: "Amazing service! Highly recommended.",
//       avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       name: "John Smith",
//       rating: 4,
//       comment: "Great experience overall, will use again.",
//       avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       name: "Amaka Obi",
//       rating: 5,
//       comment: "Excellent customer support and fast delivery.",
//       // no avatar → fallback initials
//     },
//     {
//       name: "Chinedu Okafor",
//       rating: 3,
//       comment: "Good product but shipping took longer than expected.",
//       // no avatar → fallback initials
//     },
//   ];

//   const events = [
//     { title: "Networking Night", date: "Sept 15, 2025" },
//     { title: "Business Expo", date: "Oct 10, 2025" },
//   ];

//   const jobs = [
//     { title: "Frontend Developer", type: "Full-time" },
//     { title: "Customer Support Officer", type: "Part-time" },
//   ];

//   const products = [
//     { name: "Product A", price: "₦20,000" },
//     { name: "Product B", price: "₦45,000" },
//     { name: "Product C", price: "₦75,000" },
//   ];

//   const galleryImages = Array.from({ length: 6 }).map((_, i) => ({
//     src: `https://picsum.photos/600/400?random=${i + 1}`,
//     alt: `Gallery Image ${i + 1}`,
//   }));

//   const relatedPages = africanListingsData
//     .filter((b) => b.slug !== slug)
//     .slice(0, 4)
//     .map((b, i) => ({
//       ...b,
//       image: `https://picsum.photos/400/300?random=${i + 10}`,
//     }));

//   // Fix: Safely access website property
//   const getWebsiteUrl = (business: Business): string => {
//     return 'website' in business && typeof (business as any).website === 'string' 
//       ? (business as any).website 
//       : "#";
//   };

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 w-full">
//         {/* Hero Section */}
//         <div className="relative w-full h-[400px] md:h-[500px]">
//           <img
//             src={business.image || `https://picsum.photos/1200/500?random=20`}
//             alt={business.title}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 md:p-12 text-white">
//             <h1 className="text-3xl md:text-5xl font-bold">
//               {business.title}
//             </h1>
//             <p className="text-lg md:text-xl">{business.category}</p>
//           </div>
//         </div>

//         {/* CTA Buttons */}
//         <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-6 gap-4">
//           {[
//             { icon: MessageCircle, label: "Message", href: `/chat/${business.id}` },
//             { icon: Phone, label: "Call", href: "#" },
//             { icon: Globe, label: "Website", href: getWebsiteUrl(business) },
//             { icon: Bookmark, label: "Save", href: "#" },
//             { icon: Share2, label: "Share", href: "#" },
//             { icon: ShieldCheck, label: "Claim", href: "#" },
//           ].map(({ icon: Icon, label, href }) => (
//             <Link
//               key={label}
//               href={href}
//               className="flex flex-col items-center p-3 border rounded-lg bg-white dark:bg-gray-800 hover:scale-105 hover:shadow-lg transition-transform w-full text-center"
//             >
//               <Icon size={20} />
//               <span className="text-sm mt-1">{label}</span>
//             </Link>
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="max-w-6xl mx-auto px-4 flex w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
//           {["Profile", "Reviews", "Events", "Jobs", "Store"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab as any)}
//               className={`flex-1 py-3 text-center font-medium transition-colors ${
//                 activeTab === tab
//                   ? "bg-purple-600 text-white"
//                   : "text-gray-500 hover:text-purple-600"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="max-w-6xl mx-auto px-4 py-8 w-full">
//           {activeTab === "Profile" && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Left Column */}
//               <div className="space-y-6">
//                 {/* Description */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
//                   <h3 className="text-xl font-semibold">Description</h3>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {business.description}
//                   </p>
//                 </div>

//                 {/* Tags */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-2">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {[
//                       "Accepts Credit Cards",
//                       "Bike Parking",
//                       "Coupons",
//                       "Parking Street",
//                       "Wireless Internet",
//                     ].map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Follow Us */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
//                   <div className="flex space-x-4 text-gray-700 dark:text-gray-300">
//                     {["Facebook", "X", "Instagram", "YouTube", "Reddit"].map(
//                       (site) => (
//                         <a
//                           key={site}
//                           href="#"
//                           className="hover:text-purple-600"
//                         >
//                           {site}
//                         </a>
//                       )
//                     )}
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
//                   <h3 className="text-xl font-semibold flex items-center gap-2">
//                     <MapPin size={20} /> Location
//                   </h3>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {business.location}, {business.country}
//                   </p>
//                   {business.mapEmbed && (
//                     <div className="w-full h-64 rounded-lg overflow-hidden shadow">
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: business.mapEmbed,
//                         }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 {/* Opening Hours */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     Open 24h today
//                   </p>
//                 </div>

//                 {/* Gallery */}
//                 <div>
//                   <h3 className="text-xl font-semibold mb-4">Gallery</h3>
//                   <div className="grid grid-cols-3 gap-4">
//                     {galleryImages.map((img, i) => (
//                       <img
//                         key={i}
//                         src={img.src}
//                         alt={img.alt}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Business Category */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-2">Category</h3>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     {business.category}
//                   </p>
//                 </div>

//                 {/* Pricing - FIXED */}
//                 {business.price && (
//                   <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                     <h3 className="text-xl font-semibold mb-2">Price Range</h3>
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {business.price}
//                     </p>
//                   </div>
//                 )}

//                 {/* Contact Form */}
//                 <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
//                   <h3 className="text-xl font-semibold mb-4">
//                     Contact Business
//                   </h3>
//                   <form className="space-y-4">
//                     <input
//                       type="text"
//                       placeholder="Name"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       className="w-full p-2 border rounded-lg"
//                     />
//                     <textarea
//                       placeholder="Message"
//                       className="w-full p-2 border rounded-lg"
//                     ></textarea>
//                     <button
//                       type="submit"
//                       className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//                     >
//                       Send
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Other Tabs */}
//           {activeTab === "Reviews" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {reviews.map((r, i) => (
//                 <ReviewCard key={i} {...r} />
//               ))}
//             </div>
//           )}
//           {activeTab === "Events" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {events.map((e, i) => (
//                 <EventCard key={i} {...e} />
//               ))}
//             </div>
//           )}
//           {activeTab === "Jobs" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {jobs.map((j, i) => (
//                 <JobCard key={i} {...j} />
//               ))}
//             </div>
//           )}
//           {activeTab === "Store" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {products.map((p, i) => (
//                 <ProductCard key={i} {...p} />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Related Pages - FIXED */}
//         <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
//           <h3 className="text-xl font-semibold">View Related Pages</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {relatedPages.map((b) => (
//               <Link key={b.id} href={`/${b.slug}`}>
//                 <div className="relative overflow-hidden rounded-lg cursor-pointer group">
//                   <img
//                     src={b.image}
//                     alt={b.title}
//                     className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
//                     <h4 className="text-white font-semibold">{b.title}</h4>
//                     <p className="text-sm text-gray-200">{b.category}</p>
//                     {b.price && (
//                       <p className="text-sm text-purple-400 mt-1">
//                         {b.price}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }