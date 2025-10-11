import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import AccountSettings from '../components/AccountSettings';

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // Mock functions for account settings
  const handleUpdateProfile = async (profileData) => {
    // In a real app, this would make an API call
    console.log('Updating profile:', profileData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update user data (in real app, this would come from API response)
    showSuccess('Profile updated successfully!');
    return Promise.resolve();
  };

  const handleChangePassword = async (passwordData) => {
    // In a real app, this would make an API call
    console.log('Changing password:', passwordData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Validate password change (in real app, this would come from API response)
    showSuccess('Password changed successfully!');
    return Promise.resolve();
  };

  const handleUpdatePreferences = async (preferences) => {
    // In a real app, this would make an API call
    console.log('Updating preferences:', preferences);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update preferences (in real app, this would come from API response)
    showSuccess('Preferences updated successfully!');
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-red-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/my-account"
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AccountSettings
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onChangePassword={handleChangePassword}
            onUpdatePreferences={handleUpdatePreferences}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;