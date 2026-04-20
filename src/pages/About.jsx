import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'Get a comprehensive overview of your financial health with key metrics and trends at a glance.',
    },
    {
      icon: '📝',
      title: 'Transactions',
      description: 'Track all your income and expenses with detailed transaction history and advanced filtering options.',
    },
    {
      icon: '💰',
      title: 'Budget Tracking',
      description: 'Set monthly budgets and monitor spending with AI-powered recommendations for healthy finances.',
    },
    {
      icon: '📈',
      title: 'Analytics',
      description: 'Visualize your spending patterns with interactive charts and deep financial insights.',
    },
    {
      icon: '💱',
      title: 'Multi-Currency',
      description: 'Support for INR, USD, EUR, and GBP with live market exchange rates.',
    },
    {
      icon: '🤖',
      title: 'AI Intelligence',
      description: 'Smart daily spending limits and personalized financial recommendations.',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-900 to-emerald-950"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(5, 150, 105, 0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(5, 150, 105, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors font-bold text-lg">
            <FiArrowLeft size={24} />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-6xl font-black text-white mb-4" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
            Welcome to FinanceHub
          </h1>
          <p className="text-emerald-200 text-xl font-semibold max-w-2xl mx-auto">
            Your intelligent personal finance companion for smart money management and financial growth
          </p>
        </motion.div>

        {/* About Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-slate-900/70 border border-slate-700/70 rounded-2xl shadow-2xl p-10 hover:border-emerald-500/30 transition-all duration-300"
          >
            <p className="text-slate-100 text-lg font-bold leading-relaxed mb-4">
              FinanceHub is a modern, intelligent financial management platform designed to help you take control of your money. 
              Whether you're tracking daily expenses, planning budgets, or analyzing spending patterns, FinanceHub provides all the 
              tools you need in a beautiful, intuitive interface.
            </p>
            <p className="text-slate-200 text-lg font-semibold leading-relaxed">
              With AI-powered insights, multi-currency support, and real-time analytics, managing your finances has never been easier or more empowering.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="backdrop-blur-sm bg-slate-900/70 border border-slate-700/70 rounded-2xl shadow-2xl p-8 hover:border-cyan-500/30 hover:shadow-3xl transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-300 font-semibold leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Left Side */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 border-2 border-blue-400 rounded-2xl p-10 shadow-2xl"
          >
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">⚡</span> Key Features
            </h2>
            <ul className="space-y-4">
              {[
                'Real-time expense tracking',
                'Smart budget management with AI recommendations',
                'Detailed transaction history with advanced filters',
                'Beautiful charts and analytics',
                'Multi-currency support with live rates',
                'Daily spending limit calculator',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-cyan-100 font-bold text-sm">
                  <span className="text-cyan-400 font-black text-xl">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Side */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-900 border-2 border-emerald-400 rounded-2xl p-10 shadow-2xl"
          >
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span> Design Philosophy
            </h2>
            <p className="text-emerald-100 font-bold text-base leading-relaxed mb-6">
              FinanceHub combines cutting-edge technology with beautiful, intuitive design to make financial management accessible to everyone.
            </p>
            <div className="space-y-3">
              {[
                { title: 'Simple', desc: 'Easy to use interface anyone can master' },
                { title: 'Powerful', desc: 'Advanced analytics and AI insights' },
                { title: 'Beautiful', desc: 'Modern futuristic design with smooth animations' },
                { title: 'Smart', desc: 'AI-powered recommendations for better decisions' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-3">
                  <p className="font-black text-emerald-300">{item.title}</p>
                  <p className="text-emerald-100 text-sm font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-md bg-gradient-to-r from-emerald-600 to-cyan-600 border-2 border-emerald-400 rounded-2xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-3xl font-black text-white mb-4">Ready to Transform Your Finances?</h2>
          <p className="text-emerald-50 font-bold text-lg mb-8">
            Start tracking, analyzing, and optimizing your spending today!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/dashboard" 
              className="inline-block px-12 py-4 bg-white text-emerald-700 rounded-xl font-black text-lg hover:bg-opacity-90 transition-all duration-300 shadow-2xl"
            >
              Go to Dashboard →
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 text-center"
        >
          <p className="text-emerald-200 font-bold text-sm">
            FinanceHub © 2026 | Empowering Smart Financial Decisions
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
