import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, DollarSign, Calendar, Award, Shield, Zap } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen">
     
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Your Old Solar Panels Into 
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Cash</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Re-Solar makes it easy to sell your old or damaged solar panels. We offer competitive prices based on manufacturing dates and provide instant quotes with quality-based discount coupons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Selling Today
              </Link>
              <Link
                to="/login"
                className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300"
              >
                I Have An Account
              </Link>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Re-Solar?</h2>
            <p className="text-xl text-gray-600">We make solar scrap selling simple, profitable, and environmentally responsible</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Best Prices"
              description="Competitive pricing based on manufacturing date and panel condition. Get the maximum value for your solar scrap."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8" />}
              title="Date-Based Pricing"
              description="Our smart pricing algorithm considers manufacturing dates to ensure fair and accurate valuations."
            />
            <FeatureCard
              icon={<Award className="h-8 w-8" />}
              title="Quality Rewards"
              description="Higher quality solar waste earns bonus discount coupons for future transactions."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Secure Transactions"
              description="Safe and secure payment processing with transparent tracking throughout the entire process."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Quick Processing"
              description="Fast evaluation and payment processing. Get your money within 24-48 hours of approval."
            />
            <FeatureCard
              icon={<Recycle className="h-8 w-8" />}
              title="Eco-Friendly"
              description="Help the environment by ensuring proper recycling and disposal of solar panel waste."
            />
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to sell your solar scrap</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              step="1"
              title="Submit Details"
              description="Upload photos and provide information about your solar panels including manufacturing date."
            />
            <StepCard
              step="2"
              title="Get Quote"
              description="Receive an instant quote based on our date-based pricing algorithm and quality assessment."
            />
            <StepCard
              step="3"
              title="Quality Check"
              description="Our experts evaluate your panels and may provide quality-based discount coupons."
            />
            <StepCard
              step="4"
              title="Get Paid"
              description="Once approved, receive payment directly to your account within 24-48 hours."
            />
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Turn Solar Waste Into Cash?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who have already sold their solar scrap through Re-Solar
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default LandingPage;
