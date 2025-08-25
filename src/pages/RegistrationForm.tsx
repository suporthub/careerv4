import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../hooks/useToast';

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  education: z.string().min(1, 'Please select your education level'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });
  const { addToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    setDuplicateError(null);
    try {
      // Check for duplicates
      const { data: existing, error: checkError } = await supabase
        .from('registrations')
        .select('email, phone')
        .or(`email.eq.${data.email},phone.eq.${data.phone}`);

      if (checkError) {
        throw checkError;
      }

      if (existing && existing.length > 0) {
        if (existing.some(r => r.email === data.email)) {
          setDuplicateError('Email already registered.');
        } else if (existing.some(r => r.phone === data.phone)) {
          setDuplicateError('Phone number already registered.');
        }
        return;
      }

      const supabaseData = {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        education: data.education,
      };

      const { error } = await supabase.from('registrations').insert([supabaseData]);

      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Registration error:', error);
      addToast('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {duplicateError ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full mx-auto text-center bg-slate-800/50 rounded-2xl shadow-xl p-8 sm:p-12 border border-red-500/50"
            >
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Registration Failed</h2>
              <p className="text-lg text-red-400 mb-6">{duplicateError}</p>
              <button
                onClick={() => {
                  setDuplicateError(null);
                  reset();
                }}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-slate-800/50 rounded-2xl shadow-xl p-12 border border-slate-700"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-lg text-gray-400 mb-6">Thank you for your interest. We will connect with you within 24-48 hours.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Another Application
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4 transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
                <h1 className="text-4xl font-bold text-white mb-4">Book Your Free Interview</h1>
                <p className="text-xl text-gray-400 mb-6">
                  This is your first step towards a new career. Let's get to know you better.
                </p>
                
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold text-white">Interview-Based Selection</h3>
                      <p className="text-gray-400">We'll review your application and schedule a personal interview within 24-48 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-800/50 rounded-2xl shadow-xl p-8 border border-slate-700">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Form Fields */}
                  {[
                    { name: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', type: 'text' },
                    { name: 'email', label: 'Email Address', placeholder: 'Enter your email address', type: 'email' },
                    { name: 'phone', label: 'Phone Number', placeholder: 'Enter your phone number', type: 'tel' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label} *
                      </label>
                      <input
                        {...register(field.name as keyof RegistrationFormData)}
                        type={field.type}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                        placeholder={field.placeholder}
                      />
                      {errors[field.name as keyof RegistrationFormData] && (
                        <p className="mt-1 text-sm text-red-400">{errors[field.name as keyof RegistrationFormData]?.message}</p>
                      )}
                    </div>
                  ))}
                  
                  {/* Select Fields */}
                  {[
                    { name: 'education', label: 'Highest Education', options: ["Select...", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Other"] },
                  ].map(field => (
                     <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {field.label} *
                      </label>
                      <select
                        {...register(field.name as keyof RegistrationFormData)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      >
                        {field.options.map(opt => <option key={opt} value={opt === "Select..." ? "" : opt.toLowerCase().replace(/ /g, '-')}>{opt}</option>)}
                      </select>
                      {errors[field.name as keyof RegistrationFormData] && (
                        <p className="mt-1 text-sm text-red-400">{errors[field.name as keyof RegistrationFormData]?.message}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our terms and privacy policy.
                  </p>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistrationForm;
