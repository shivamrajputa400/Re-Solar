import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Re-Solar
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.name}</span>
                <Link
                  to={user.role === 'admin' ? '/admin-dashboard' : '/customer-dashboard'}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;