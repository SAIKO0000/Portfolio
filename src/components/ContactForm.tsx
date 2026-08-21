'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { siteConfig } from '@/data/portfolio';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });

    try {
      // For now, we'll simulate a form submission
      // In production, you'd integrate with a service like Resend, SendGrid, or Netlify Forms
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setFormState({
        status: 'success',
        message: 'Thank you for your message! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Log form data for now (remove in production)
      console.log('Form submitted:', formData);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState({
        status: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  const getStatusMessageStyle = () => {
    if (formState.status === 'success') {
      return 'bg-green-100 text-green-800 border border-green-200';
    }
    if (formState.status === 'error') {
      return 'bg-red-100 text-red-800 border border-red-200';
    }
    return '';
  };

  return (
    <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind? I&apos;d love to hear about it and discuss how we can bring it to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-medium">Email</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {siteConfig.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="font-medium">Location</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {siteConfig.location}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="font-medium">Availability</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {siteConfig.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Highlight */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Specializing In</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'AI Integration', 'Performance Optimization'].map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Project discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark 
                      ? 'bg-gray-600 border-gray-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Form Status Message */}
              {formState.message && (
                <div className={`p-3 rounded-md ${getStatusMessageStyle()}`}>
                  {formState.message}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid || formState.status === 'loading'}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  !isFormValid || formState.status === 'loading'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                } text-white`}
              >
                {formState.status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
