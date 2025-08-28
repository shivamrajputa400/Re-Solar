import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Gift, Upload, Star, Clock, CheckCircle } from 'lucide-react';

interface Submission {
  id: string;
  panelType: string;
  manufacturingDate: string;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'pending' | 'evaluated' | 'approved' | 'paid';
  estimatedPrice?: number;
  couponCode?: string;
  submittedAt: string;
}

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'submit' | 'submissions' | 'coupons'>('overview');
  const [submissions] = useState<Submission[]>([
    {
      id: '1',
      panelType: 'Monocrystalline Silicon',
      manufacturingDate: '2018-03-15',
      quantity: 12,
      condition: 'good',
      status: 'approved',
      estimatedPrice: 2400,
      couponCode: 'QUALITY25',
      submittedAt: '2024-01-15'
    },
    {
      id: '2',
      panelType: 'Polycrystalline Silicon',
      manufacturingDate: '2020-07-22',
      quantity: 8,
      condition: 'excellent',
      status: 'evaluated',
      estimatedPrice: 1920,
      couponCode: 'PREMIUM30',
      submittedAt: '2024-01-18'
    }
  ]);

  const [formData, setFormData] = useState({
    panelType: '',
    manufacturingDate: '',
    quantity: '',
    condition: 'good',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Submission sent for evaluation!');
    setFormData({
      panelType: '',
      manufacturingDate: '',
      quantity: '',
      condition: 'good',
      description: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'evaluated': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'paid': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionStars = (condition: string) => {
    const stars = {
      excellent: 5,
      good: 4,
      fair: 3,
      poor: 2
    };
    return stars[condition as keyof typeof stars] || 3;
  };

  const totalEarnings = submissions
    .filter(s => s.status === 'paid')
    .reduce((sum, s) => sum + (s.estimatedPrice || 0), 0);

  const pendingEarnings = submissions
    .filter(s => s.status === 'approved')
    .reduce((sum, s) => sum + (s.estimatedPrice || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your solar scrap submissions and track earnings</p>
        </div>

       
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: <DollarSign className="h-5 w-5" /> },
              { id: 'submit', name: 'Submit Scrap', icon: <Plus className="h-5 w-5" /> },
              { id: 'submissions', name: 'My Submissions', icon: <Clock className="h-5 w-5" /> },
              { id: 'coupons', name: 'My Coupons', icon: <Gift className="h-5 w-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
         
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-3xl font-bold text-green-600">${totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                    <p className="text-3xl font-bold text-blue-600">${pendingEarnings.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Coupons</p>
                    <p className="text-3xl font-bold text-purple-600">2</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {submissions.slice(0, 3).map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{submission.panelType}</p>
                      <p className="text-sm text-gray-600">Quantity: {submission.quantity} panels</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                      {submission.estimatedPrice && (
                        <p className="text-lg font-bold text-green-600 mt-1">${submission.estimatedPrice}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Solar Scrap for Evaluation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Panel Type</label>
                  <select
                    name="panelType"
                    value={formData.panelType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select panel type</option>
                    <option value="Monocrystalline Silicon">Monocrystalline Silicon</option>
                    <option value="Polycrystalline Silicon">Polycrystalline Silicon</option>
                    <option value="Thin Film">Thin Film</option>
                    <option value="Cadmium Telluride">Cadmium Telluride</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturing Date</label>
                  <div className="relative">
                    <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="date"
                      name="manufacturingDate"
                      value={formData.manufacturingDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Number of Panels)</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="excellent">Excellent - Like new, minimal wear</option>
                    <option value="good">Good - Minor wear, fully functional</option>
                    <option value="fair">Fair - Visible wear, may have minor issues</option>
                    <option value="poor">Poor - Significant wear or damage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Provide any additional details about the condition, damage, or special features..."
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Photo Upload</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    For accurate evaluation, please upload clear photos of your solar panels. This helps us provide the most accurate pricing.
                  </p>
                  <button type="button" className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
                    Upload Photos
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Submit for Evaluation
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{submission.panelType}</h3>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Manufacturing Date</p>
                        <p className="font-medium">{new Date(submission.manufacturingDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium">{submission.quantity} panels</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Condition</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < getConditionStars(submission.condition)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500">Submitted</p>
                        <p className="font-medium">{new Date(submission.submittedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:text-right">
                    {submission.estimatedPrice && (
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        ${submission.estimatedPrice.toLocaleString()}
                      </p>
                    )}
                    {submission.couponCode && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-700 font-medium">Bonus Coupon Earned!</p>
                        <p className="text-purple-800 font-bold">{submission.couponCode}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-purple-100">Premium Quality Bonus</p>
                    <p className="text-2xl font-bold">30% OFF</p>
                  </div>
                  <Gift className="h-8 w-8 text-purple-200" />
                </div>
                <p className="text-purple-100 text-sm mb-4">Valid for next transaction</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="font-bold text-lg">PREMIUM30</p>
                  <p className="text-sm text-purple-100">Expires: March 15, 2024</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-green-100">Good Quality Bonus</p>
                    <p className="text-2xl font-bold">25% OFF</p>
                  </div>
                  <Gift className="h-8 w-8 text-green-200" />
                </div>
                <p className="text-green-100 text-sm mb-4">Valid for next transaction</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <p className="font-bold text-lg">QUALITY25</p>
                  <p className="text-sm text-green-100">Expires: February 28, 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">How to Earn More Coupons</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Submit high-quality solar panels (Excellent condition = 30% coupon)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Submit newer panels (2018+ = bonus percentage)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Submit large quantities (20+ panels = volume bonus)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
