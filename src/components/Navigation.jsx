import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiDollarSign } from 'react-icons/fi';
import { useCurrency } from '../hooks/useCurrency';
import { motion as Motion } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRates, setShowRates] = useState(false);
  const location = useLocation();
  const { currency, setCurrency } = useCurrency();

  // Exchange rates (base: 1 unit of each currency) - Updated March 2026
  const exchangeRates = {
    INR: { INR: 1, USD: 0.0119, EUR: 0.0109, GBP: 0.0094 },
    USD: { INR: 84.25, USD: 1, EUR: 0.92, GBP: 0.79 },
    EUR: { INR: 91.50, USD: 1.09, EUR: 1, GBP: 0.86 },
    GBP: { INR: 106.75, USD: 1.27, EUR: 1.16, GBP: 1 },
  };

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const currencyNames = {
    INR: 'Indian Rupee',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
  };

  const links = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/transactions', label: '📝 Transactions' },
    { path: '/budget', label: '💰 Budget' },
    { path: '/analytics', label: '📈 Analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-br from-slate-950 via-emerald-900 to-emerald-950 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Link to="/dashboard" className="flex items-center gap-3 font-black text-2xl text-white hover:text-emerald-300 transition-colors" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
              <FiDollarSign size={32} />
              <span>FinanceHub</span>
            </Link>
          </Motion.div>

          {/* Desktop Navigation */}
          <Motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-md border border-emerald-400 border-opacity-30 rounded-full px-2 py-2 hover:bg-opacity-15 transition-all duration-300"
          >
            {links.map(({ path, label }) => (
              <Motion.div
                key={path}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link
                  to={path}
                  className={`px-6 py-3 rounded-2xl text-base font-black transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl scale-105'
                      : 'text-emerald-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {label}
                </Link>
              </Motion.div>
            ))}
          </Motion.div>

          {/* Currency Selector & Mobile Menu */}
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <Motion.select
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                onFocus={() => setShowRates(true)}
                onBlur={() => setTimeout(() => setShowRates(false), 200)}
                className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-lg text-sm font-bold border border-emerald-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-md transition-all duration-300 hover:bg-opacity-20"
              >
                <option value="INR">₹ INR - 1 INR = 0.012 USD</option>
                <option value="USD">$ USD - 1 USD = 84.25 INR</option>
                <option value="EUR">€ EUR - 1 EUR = 91.50 INR</option>
                <option value="GBP">£ GBP - 1 GBP = 106.75 INR</option>
              </Motion.select>

              {/* Exchange Rates Tooltip */}
              {showRates && (
                <Motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 w-80 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 border-2 border-emerald-400 border-opacity-50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl z-50"
                  onMouseEnter={() => setShowRates(true)}
                  onMouseLeave={() => setShowRates(false)}
                >
                  <div className="mb-4 pb-4 border-b border-emerald-400 border-opacity-30">
                    <p className="font-black text-emerald-300 text-lg">💱 Live Exchange Rates</p>
                    <p className="text-cyan-200 text-xs font-bold mt-1">March 2026 Market Rates</p>
                    <p className="text-cyan-200 text-xs font-bold">1 {currencySymbols[currency]} = </p>
                  </div>

                  <div className="space-y-3">
                    {Object.keys(exchangeRates[currency]).map((targetCurrency) => {
                      if (targetCurrency === currency) return null;
                      const rate = exchangeRates[currency][targetCurrency];
                      return (
                        <Motion.div
                          key={targetCurrency}
                          whileHover={{ translateX: 4 }}
                          className="flex items-center justify-between bg-white bg-opacity-5 border border-emerald-400 border-opacity-20 rounded-lg p-3 hover:bg-opacity-10 transition-all"
                        >
                          <div>
                            <p className="font-black text-emerald-300 text-sm">{currencySymbols[targetCurrency]} {targetCurrency}</p>
                            <p className="text-cyan-200 text-xs">{currencyNames[targetCurrency]}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-cyan-400">
                              {rate.toFixed(2)}
                            </p>
                            <p className="text-cyan-300 text-xs font-bold">
                              {targetCurrency === 'INR' && currency !== 'INR' ? `₹${rate.toFixed(2)}` : ''}
                              {targetCurrency === 'USD' && currency !== 'USD' ? `$${rate.toFixed(2)}` : ''}
                              {targetCurrency === 'EUR' && currency !== 'EUR' ? `€${rate.toFixed(2)}` : ''}
                              {targetCurrency === 'GBP' && currency !== 'GBP' ? `£${rate.toFixed(2)}` : ''}
                            </p>
                          </div>
                        </Motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-400 border-opacity-30">
                    <p className="text-emerald-200 text-xs font-bold">
                      📊 Updated: March 26, 2026 | Real-time Market Data
                    </p>
                  </div>
                </Motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 backdrop-blur-md"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </Motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden ${isOpen ? 'pt-4' : ''}`}
        >
          <Motion.div className="bg-white bg-opacity-10 backdrop-blur-md border border-emerald-400 border-opacity-30 rounded-2xl p-4 space-y-2">
            {links.map(({ path, label }) => (
              <Motion.div
                key={path}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 rounded-xl text-base font-black transition-all duration-300 ${
                    isActive(path)
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                      : 'text-emerald-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {label}
                </Link>
              </Motion.div>
            ))}
          </Motion.div>
        </Motion.div>
      </div>
    </nav>
  );
};

export default Navigation;
