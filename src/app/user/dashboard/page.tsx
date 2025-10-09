"use client"

import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  Star, 
  Plus, 
  Settings, 
  Bell, 
  Search,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  Filter,
  Edit3,
  Trash2,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Globe,
  Camera
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Listings', value: '12', change: '+2', icon: MapPin, color: 'bg-blue-500 dark:bg-blue-600' },
    { label: 'Profile Views', value: '1,234', change: '+12%', icon: Eye, color: 'bg-green-500 dark:bg-green-600' },
    { label: 'Reviews Received', value: '48', change: '+5', icon: Star, color: 'bg-yellow-500 dark:bg-yellow-600' },
    { label: 'Saved by Users', value: '89', change: '+8', icon: Heart, color: 'bg-red-500 dark:bg-red-600' }
  ];

  const recentListings = [
    { id: 1, name: 'Coffee Bean Café', category: 'Restaurant', status: 'Active', views: 234, rating: 4.8 },
    { id: 2, name: 'Tech Solutions Inc', category: 'Technology', status: 'Pending', views: 156, rating: 4.6 },
    { id: 3, name: 'Fitness First Gym', category: 'Health & Fitness', status: 'Active', views: 189, rating: 4.9 },
    { id: 4, name: 'Beauty Salon Pro', category: 'Beauty', status: 'Active', views: 298, rating: 4.7 }
  ];

  const recentActivity = [
    { action: 'New review received', business: 'Coffee Bean Café', time: '2 hours ago', type: 'review' },
    { action: 'Listing approved', business: 'Tech Solutions Inc', time: '5 hours ago', type: 'approval' },
    { action: 'Profile viewed', business: 'Fitness First Gym', time: '1 day ago', type: 'view' },
    { action: 'Business saved by user', business: 'Beauty Salon Pro', time: '2 days ago', type: 'save' }
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-600/25' 
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {label}
    </button>
  );

  const StatCard = ({ stat }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">{stat.change}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
          <stat.icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ListingCard = ({ listing }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{listing.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{listing.category}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            listing.status === 'Active' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
          }`}>
            {listing.status}
          </span>
          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{listing.views} views</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{listing.rating}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm font-medium">
          View Details
        </button>
        <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        activity.type === 'review' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
        activity.type === 'approval' ? 'bg-green-100 dark:bg-green-900/30' :
        activity.type === 'view' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-red-100 dark:bg-red-900/30'
      }`}>
        {activity.type === 'review' && <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />}
        {activity.type === 'approval' && <BarChart3 className="w-4 h-4 text-green-600 dark:text-green-400" />}
        {activity.type === 'view' && <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
        {activity.type === 'save' && <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.business}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8">
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="listings" 
            label="My Listings" 
            isActive={activeTab === 'listings'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="analytics" 
            label="Analytics" 
            isActive={activeTab === 'analytics'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="profile" 
            label="Profile" 
            isActive={activeTab === 'profile'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="settings" 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={setActiveTab} 
          />
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Listing
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                <div className="space-y-2">
                  {recentActivity.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Top Performing Listings</h2>
                <div className="space-y-4">
                  {recentListings.slice(0, 3).map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{listing.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{listing.views} views</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{listing.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Listings</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Listing
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics & Insights</h2>
            
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-sm font-medium">7 Days</button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">30 Days</button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700">90 Days</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Total Views</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2,847</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">+24.5% from last period</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Engagement Rate</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">68%</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">+5.2% from last period</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Unique Visitors</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1,234</p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">+18.3% from last period</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Views Over Time</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Performing Listings</h3>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{listing.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{listing.category}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{listing.views}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">{listing.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Profile</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">John Doe</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Business Owner • Member since Jan 2024</p>
                  <div className="flex gap-3">
                    <button className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors text-sm font-medium">
                      Edit Profile
                    </button>
                    <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
                      Preview Public Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">John Doe</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">john.doe@example.com</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">+1 (555) 123-4567</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                      <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                        <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">www.johndoe.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bio</h4>
                  <p className="text-gray-600 dark:text-gray-400 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                    Passionate business owner with over 10 years of experience in the hospitality and service industry. 
                    Committed to providing exceptional customer experiences and building lasting relationships.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Account Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Listings</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">48</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Reviews</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your listings</p>
                  </div>
                  <button className="w-12 h-6 bg-blue-500 dark:bg-blue-600 rounded-full relative transition-colors">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new reviews and messages</p>
                  </div>
                  <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive tips and promotional content</p>
                  </div>
                  <button className="w-12 h-6 bg-blue-500 dark:bg-blue-600 rounded-full relative transition-colors">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Make your profile visible to everyone</p>
                  </div>
                  <button className="w-12 h-6 bg-blue-500 dark:bg-blue-600 rounded-full relative transition-colors">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Show Contact Info</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Display email and phone on public profile</p>
                  </div>
                  <button className="w-12 h-6 bg-blue-500 dark:bg-blue-600 rounded-full relative transition-colors">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <h4 className="font-medium text-gray-900 dark:text-white">Change Password</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your password regularly</p>
                </button>
                
                <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                </button>
                
                <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <h4 className="font-medium text-gray-900 dark:text-white">Active Sessions</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage devices logged into your account</p>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-red-200 dark:border-red-900/50">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <h4 className="font-medium text-red-600 dark:text-red-400">Deactivate Account</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temporarily disable your account</p>
                </button>
                
                <button className="w-full text-left p-4 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and all data</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;