import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  CogIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenus}>
              <span className="text-2xl font-bold text-primary-600">Servedi</span>
            </Link>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/providers"
                className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Find Providers
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Desktop user menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-sm rounded-full text-secondary-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">{user?.firstName}</span>
                  </div>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-secondary-500 border-b border-secondary-200">
                        <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                        <div className="text-xs">{user?.email}</div>
                        <div className="text-xs text-primary-600 capitalize">{user?.role}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                        onClick={closeMenus}
                      >
                        <CogIcon className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-secondary-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200">
              <Link
                to="/"
                className="flex items-center text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenus}
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link
                to="/providers"
                className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenus}
              >
                Find Providers
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={closeMenus}
                >
                  Dashboard
                </Link>
              )}
            </div>
            
            {/* Mobile user section */}
            <div className="pt-4 pb-3 border-t border-secondary-200">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <div className="px-3 py-2">
                    <div className="text-base font-medium text-secondary-800">{user?.firstName} {user?.lastName}</div>
                    <div className="text-sm text-secondary-500">{user?.email}</div>
                    <div className="text-sm text-primary-600 capitalize">{user?.role}</div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={closeMenus}
                  >
                    <CogIcon className="w-5 h-5 mr-2" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-secondary-600 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-1 px-3">
                  <Link
                    to="/login"
                    className="btn btn-outline w-full mb-2"
                    onClick={closeMenus}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary w-full"
                    onClick={closeMenus}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for mobile menu */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
          onClick={closeMenus}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;