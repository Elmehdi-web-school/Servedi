import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  MapPinIcon, 
  StarIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const ClientDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Welcome back, {user?.firstName}!</h2>
        <p className="text-secondary-600">
          Find and book services from verified providers in your area.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Recent Bookings</h3>
          <p className="text-secondary-500">No recent bookings</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Saved Providers</h3>
          <p className="text-secondary-500">No saved providers</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="btn btn-primary w-full text-sm">Find Providers</button>
            <button className="btn btn-outline w-full text-sm">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProviderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Welcome back, {user?.firstName}!</h2>
        <p className="text-secondary-600">
          Manage your services and connect with potential clients.
        </p>
      </div>

      {/* Business Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Business Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-secondary-700 mb-2">Business Information</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-secondary-600">
                <UserIcon className="w-4 h-4 mr-2" />
                {user?.businessName || 'No business name set'}
              </div>
              <div className="flex items-center text-sm text-secondary-600">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                {user?.email}
              </div>
              {user?.phone && (
                <div className="flex items-center text-sm text-secondary-600">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {user.phone}
                </div>
              )}
              {user?.location?.city && (
                <div className="flex items-center text-sm text-secondary-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {user.location.city}, {user.location.state}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary-700 mb-2">Rating & Reviews</h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-secondary-600">
                  {user?.rating?.average || 0} ({user?.rating?.count || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Your Services</h3>
        {user?.services && user.services.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.services.map((service, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
              >
                {service}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-secondary-500">No services listed</p>
        )}
      </div>

      {/* Business Description */}
      {user?.businessDescription && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">About Your Business</h3>
          <p className="text-secondary-600">{user.businessDescription}</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-primary-600">0</div>
          <div className="text-sm text-secondary-500">Active Requests</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-primary-600">0</div>
          <div className="text-sm text-secondary-500">Completed Jobs</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-2xl font-bold text-primary-600">0</div>
          <div className="text-sm text-secondary-500">This Month</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn btn-primary">Update Profile</button>
          <button className="btn btn-outline">View Public Profile</button>
          <button className="btn btn-secondary">Manage Services</button>
          <button className="btn btn-secondary">View Analytics</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user?.role === 'provider' ? <ProviderDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;