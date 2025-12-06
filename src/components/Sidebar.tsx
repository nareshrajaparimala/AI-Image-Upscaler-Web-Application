'use client';

import { X, User, History, LogOut, Trash2, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';

interface HistoryItem {
  result: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClear: () => void;
}

export default function Sidebar({ isOpen, onClose, history, onClear }: SidebarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const email = localStorage.getItem('user_email');
    const expiry = localStorage.getItem('auth_expiry');
    
    if (token && email && expiry) {
      const now = Date.now();
      if (now < parseInt(expiry)) {
        setIsLoggedIn(true);
        setUserEmail(email);
      } else {
        // Session expired
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        localStorage.removeItem('auth_expiry');
      }
    }
  }, []);

  const handleLogin = (email: string, token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_email', email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('auth_expiry');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-gradient-to-br from-white to-gray-50 shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b bg-white/50 backdrop-blur-sm'>
          <h2 className='text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>My Dashboard</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-110 shadow-md">
            <X className='w-6 h-6 text-gray-500' />
          </button>
        </div>

        {/* Login Section */}
        <div className='p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b'>
          {!isLoggedIn ? (
            <div className='text-center'>
              <div className='relative inline-block mb-3'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50'></div>
                <div className='relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full shadow-xl'>
                  <User className='w-8 h-8 text-white' />
                </div>
              </div>
              <p className='text-sm text-gray-700 mb-4 font-medium'>Sign in to save history permanently.</p>
              <button 
                onClick={() => setShowAuthModal(true)} 
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105'
              >
                Login / Sign Up
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-3 bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-md'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-75'></div>
                <div className='relative w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg'>
                  {userEmail.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className='flex-1'>
                <p className='font-bold text-sm text-gray-800'>{userEmail.split('@')[0]}</p>
                <p className='text-xs text-green-600 font-semibold'>✨ Pro Member</p>
              </div>
              <button 
                onClick={handleLogout} 
                className='hover:bg-red-50 p-2 rounded-full transition-all hover:scale-110 shadow-sm'
              >
                <LogOut className='w-5 h-5 text-red-400' />
              </button>
            </div>
          )}
        </div>

        {/* History List */}
        <div className='p-6 overflow-y-auto h-[calc(100vh-250px)]'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='font-bold flex items-center gap-2 text-gray-800'>
              <div className='p-1.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-md'>
                <History className='w-4 h-4 text-white' />
              </div>
              Recent Upscales
            </h3>
            {history.length > 0 && (
              <button 
                onClick={onClear} 
                className='text-xs text-red-500 flex items-center gap-1 hover:text-red-700 transition-all hover:scale-105 bg-red-50 px-2 py-1 rounded-lg shadow-sm'
              >
                <Trash2 className='w-3 h-3' /> Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className='text-center mt-10 bg-white/50 backdrop-blur-sm p-6 rounded-xl border-2 border-dashed border-gray-200'>
              <p className='text-gray-400 text-sm italic'>No recent images found.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              {history.map((item, idx) => (
                <div key={idx} className='flex gap-3 items-center p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm border-2 border-gray-100 transition-all hover:shadow-lg hover:scale-[1.02] bg-white/50'>
                  <div className='relative'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg blur-sm opacity-50'></div>
                    <img src={item.result} alt='Thumb' className='relative w-14 h-14 rounded-lg object-cover shadow-md border-2 border-white' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-gray-500 truncate font-medium'>{item.timestamp}</p>
                    <span className='text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>✨ 4x Enhanced</span>
                  </div>
                  <a 
                    href={item.result} 
                    download={`upscale-${idx}.png`} 
                    className='p-2.5 text-gray-400 hover:text-blue-600 transition-all hover:scale-110 bg-blue-50 rounded-lg shadow-sm hover:shadow-md'
                  >
                    <Download className='w-4 h-4' />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLogin}
      />
    </>
  );
}
