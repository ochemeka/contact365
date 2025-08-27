"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSuccess(true);

    // Reset form after success
    setFormData({ name: "", email: "", message: "" });

    // Auto-hide success popup after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      <Header />

      <main className="pt-24 pb-16 bg-gray-50 dark:bg-gray-900 min-h-screen relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.h1
            className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Get in Touch
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info + Map */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-gray-600 dark:text-gray-300">
                Have a question, feedback, or a project idea? We’d love to hear
                from you.
              </p>

              <div className="flex items-center gap-3">
                <Mail className="text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-200">
                  support@contact365.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-200">
                  +234 800 123 4567
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-purple-600 dark:text-purple-400" />
                <span className="text-gray-700 dark:text-gray-200">
                  Lagos, Nigeria
                </span>
              </div>

              {/* Google Map Embed */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3662723406884!2d3.379205415316029!3d6.524379295283496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf50e72f9f3a5%3A0x7c0f123456789abc!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1691061939305!5m2!1sen!2sng"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <motion.textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className="mt-1 w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:ring-purple-500 focus:border-purple-500"
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>

        {/* ✅ Success Popup */}
        <AnimatePresence>
          {success && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center max-w-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Message Sent!
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Thanks for reaching out. We’ll get back to you soon.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
