import  { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Gift, 
  Settings,
  Eye,
  CheckCircle,
  X,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';

interface Submission {
  id: string;
  customerName: string;
  customerEmail: string;
  panelType: string;
  manufacturingDate: string;
  quantity: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  status: 'pending' | 'evaluated' | 'approved' | 'rejected';
  estimatedPrice?: number;
  couponGenerated?: string;
  submittedAt: string;
  description?: string;
}

interface PricingRule {
  yearRange: string;
  basePrice: number;
  conditionMultipliers: Record<string, number>;
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'pricing' | 'customers' | 'analytics'>('overview');
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      customerName: 'ramji',
      customerEmail: 'example.com',
      panelType: 'Monocrystalline Silicon',
      manufacturingDate: '2018-03-15',
      quantity: 12,
      condition: 'good',
      status: 'pending',
      submittedAt: '2024-01-15',
      description: 'Solar panels removed from residential installation. Minor wear on frames but cells are in good condition.'
    },
    {
      id: '2',
      customerName: 'Sarahji',
      customerEmail: 'example.com',
      panelType: 'Polycrystalline Silicon',
      manufacturingDate: '2020-07-22',
      quantity: 8,
      condition: 'excellent',
      status: 'pending',
      submittedAt: '2024-01-18',
      description: 'Nearly new panels from cancelled commercial project. Excellent condition with original packaging.'
    },
    {
      id: '3',
      customerName: 'sinhg',
      customerEmail: 'example.com',
      panelType: 'Thin Film',
      manufacturingDate: '2016-11-10',
      quantity: 15,
      condition: 'fair',
      status: 'evaluated',
      estimatedPrice: 1800,
      couponGenerated: 'FAIR15',
      submittedAt: '2024-01-12'
    }
  ]);

  const [pricingRules] = useState<PricingRule[]>([
    {
      yearRange: '2020-2024',
      basePrice: 25,
      conditionMultipliers: { excellent: 1.3, good: 1.0, fair: 0.7, poor: 0.4 }
    },
    {
      yearRange: '2018-2019',
      basePrice: 20,
      conditionMultipliers: { excellent: 1.3, good: 1.0, fair: 0.7, poor: 0.4 }
    },
    {
      yearRange: '2015-2017',
      basePrice: 15,
      conditionMultipliers: { excellent: 1.3, good: 1.0, fair: 0.7, poor: 0.4 }
    },
    {
      yearRange: '2010-2014',
      basePrice: 10,
      conditionMultipliers: { excellent: 1.3, good: 1.0, fair: 0.7, poor: 0.4 }
    }
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const handleEvaluateSubmission = (id: string, price: number, generateCoupon: boolean) => {
    setSubmissions(submissions.map(sub => {
      if (sub.id === id) {
        const couponCode = generateCoupon ? generateCouponCode(sub.condition) : undefined;
        return {
          ...sub,
          status: 'evaluated' as const,
          estimatedPrice: price,
          couponGenerated: couponCode
        };
      }
      return sub;
    }));
    setSelectedSubmission(null);
  };

  const generateCouponCode = (condition: string) => {
    const codes = {
      excellent: 'PREMIUM30',
      good: 'QUALITY25',
      fair: 'FAIR15',
      poor: 'BASIC10'
    };
    return codes[condition as keyof typeof codes] || 'BONUS10';
  };

  const calculatePrice = (submission: Submission) => {
    const year = new Date(submission.manufacturingDate).getFullYear();
    const rule = pricingRules.find(r => {
      const [start, end] = r.yearRange.split('-').map(Number);
      return year >= start && year <= end;
    });
    
    if (!rule) return 0;
    
    const basePrice = rule.basePrice;
    const multiplier = rule.conditionMultipliers[submission.condition];
    return Math.round(basePrice * multiplier * submission.quantity);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'evaluated': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalCustomers = 125;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const totalRevenue = 45200;
  const couponsIssued = 38;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage submissions, pricing, and customer relationships</p>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: <TrendingUp className="h-5 w-5" /> },
              { id: 'submissions', name: 'Submissions', icon: <Clock className="h-5 w-5" /> },
              { id: 'pricing', name: 'Pricing Rules', icon: <DollarSign className="h-5 w-5" /> },
              { id: 'customers', name: 'Customers', icon: <Users className="h-5 w-5" /> },
              { id: 'analytics', name: 'Analytics', icon: <Settings className="h-5 w-5" /> }
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-3xl font-bold text-blue-600">{totalCustomers}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                    <p className="text-3xl font-bold text-yellow-600">{pendingSubmissions}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Coupons Issued</p>
                    <p className="text-3xl font-bold text-purple-600">{couponsIssued}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

        
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Submissions</h2>
              <div className="space-y-4">
                {submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{submission.customerName}</p>
                      <p className="text-sm text-gray-600">{submission.panelType} - {submission.quantity} panels</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{new Date(submission.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

       
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{submission.customerName}</h3>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Panel Type</p>
                        <p className="font-medium">{submission.panelType}</p>
                      </div>
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
                          <span className="font-medium capitalize">{submission.condition}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < (submission.condition === 'excellent' ? 5 : submission.condition === 'good' ? 4 : submission.condition === 'fair' ? 3 : 2)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {submission.description && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">{submission.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    {submission.status === 'pending' && (
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Evaluate</span>
                      </button>
                    )}
                    
                    {submission.estimatedPrice && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${submission.estimatedPrice}</p>
                        {submission.couponGenerated && (
                          <p className="text-sm text-purple-600 font-medium">Coupon: {submission.couponGenerated}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Current Pricing Rules</h2>
              <div className="space-y-6">
                {pricingRules.map((rule, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Manufacturing Year: {rule.yearRange}</h3>
                      <p className="text-xl font-bold text-green-600">${rule.basePrice}/panel</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(rule.conditionMultipliers).map(([condition, multiplier]) => (
                        <div key={condition} className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600 capitalize">{condition}</p>
                          <p className="font-bold text-gray-900">{multiplier}x</p>
                          <p className="text-sm text-green-600">${Math.round(rule.basePrice * multiplier)}/panel</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Coupon Generation Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                  <h3 className="font-semibold text-purple-900">Excellent Condition</h3>
                  <p className="text-purple-700">30% discount coupon</p>
                  <p className="text-sm text-purple-600">Code: PREMIUM30</p>
                </div>
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-900">Good Condition</h3>
                  <p className="text-green-700">25% discount coupon</p>
                  <p className="text-sm text-green-600">Code: QUALITY25</p>
                </div>
                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <h3 className="font-semibold text-yellow-900">Fair Condition</h3>
                  <p className="text-yellow-700">15% discount coupon</p>
                  <p className="text-sm text-yellow-600">Code: FAIR15</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Poor Condition</h3>
                  <p className="text-gray-700">10% discount coupon</p>
                  <p className="text-sm text-gray-600">Code: BASIC10</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Evaluate Submission</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedSubmission.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Panel Type</p>
                    <p className="font-medium">{selectedSubmission.panelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Manufacturing Date</p>
                    <p className="font-medium">{new Date(selectedSubmission.manufacturingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{selectedSubmission.quantity} panels</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Condition Assessment</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="font-medium capitalize">{selectedSubmission.condition}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (selectedSubmission.condition === 'excellent' ? 5 : selectedSubmission.condition === 'good' ? 4 : selectedSubmission.condition === 'fair' ? 3 : 2)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {selectedSubmission.description && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-gray-700">{selectedSubmission.description}</p>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="font-medium text-blue-900">Calculated Price</p>
                  <p className="text-2xl font-bold text-blue-600">${calculatePrice(selectedSubmission)}</p>
                  <p className="text-sm text-blue-700">Based on current pricing rules</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEvaluateSubmission(selectedSubmission.id, calculatePrice(selectedSubmission), true)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Approve & Generate Coupon</span>
                </button>
                <button
                  onClick={() => handleEvaluateSubmission(selectedSubmission.id, calculatePrice(selectedSubmission), false)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Approve Without Coupon
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Management</h2>
            <p className="text-gray-600">Customer management features will be implemented here.</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
            <p className="text-gray-600">Analytics and reporting features will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
