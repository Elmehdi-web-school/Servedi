import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  StarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    state: '',
    services: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    total: 1,
    count: 0,
    totalProviders: 0
  });

  useEffect(() => {
    fetchProviders();
  }, [filters]);

  const fetchProviders = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });

      const response = await axios.get(`/users/providers?${params}`);
      setProviders(response.data.providers);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      setError('Failed to load providers');
      console.error('Error fetching providers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProviders(1);
  };

  const ProviderCard = ({ provider }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-8 h-8 text-primary-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900 truncate">
                {provider.businessName || `${provider.firstName} ${provider.lastName}`}
              </h3>
              <p className="text-sm text-secondary-600">
                {provider.firstName} {provider.lastName}
              </p>
            </div>
            
            {provider.rating?.count > 0 && (
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-secondary-700">
                  {provider.rating.average.toFixed(1)}
                </span>
                <span className="text-xs text-secondary-500">
                  ({provider.rating.count})
                </span>
              </div>
            )}
          </div>

          {provider.location?.city && (
            <div className="flex items-center text-sm text-secondary-500 mt-1">
              <MapPinIcon className="w-4 h-4 mr-1" />
              {provider.location.city}, {provider.location.state}
            </div>
          )}

          {provider.businessDescription && (
            <p className="text-sm text-secondary-600 mt-2 line-clamp-2">
              {provider.businessDescription}
            </p>
          )}

          {provider.services && provider.services.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {provider.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-100 text-primary-700"
                >
                  {service}
                </span>
              ))}
              {provider.services.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-secondary-100 text-secondary-600">
                  +{provider.services.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-xs text-secondary-500">
              {provider.email && (
                <div className="flex items-center">
                  <EnvelopeIcon className="w-3 h-3 mr-1" />
                  Contact
                </div>
              )}
              {provider.phone && (
                <div className="flex items-center">
                  <PhoneIcon className="w-3 h-3 mr-1" />
                  Call
                </div>
              )}
            </div>
            
            <button className="btn btn-primary text-sm px-4 py-2">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Find Service Providers
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Discover trusted professionals in your area. Browse by location, services, or search for specific providers.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-secondary-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="input pl-10"
                    placeholder="Business name, services..."
                    value={filters.search}
                    onChange={handleFilterChange}
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                </div>
              </div>

              <div>
                <label htmlFor="services" className="block text-sm font-medium text-secondary-700 mb-1">
                  Services
                </label>
                <input
                  type="text"
                  id="services"
                  name="services"
                  className="input"
                  placeholder="e.g., plumbing, cleaning"
                  value={filters.services}
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={handleFilterChange}
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="input"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary px-8">
                Search Providers
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-secondary-900">
                  {pagination.totalProviders} Providers Found
                </h2>
                <p className="text-sm text-secondary-600">
                  Page {pagination.current} of {pagination.total}
                </p>
              </div>
            </div>

            {/* Providers Grid */}
            {providers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {providers.map((provider) => (
                  <ProviderCard key={provider._id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-900 mb-2">
                  No providers found
                </h3>
                <p className="text-secondary-600">
                  Try adjusting your search criteria or browse all providers.
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.total > 1 && (
              <div className="flex justify-center space-x-2">
                {[...Array(pagination.total)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchProviders(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        pagination.current === page
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-secondary-700 hover:bg-secondary-50 border border-secondary-300'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Providers;