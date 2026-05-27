
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, DollarSign, User, Home, Briefcase, CreditCard, FileText, Phone, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import { supabase, LoanApplication } from '../lib/supabase'; // Uncomment when supabase is set up
import { submitLoanApplication } from '../services/api';

interface LoanApplication {
  loan_type: string;
  loan_amount: number;
  loan_purpose: string;
  loan_term: number;
  full_name: string;
  middle_name?: string;
  contact_number: string;
  email: string;
  date_of_birth: string;
  marital_status?: string;
  dependents: number;
  driver_license?: string;
  medicare_number?: string;
  passport_number?: string;
  residential_address: string;
  residential_status: string;
  time_at_address: string;
  previous_address?: string;
  employment_type: string;
  employer_name: string;
  occupation: string;
  time_with_employer?: string;
  income_range?: string;
  monthly_income: number;
  other_income?: number;
  monthly_expenses?: number;
  existing_debts?: string;
  credit_profile: string;
  assets?: string;
  bank_name: string;
  account_years?: number;
  credit_cards?: number;
  total_credit_limit?: number;
  have_mortgage: boolean;
  mortgage_balance?: number;
  bankruptcy_history: boolean;
  property_value?: number;
  preferred_contact_method: string;
  preferred_contact_time?: string;
  referral_source?: string;
  notes?: string;
}

interface ApplicationFormProps {
  initialLoanType?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function ApplicationForm({ initialLoanType }: ApplicationFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loanTypeFromUrl = searchParams.get('loanType') || initialLoanType || '';

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<Partial<any>>({ // Replace 'any' with LoanApplication when supabase is set up
    loan_type: loanTypeFromUrl,
    loan_amount: 50000,
    loan_purpose: '',
    loan_term: 12,
    full_name: '',
    middle_name: '',
    contact_number: '',
    email: '',
    date_of_birth: '',
    marital_status: '',
    dependents: 0,
    driver_license: '',
    medicare_number: '',
    passport_number: '',
    residential_address: '',
    residential_status: '',
    time_at_address: '',
    previous_address: '',
    employment_type: '',
    employer_name: '',
    occupation: '',
    time_with_employer: '',
    income_range: '',
    monthly_income: 0,
    other_income: 0,
    monthly_expenses: 0,
    existing_debts: '',
    credit_profile: '',
    assets: '',
    bank_name: '',
    account_years: 0,
    credit_cards: 0,
    total_credit_limit: 0,
    have_mortgage: false,
    mortgage_balance: 0,
    bankruptcy_history: false,
    property_value: 0,
    preferred_contact_method: 'email',
    preferred_contact_time: '',
    referral_source: '',
    notes: ''
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem('loanSelectionData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setFormData(prev => ({
          ...prev,
          full_name: parsedData.fullName || prev.full_name,
          contact_number: parsedData.contact || prev.contact_number,
          email: parsedData.email || prev.email
        }));
        // Clear the stored data after loading
        localStorage.removeItem('loanSelectionData');
      } catch (error) {
        console.error('Error parsing stored loan selection data:', error);
      }
    }
  }, []);

  const totalSteps = 7;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const updateField = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateCurrentStep = (currentStep: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.loan_type) newErrors.loan_type = 'Please select a loan type';
        if (!formData.loan_amount || formData.loan_amount < 1000) newErrors.loan_amount = 'Loan amount must be at least $1,000';
        if (!formData.loan_purpose?.trim()) newErrors.loan_purpose = 'Please describe your loan purpose';
        break;

      case 2:
        if ((formData.loan_type === 'home' || formData.loan_type === 'property') && (!formData.property_value || formData.property_value < 1000)) {
          newErrors.property_value = 'Please enter the property value';
        }
        break;

      case 3:
        if (!formData.full_name?.trim()) newErrors.full_name = 'Full name is required';
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.contact_number?.trim()) {
          newErrors.contact_number = 'Phone number is required';
        } else if (!validatePhone(formData.contact_number)) {
          newErrors.contact_number = 'Please enter a valid n phone number';
        }
        if (!formData.date_of_birth) {
          newErrors.date_of_birth = 'Date of birth is required';
        } else {
          const dob = new Date(formData.date_of_birth);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const monthDifference = today.getMonth() - dob.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
          }
          if (age < 18) newErrors.date_of_birth = 'You must be at least 18 years old to proceed with this application.';
        }
        break;

      case 4:
        if (!formData.residential_address?.trim()) newErrors.residential_address = 'Current address is required';
        if (!formData.residential_status) newErrors.residential_status = 'Residential status is required';
        if (!formData.time_at_address) newErrors.time_at_address = 'Time at address is required';
        break;

      case 5:
        if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
        if (!formData.employer_name?.trim()) newErrors.employer_name = 'Employer name is required';
        if (!formData.occupation?.trim()) newErrors.occupation = 'Occupation is required';
        if (!formData.monthly_income || formData.monthly_income < 0) {
          newErrors.monthly_income = 'Please enter your monthly income';
        }
        break;

      case 6:
        if (!formData.credit_profile) newErrors.credit_profile = 'Credit profile is required';
        if (!formData.bank_name?.trim()) newErrors.bank_name = 'Primary bank is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep(6)) return;

    setIsSubmitting(true);
    try {
      await submitLoanApplication(formData);

      setStep(8);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLoanAmountRange = () => {
    switch (formData.loan_type) {
      case 'home': return { min: 50000, max: 2000000, step: 10000 };
      case 'property': return { min: 50000, max: 2000000, step: 10000 };
      default: return { min: 1000, max: 500000, step: 1000 };
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  };

  if (step === 8) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 flex items-center justify-center p-4 pt-40">
        <div className="max-w-2xl w-full ">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-nexus-gradient p-8 text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-16 h-16 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Application Submitted!
              </h1>
              <p className="text-emerald-100 dark:text-white text-lg">
                Reference #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>

            <div className="p-8">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Happens Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Confirmation Email</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">You'll receive a confirmation at {formData.email} within minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Application Review</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Our team will review your application within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Lender Match</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">We'll connect you with the best lenders for your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mr-3">4</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Personal Contact</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">A loan specialist will contact you via {formData.preferred_contact_method}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-white mb-3">Your Application Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Loan Type:</span>
                      <p className="font-semibold capitalize text-gray-800 dark:text-white">{formData.loan_type}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <p className="font-semibold text-gray-800 dark:text-white">${formData.loan_amount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Term:</span>
                      <p className="font-semibold text-gray-800 dark:text-white">{formData.loan_term} months</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Applicant:</span>
                      <p className="font-semibold text-gray-800 dark:text-white">{formData.full_name}</p>
                    </div>
                  </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold text-lg shadow-lg"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stepIcons = [DollarSign, FileText, User, Home, Briefcase, CreditCard, Phone];
  const stepTitles = [
    'Loan Details',
    'Loan Specifics',
    'Personal Info',
    'Residence',
    'Employment',
    'Financial Profile',
    'Review'
  ];

  const range = getLoanAmountRange();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-40 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-nexus-gradient px-8 py-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">Loan Application</h1>
              <p className="text-teal-100 text-lg">Step {step} of {totalSteps} - {stepTitles[step - 1]}</p>
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4, 5, 6, 7].map((stepNum) => {
                const Icon = stepIcons[stepNum - 1];
                return (
                  <div key={stepNum} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        stepNum < step ? 'bg-gradient-to-r from-blue-500 to-green-600 text-white shadow-lg scale-110' :
                        stepNum === step ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg scale-125' :
                        'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                      }`}>
                        {stepNum < step ? '✓' : <Icon className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs mt-2 font-medium hidden md:block ${
                        stepNum <= step ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {stepTitles[stepNum - 1]}
                      </span>
                    </div>
                    {stepNum < 7 && (
                      <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                        stepNum < step ? 'bg-gradient-to-r from-blue-500 to-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-8 py-8">
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tell us about your loan</h2>
                  <p className="text-gray-600 dark:text-gray-300">Let's start with the basics of what you're looking for</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      What type of loan do you need? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['home', 'property'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateField('loan_type', type)}
                          className={`px-4 py-3 rounded-xl font-semibold capitalize transition-all ${
                            formData.loan_type === type
                              ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <ErrorMessage message={errors.loan_type} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Loan Amount: ${formData.loan_amount?.toLocaleString()} *
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min={range.min}
                        max={range.max}
                        step={range.step}
                        value={formData.loan_amount || range.min}
                        onChange={(e) => updateField('loan_amount', parseFloat(e.target.value))}
                        className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                        style={{
                          background: `linear-gradient(to right, rgb(13, 148, 136) 0%, rgb(13, 148, 136) ${((formData.loan_amount! - range.min) / (range.max - range.min)) * 100}%, #4a5568 ${((formData.loan_amount! - range.min) / (range.max - range.min)) * 100}%, #4a5568 100%)`
                        }}
                      />
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>${range.min.toLocaleString()}</span>
                        <span>${range.max.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.loan_amount || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            updateField('loan_amount', Math.min(Math.max(value, range.min), range.max));
                          }}
                          placeholder="50000"
                          className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={() => updateField('loan_amount', Math.max(formData.loan_amount! - range.step, range.min))}
                          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-bold"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => updateField('loan_amount', Math.min(formData.loan_amount! + range.step, range.max))}
                          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <ErrorMessage message={errors.loan_amount} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Loan Term (months) *
                    </label>
                    <select
                      value={formData.loan_term}
                      onChange={(e) => updateField('loan_term', parseInt(e.target.value))}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value={12}>12 months (1 year)</option>
                      <option value={24}>24 months (2 years)</option>
                      <option value={36}>36 months (3 years)</option>
                      <option value={48}>48 months (4 years)</option>
                      <option value={60}>60 months (5 years)</option>
                      <option value={84}>84 months (7 years)</option>
                      <option value={120}>120 months (10 years)</option>
                      <option value={180}>180 months (15 years)</option>
                      <option value={240}>240 months (20 years)</option>
                      <option value={300}>300 months (25 years)</option>
                      <option value={360}>360 months (30 years)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Estimated Monthly Payment
                    </label>
                    <div className="px-4 py-4 bg-teal-50 dark:bg-teal-900/50 border-2 border-teal-200 dark:border-teal-700 rounded-xl">
                      <div className="text-2xl font-bold text-teal-700">
                        ${Math.round((formData.loan_amount! * 1.05) / formData.loan_term!).toLocaleString()}/mo
                      </div>
                      <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">Estimated at 5% interest rate</p>
                    </div>
                    <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 italic">This is for illustrative purposes only.</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      What will you use this loan for? *
                    </label>
                    <textarea
                      value={formData.loan_purpose}
                      onChange={(e) => updateField('loan_purpose', e.target.value)}
                      placeholder="Describe your loan purpose in detail..."
                      rows={4}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                        errors.loan_purpose ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.loan_purpose} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loan-Specific Details</h2>
                  <p className="text-gray-600 dark:text-gray-300">Provide details specific to your {formData.loan_type} loan</p>
                </div>

                {(formData.loan_type === 'home' || formData.loan_type === 'property') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Property Value ($) *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="number"
                          value={formData.property_value || ''}
                          onChange={(e) => updateField('property_value', parseFloat(e.target.value) || 0)}
                          placeholder="500000"
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                            errors.property_value ? 'border-red-300' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      <ErrorMessage message={errors.property_value} />
                    </div>
                  </div>
                )}


              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h2>
                  <p className="text-gray-600 dark:text-gray-300">Help us identify you and reach you easily</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => updateField('full_name', e.target.value)}
                      placeholder="John Michael Smith"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.full_name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.full_name} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.email ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.email} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.contact_number}
                      onChange={(e) => updateField('contact_number', e.target.value)}
                      placeholder="+61 412 345 678"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.contact_number ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.contact_number} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => updateField('date_of_birth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:[color-scheme:dark] ${
                        errors.date_of_birth ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.date_of_birth} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Marital Status
                    </label>
                    <select
                      value={formData.marital_status}
                      onChange={(e) => updateField('marital_status', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="de-facto">De Facto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Number of Dependents
                    </label>
                    <input
                      type="number"
                      value={formData.dependents || ''}
                      onChange={(e) => updateField('dependents', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      min="0"
                      max="20"
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Identification (at least one required)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        value={formData.driver_license}
                        onChange={(e) => updateField('driver_license', e.target.value)}
                        placeholder="Driver's License"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={formData.medicare_number}
                        onChange={(e) => updateField('medicare_number', e.target.value)}
                        placeholder="Medicare Number"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={formData.passport_number}
                        onChange={(e) => updateField('passport_number', e.target.value)}
                        placeholder="Passport Number"
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Residential Information</h2>
                  <p className="text-gray-600 dark:text-gray-300">Tell us about your current and previous addresses</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Current Residential Address *
                    </label>
                    <textarea
                      value={formData.residential_address}
                      onChange={(e) => updateField('residential_address', e.target.value)}
                      placeholder="123 Main Street, Sydney NSW 2000"
                      rows={3}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.residential_address ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.residential_address} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Residential Status *
                    </label>
                    <select
                      value={formData.residential_status}
                      onChange={(e) => updateField('residential_status', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.residential_status ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select status</option>
                      <option value="own">Own (No Mortgage)</option>
                      <option value="mortgage">Own (With Mortgage)</option>
                      <option value="rent">Renting</option>
                      <option value="parents">Living with Parents</option>
                      <option value="other">Other</option>
                    </select>
                    <ErrorMessage message={errors.residential_status} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Time at Current Address *
                    </label>
                    <select
                      value={formData.time_at_address}
                      onChange={(e) => updateField('time_at_address', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.time_at_address ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select duration</option>
                      <option value="0-6-months">0-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="1-2-years">1-2 years</option>
                      <option value="2-5-years">2-5 years</option>
                      <option value="5-10-years">5-10 years</option>
                      <option value="10+-years">10+ years</option>
                    </select>
                    <ErrorMessage message={errors.time_at_address} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Previous Address (if less than 3 years at current)
                    </label>
                    <textarea
                      value={formData.previous_address}
                      onChange={(e) => updateField('previous_address', e.target.value)}
                      placeholder="45 Old Street, Melbourne VIC 3000"
                      rows={2}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Employment & Income</h2>
                  <p className="text-gray-600 dark:text-gray-300">Provide details about your employment and income</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Employment Type *
                    </label>
                    <select
                      value={formData.employment_type}
                      onChange={(e) => updateField('employment_type', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.employment_type ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select type</option>
                      <option value="full-time">Full-Time Employee</option>
                      <option value="part-time">Part-Time Employee</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="casual">Casual</option>
                      <option value="contract">Contract</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="retired">Retired</option>
                    </select>
                    <ErrorMessage message={errors.employment_type} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Employer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.employer_name}
                      onChange={(e) => updateField('employer_name', e.target.value)}
                      placeholder="Company Name"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.employer_name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.employer_name} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Occupation/Job Title *
                    </label>
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => updateField('occupation', e.target.value)}
                      placeholder="Software Engineer"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.occupation ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.occupation} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Time with Current Employer
                    </label>
                    <select
                      value={formData.time_with_employer}
                      onChange={(e) => updateField('time_with_employer', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select duration</option>
                      <option value="0-6-months">0-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="1-2-years">1-2 years</option>
                      <option value="2-5-years">2-5 years</option>
                      <option value="5+-years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Monthly Income (Before Tax) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.monthly_income || ''}
                        onChange={(e) => updateField('monthly_income', parseFloat(e.target.value) || 0)}
                        placeholder="5000"
                        min="0"
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                          errors.monthly_income ? 'border-red-300' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {formData.monthly_income! > 0 && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Annual: ${(formData.monthly_income! * 12).toLocaleString()}</p>
                    )}
                    <ErrorMessage message={errors.monthly_income} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Other Monthly Income
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.other_income || ''}
                        onChange={(e) => updateField('other_income', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rental income, investments, etc.</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Total Monthly Expenses
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.monthly_expenses || ''}
                        onChange={(e) => updateField('monthly_expenses', parseFloat(e.target.value) || 0)}
                        placeholder="3000"
                        min="0"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Include rent/mortgage, utilities, food, transport, etc.</p>
                  </div>

                  {(formData.monthly_income! + (formData.other_income || 0) - (formData.monthly_expenses || 0)) > 0 && (
                    <div className="md:col-span-2 bg-emerald-50 dark:bg-emerald-900/50 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900 dark:text-white">Monthly Surplus:</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          ${(formData.monthly_income! + (formData.other_income || 0) - (formData.monthly_expenses || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Financial Profile</h2>
                  <p className="text-gray-600 dark:text-gray-300">Help us understand your financial situation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Credit Profile *
                    </label>
                    <select
                      value={formData.credit_profile}
                      onChange={(e) => updateField('credit_profile', e.target.value)}
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.credit_profile ? 'border-red-300' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select profile</option>
                      <option value="excellent">Excellent - No missed payments</option>
                      <option value="good">Good - Minimal issues</option>
                      <option value="fair">Fair - Some late payments</option>
                      <option value="poor">Poor - Multiple defaults</option>
                      <option value="not-sure">Not Sure</option>
                    </select>
                    <ErrorMessage message={errors.credit_profile} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Primary Bank *
                    </label>
                    <input
                      type="text"
                      value={formData.bank_name}
                      onChange={(e) => updateField('bank_name', e.target.value)}
                      placeholder="Commonwealth Bank"
                      className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.bank_name ? 'border-red-300' : 'border-gray-200'
                      }`}
                    />
                    <ErrorMessage message={errors.bank_name} />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Years with Bank
                    </label>
                    <input
                      type="number"
                      value={formData.account_years || ''}
                      onChange={(e) => updateField('account_years', parseInt(e.target.value) || 0)}
                      placeholder="5"
                      min="0"
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Number of Credit Cards
                    </label>
                    <input
                      type="number"
                      value={formData.credit_cards || ''}
                      onChange={(e) => updateField('credit_cards', parseInt(e.target.value) || 0)}
                      placeholder="2"
                      min="0"
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 ">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Total Credit Card Limit
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="number"
                        value={formData.total_credit_limit || ''}
                        onChange={(e) => updateField('total_credit_limit', parseFloat(e.target.value) || 0)}
                        placeholder="10000"
                        min="0"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Existing Debts & Liabilities
                    </label>
                    <textarea
                      value={formData.existing_debts}
                      onChange={(e) => updateField('existing_debts', e.target.value)}
                      placeholder="Describe any existing loans, credit cards, or other debts..."
                      rows={3}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="have_mortgage"
                        checked={formData.have_mortgage}
                        onChange={(e) => updateField('have_mortgage', e.target.checked)}
                        className="w-5 h-5 text-teal-600 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-teal-500"
                      />
                      <label htmlFor="have_mortgage" className="ml-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                        I currently have a mortgage
                      </label>
                    </div>

                    {formData.have_mortgage && (
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                          Remaining Mortgage Balance
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="number"
                            value={formData.mortgage_balance || ''}
                            onChange={(e) => updateField('mortgage_balance', parseFloat(e.target.value) || 0)}
                            placeholder="250000"
                            min="0"
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="bankruptcy_history"
                        checked={formData.bankruptcy_history}
                        onChange={(e) => updateField('bankruptcy_history', e.target.checked)}
                        className="w-5 h-5 text-teal-600 border-2 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-teal-500"
                      />
                      <label htmlFor="bankruptcy_history" className="ml-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                        I have declared bankruptcy in the last 7 years
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Assets (Property, Vehicles, Savings, Investments)
                    </label>
                    <textarea
                      value={formData.assets}
                      onChange={(e) => updateField('assets', e.target.value)}
                      placeholder="List your assets and their approximate values..."
                      rows={3}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Preferences & Review</h2>
                  <p className="text-gray-600 dark:text-gray-300">Final details and review your application</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Preferred Contact Method
                    </label>
                    <select
                      value={formData.preferred_contact_method}
                      onChange={(e) => updateField('preferred_contact_method', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Best Time to Contact
                    </label>
                    <select
                      value={formData.preferred_contact_time}
                      onChange={(e) => updateField('preferred_contact_time', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Any time</option>
                      <option value="morning">Morning (9 AM - 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                      <option value="evening">Evening (5 PM - 8 PM)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      How did you hear about us?
                    </label>
                    <select
                      value={formData.referral_source}
                      onChange={(e) => updateField('referral_source', e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select source</option>
                      <option value="google">Google Search</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="friend">Friend or Family</option>
                      <option value="broker">Mortgage Broker</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Additional Notes or Questions
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      placeholder="Any additional information you'd like to share..."
                      rows={4}
                      className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Application Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-white font-medium">Loan Type:</span>
                      <p className="font-semibold capitalize text-gray-800 dark:text-white">{formData.loan_type}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Amount:</span>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">${formData.loan_amount?.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Term:</span>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.loan_term} months</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Applicant:</span>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{formData.full_name}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Monthly Income:</span>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">${formData.monthly_income?.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Employment:</span>
                      <p className="font-semibold capitalize text-gray-800 dark:text-gray-200">{formData.employment_type}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/50 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-1 mr-4 w-5 h-5 text-teal-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-bold">Declaration & Consent:</span> I declare that all information provided is true and accurate to the best of my knowledge. I consent to Nexus Finance and its partner lenders contacting me regarding this application. I understand my information may be shared with lenders for assessment purposes and credit checks may be performed.
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-10 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center px-8 py-4 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-bold text-lg"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
              )}

              <div className={step === 1 ? 'ml-auto' : ''}>
                {step < 7 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-bold text-lg shadow-lg"
                  >
                    Next Step
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-bold text-lg shadow-xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
