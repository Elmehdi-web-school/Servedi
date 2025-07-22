import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    businessName: user?.businessName || '',
    businessDescription: user?.businessDescription || '',
    services: user?.services?.join(', ') || '',
    address: user?.location?.address || '',
    city: user?.location?.city || '',
    state: user?.location?.state || '',
    zipCode: user?.location?.zipCode || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Prepare data for submission
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone
    };

    // Add provider-specific data
    if (user?.role === 'provider') {
      updateData.businessName = formData.businessName;
      updateData.businessDescription = formData.businessDescription;
      updateData.services = formData.services.split(',').map(s => s.trim()).filter(s => s);
      updateData.location = {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      };
    }

    const result = await updateProfile(updateData);
    
    if (result.success) {
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      businessName: user?.businessName || '',
      businessDescription: user?.businessDescription || '',
      services: user?.services?.join(', ') || '',
      address: user?.location?.address || '',
      city: user?.location?.city || '',
      state: user?.location?.state || '',
      zipCode: user?.location?.zipCode || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-secondary-900">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-sm text-secondary-600">
                    {user?.email} • <span className="capitalize">{user?.role}</span>
                  </p>
                </div>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <PencilIcon className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-secondary-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="input"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <p className="text-secondary-900 py-2">{user?.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="input"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <p className="text-secondary-900 py-2">{user?.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                      Email Address
                    </label>
                    <p className="text-secondary-500 py-2">{user?.email} (cannot be changed)</p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-secondary-900 py-2">{user?.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Provider-specific Information */}
              {user?.role === 'provider' && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">Business Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-secondary-700 mb-1">
                        Business Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          className="input"
                          value={formData.businessName}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-secondary-900 py-2">{user?.businessName || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="businessDescription" className="block text-sm font-medium text-secondary-700 mb-1">
                        Business Description
                      </label>
                      {isEditing ? (
                        <textarea
                          id="businessDescription"
                          name="businessDescription"
                          rows={4}
                          className="input resize-none"
                          value={formData.businessDescription}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-secondary-900 py-2">{user?.businessDescription || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="services" className="block text-sm font-medium text-secondary-700 mb-1">
                        Services (comma-separated)
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="services"
                          name="services"
                          className="input"
                          placeholder="e.g., Plumbing, Electrical, Cleaning"
                          value={formData.services}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="py-2">
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
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Location Information (Provider only) */}
              {user?.role === 'provider' && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-secondary-900 mb-4">Location</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="input"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-secondary-900 py-2">{user?.location?.address || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                        City
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="city"
                          name="city"
                          className="input"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-secondary-900 py-2">{user?.location?.city || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                        State
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="state"
                          name="state"
                          className="input"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      ) : (
                        <p className="text-secondary-900 py-2">{user?.location?.state || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex justify-end space-x-4 pt-6 border-t border-secondary-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    <XMarkIcon className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;