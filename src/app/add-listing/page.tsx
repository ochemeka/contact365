"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Car,
  Calendar,
  Briefcase,
  CheckCircle,
  Loader2,
  X,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";



// Dropdown options with complete field definitions
const dropdownOptions = {
  place: {
    category: {
      Restaurant: {
        subcategory: ["Fast Food", "Fine Dining", "Casual Dining", "Food Truck", "Buffet", "Cafe Restaurant"]
      },
      Cafe: {
        subcategory: ["Coffee Shop", "Internet Cafe", "Bakery Cafe", "Tea House", "Juice Bar"]
      },
      Shop: {
        subcategory: ["Grocery Store", "Clothing Store", "Electronics", "Pharmacy", "Bookstore", "Hardware Store", "Gift Shop"]
      },
      Service: {
        subcategory: ["Beauty Salon", "Auto Repair", "Laundry", "Cleaning Service", "Photography", "Tutoring", "Legal Service"]
      }
    },
    priceRange: ["$", "$$", "$$$", "$$$$"],
    operatingHours: ["24/7", "6 AM - 10 PM", "8 AM - 8 PM", "9 AM - 6 PM", "10 AM - 9 PM", "Custom Hours"]
  },
  job: {
    jobType: ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Temporary"],
    experienceLevel: ["Entry Level", "Mid Level", "Senior Level", "Executive", "No Experience Required"],
    industry: ["Technology", "Healthcare", "Finance", "Education", "Retail", "Manufacturing", "Construction", "Hospitality", "Marketing", "Sales"],
    salaryRange: ["Below ₦100k", "₦100k - ₦300k", "₦300k - ₦500k", "₦500k - ₦1M", "₦1M - ₦2M", "Above ₦2M", "Negotiable"],
    workArrangement: ["On-site", "Remote", "Hybrid", "Flexible"]
  },
  realestate: {
    propertyType: ["Apartment", "House", "Condo", "Townhouse", "Studio", "Duplex", "Penthouse", "Villa"],
    listingType: ["For Sale", "For Rent", "For Lease"],
    bedrooms: ["Studio", "1", "2", "3", "4", "5", "6+"],
    bathrooms: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4+"],
    condition: ["New", "Excellent", "Good", "Fair", "Needs Renovation"]
  },
  car: {
    condition: ["Brand New", "Nigerian Used", "Foreign Used", "Fairly Used"],
    transmission: ["Automatic", "Manual"],
    fuelType: ["Petrol", "Diesel", "Electric", "Hybrid"],
    bodyType: ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Pickup Truck", "Van", "Wagon"],
    color: ["Black", "White", "Silver", "Gray", "Blue", "Red", "Green", "Brown", "Gold", "Other"],
    make: ["Toyota", "Honda", "Mercedes-Benz", "BMW", "Audi", "Lexus", "Nissan", "Hyundai", "Kia", "Ford", "Chevrolet", "Peugeot", "Volkswagen", "Infiniti", "Acura", "Other"]
  },
  event: {
    category: ["Business", "Entertainment", "Educational", "Sports", "Arts & Culture", "Community", "Religious", "Charity"],
    eventType: ["Conference", "Workshop", "Concert", "Festival", "Seminar", "Networking", "Party", "Wedding", "Exhibition", "Competition"],
    ticketType: ["Free", "Paid", "Registration Required"],
    duration: ["1-2 hours", "Half Day", "Full Day", "2-3 Days", "Week Long", "Ongoing"],
    audience: ["All Ages", "Adults Only", "Families", "Professionals", "Students", "Seniors"]
  }
};

// Complete field definitions for each listing type
const listingFields = {
  place: [
    { name: "name", label: "Place Name", type: "text", required: true, placeholder: "Enter place name" },
    { name: "category", label: "Category", type: "select", options: Object.keys(dropdownOptions.place.category), required: true },
    { name: "subcategory", label: "Subcategory", type: "conditional_select", dependsOn: "category", required: false },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Enter full address" },
    { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+234 XXX XXX XXXX" },
    { name: "priceRange", label: "Price Range", type: "select", options: dropdownOptions.place.priceRange, required: false },
    { name: "operatingHours", label: "Operating Hours", type: "select", options: dropdownOptions.place.operatingHours, required: false },
    { name: "description", label: "Description", type: "textarea", required: false, placeholder: "Tell us about this place..." }
  ],
  job: [
    { name: "title", label: "Job Title", type: "text", required: true, placeholder: "e.g. Software Engineer" },
    { name: "company", label: "Company", type: "text", required: true, placeholder: "Company name" },
    { name: "location", label: "Location", type: "text", required: true, placeholder: "City, State" },
    { name: "jobType", label: "Job Type", type: "select", options: dropdownOptions.job.jobType, required: true },
    { name: "industry", label: "Industry", type: "select", options: dropdownOptions.job.industry, required: true },
    { name: "experienceLevel", label: "Experience Level", type: "select", options: dropdownOptions.job.experienceLevel, required: true },
    { name: "salaryRange", label: "Salary Range", type: "text", required: true, placeholder: "Enter salary i.e $150,000" },
    { name: "workArrangement", label: "Work Arrangement", type: "select", options: dropdownOptions.job.workArrangement, required: true },
    { name: "description", label: "Job Description", type: "textarea", required: true, placeholder: "Describe the role, responsibilities, and requirements..." }
  ],
  realestate: [
    { name: "title", label: "Property Title", type: "text", required: true, placeholder: "e.g. Luxury 3BR Apartment in VI" },
    { name: "listingType", label: "Listing Type", type: "select", options: dropdownOptions.realestate.listingType, required: true },
    { name: "propertyType", label: "Property Type", type: "select", options: dropdownOptions.realestate.propertyType, required: true },
    { name: "bedrooms", label: "Bedrooms", type: "select", options: dropdownOptions.realestate.bedrooms, required: true },
    { name: "bathrooms", label: "Bathrooms", type: "select", options: dropdownOptions.realestate.bathrooms, required: true },
    { name: "price", label: "Price (₦)", type: "number", required: true, placeholder: "Enter price" },
    { name: "address", label: "Address", type: "textarea", required: true, placeholder: "Full property address" },
    { name: "condition", label: "Property Condition", type: "select", options: dropdownOptions.realestate.condition, required: true },
    { name: "description", label: "Property Description", type: "textarea", required: true, placeholder: "Describe the property features, amenities, etc..." }
  ],
  car: [
    { name: "make", label: "Make", type: "select", options: dropdownOptions.car.make, required: true },
    { name: "model", label: "Model", type: "text", required: true, placeholder: "e.g. Camry, Accord, C300" },
    { name: "year", label: "Year", type: "number", required: true, placeholder: "e.g. 2020", min: "1990", max: new Date().getFullYear() + 1 },
    { name: "condition", label: "Condition", type: "select", options: dropdownOptions.car.condition, required: true },
    { name: "mileage", label: "Mileage (km)", type: "number", required: false, placeholder: "Current mileage" },
    { name: "transmission", label: "Transmission", type: "select", options: dropdownOptions.car.transmission, required: true },
    { name: "fuelType", label: "Fuel Type", type: "select", options: dropdownOptions.car.fuelType, required: true },
    { name: "bodyType", label: "Body Type", type: "select", options: dropdownOptions.car.bodyType, required: true },
    { name: "color", label: "Color", type: "select", options: dropdownOptions.car.color, required: true },
    { name: "price", label: "Price (₦)", type: "number", required: true, placeholder: "Asking price" },
    { name: "location", label: "Location", type: "text", required: true, placeholder: "City, State" },
    { name: "description", label: "Additional Details", type: "textarea", required: false, placeholder: "Any additional information about the vehicle..." }
  ],
  event: [
    { name: "name", label: "Event Name", type: "text", required: true, placeholder: "Name of your event" },
    { name: "category", label: "Category", type: "select", options: dropdownOptions.event.category, required: true },
    { name: "eventType", label: "Event Type", type: "select", options: dropdownOptions.event.eventType, required: true },
    { name: "date", label: "Start Date", type: "date", required: true },
    { name: "endDate", label: "End Date", type: "date", required: false },
    { name: "time", label: "Start Time", type: "time", required: true },
    { name: "duration", label: "Duration", type: "select", options: dropdownOptions.event.duration, required: true },
    { name: "location", label: "Venue/Location", type: "text", required: true, placeholder: "Event venue or address" },
    { name: "ticketType", label: "Ticket Type", type: "select", options: dropdownOptions.event.ticketType, required: true },
    { name: "ticketPrice", label: "Ticket Price (₦)", type: "number", required: false, placeholder: "Price per ticket (if paid)" },
    { name: "audience", label: "Target Audience", type: "select", options: dropdownOptions.event.audience, required: true },
    { name: "capacity", label: "Maximum Capacity", type: "number", required: false, placeholder: "Maximum attendees" },
    { name: "description", label: "Event Description", type: "textarea", required: true, placeholder: "Describe your event, what attendees can expect..." }
  ]
};

const AddListingPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const listingTypes = [
    {
      id: "place",
      name: "Place",
      icon: MapPin,
      gradient: "from-purple-500 to-purple-600",
      description: "Restaurants, cafes, shops & locations",
    },
    {
      id: "job",
      name: "Job",
      icon: Briefcase,
      gradient: "from-blue-500 to-blue-600",
      description: "Post job openings & opportunities",
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: Home,
      gradient: "from-orange-500 to-red-500",
      description: "Properties for sale or rent",
    },
    {
      id: "car",
      name: "Car",
      icon: Car,
      gradient: "from-green-500 to-emerald-600",
      description: "Vehicles for sale or trade",
    },
    {
      id: "event",
      name: "Event",
      icon: Calendar,
      gradient: "from-indigo-500 to-purple-600",
      description: "Create & promote events",
    },
  ];

  const handleTypeSelect = useCallback((typeId) => {
    setSelectedType(typeId);
    setFormData({});
    setErrors({});
  }, []);

  const handleInputChange = useCallback((name, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      // Reset dependent fields when parent changes
      ...(name === 'category' && selectedType === 'place' ? { subcategory: '' } : {})
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [selectedType, errors]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const fields = listingFields[selectedType] || [];
    
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedType, formData]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitSuccess(true);
      console.log("Submitted:", formData);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setSelectedType(null);
        setFormData({});
        setErrors({});
      }, 2500);
    }, 1500);
  }, [formData, validateForm]);

  const resetSelection = useCallback(() => {
    setSelectedType(null);
    setFormData({});
    setErrors({});
  }, []);

  const renderField = (field) => {
    const value = formData[field.name] || "";
    const error = errors[field.name];
    
    if (field.type === "conditional_select" && field.dependsOn) {
      const parentValue = formData[field.dependsOn];
      if (!parentValue) return null;
      
      const options = dropdownOptions[selectedType]?.[field.dependsOn]?.[parentValue]?.[field.name] || [];
      if (options.length === 0) return null;
      
      return (
        <div key={field.name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={value}
            onChange={e => handleInputChange(field.name, e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select {field.label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {error && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
        </div>
      );
    }
    
    if (field.type === "select") {
      return (
        <div key={field.name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={value}
            onChange={e => handleInputChange(field.name, e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {error && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
        </div>
      );
    }
    
    if (field.type === "textarea") {
      return (
        <div key={field.name} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            value={value}
            onChange={e => handleInputChange(field.name, e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors ${
              error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder={field.placeholder || `Enter ${field.label}`}
            rows={3}
          />
          {error && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
        </div>
      );
    }
    
    return (
      <div key={field.name} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={field.type}
          value={value}
          onChange={e => handleInputChange(field.name, e.target.value)}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-colors ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder={field.placeholder || `Enter ${field.label}`}
          min={field.min}
          max={field.max}
        />
        {error && <p className="text-sm text-red-600 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
      </div>
    );
  };

  const selectedTypeData = selectedType ? listingTypes.find(t => t.id === selectedType) : null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <AnimatePresence mode="wait">
          {!selectedType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Add a New Listing
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Choose the type of listing you'd like to create. Our smart forms will guide you through the process.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {listingTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer p-6 rounded-xl shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300"
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${type.gradient} text-white mb-4 shadow-lg mx-auto`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{type.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{type.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={resetSelection}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <ArrowLeft size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create {selectedTypeData?.name} Listing
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Fill out the form below to create your listing
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {listingFields[selectedType]?.map(field => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                  <button
                    onClick={resetSelection}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 md:flex-none px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={20} className="animate-spin" />
                        Creating Listing...
                      </span>
                    ) : (
                      "Create Listing"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl text-center"
            >
              <Loader2 size={48} className="animate-spin text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Creating Your Listing</h3>
              <p className="text-gray-600 dark:text-gray-400">Please wait while we process your submission...</p>
            </motion.div>
          </div>
        )}

        {/* Success Modal */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl text-center max-w-md mx-4"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  Listing Created Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your {selectedTypeData?.name.toLowerCase()} listing is now live and visible to users.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Redirecting you back to the main page...
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddListingPage;