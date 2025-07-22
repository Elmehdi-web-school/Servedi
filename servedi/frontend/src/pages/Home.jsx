import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MagnifyingGlassIcon, 
  UserGroupIcon, 
  StarIcon,
  ShieldCheckIcon,
  ClockIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Find Local Providers',
      description: 'Search and discover trusted service providers in your area with our advanced filtering system.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Verified Professionals',
      description: 'All service providers are carefully vetted and verified to ensure quality and reliability.'
    },
    {
      icon: StarIcon,
      title: 'Rating & Reviews',
      description: 'Read honest reviews and ratings from real customers to make informed decisions.'
    },
    {
      icon: ClockIcon,
      title: 'Quick Booking',
      description: 'Book services instantly or schedule appointments that work with your timeline.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Transparent Pricing',
      description: 'Get upfront pricing with no hidden fees. Compare quotes from multiple providers.'
    },
    {
      icon: UserGroupIcon,
      title: 'Support Community',
      description: 'Join a community of satisfied customers and trusted service providers.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              Find the Perfect
              <span className="text-primary-600 block">Service Provider</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              Connect with trusted professionals in your area. From home repairs to personal services, 
              find exactly what you need with Servedi's verified provider network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/providers"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Find Providers
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="btn btn-outline text-lg px-8 py-3"
                >
                  Become a Provider
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose Servedi?
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We make it easy to connect with the right professionals for any job, 
              big or small, with confidence and peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-primary-100">Verified Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-primary-100">Completed Services</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.8/5</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-secondary-600 mb-8">
            {isAuthenticated ? (
              "Explore our network of providers and find the perfect match for your needs."
            ) : (
              "Join thousands of satisfied customers and trusted providers on Servedi today."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn btn-primary text-lg px-8 py-3"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Sign Up Now
                </Link>
                <Link
                  to="/login"
                  className="btn btn-secondary text-lg px-8 py-3"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;