import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('dovini_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('dovini_user');
      }
    }
    setIsLoading(false);
  }, []);

const login = async (email, password) => {
  setIsLoading(true);
  try {
    const res = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length === 0) {
      return { success: false, error: "Invalid email or password" };
    }

    const loggedUser = users[0];
    setUser(loggedUser);
    localStorage.setItem("dovini_user", JSON.stringify(loggedUser));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    setIsLoading(false);
  }
};


 const signup = async (name, email, password) => {
  setIsLoading(true);
  try {
    // check if user already exists
    const res = await fetch(`http://localhost:5000/users?email=${email}`);
    const existing = await res.json();
    if (existing.length > 0) {
      return { success: false, error: "Email already registered" };
    }

    // create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinedDate: new Date().toISOString(),
      shippingAddresses: [],
      phone: []
    };

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) throw new Error("Signup failed");

    setUser(newUser);
    localStorage.setItem("dovini_user", JSON.stringify(newUser));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    setIsLoading(false);
  }
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem('dovini_user');
  };

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
    }
  };

  const addAddress = async (addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const newAddress = {
        id: Date.now(),
        ...addressData,
        isDefault: user.shippingAddresses?.length === 0 // First address is default
      };

      const updatedUser = {
        ...user,
        shippingAddresses: [...(user.shippingAddresses || []), newAddress]
      };

      // Update JSON server
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses = user.shippingAddresses?.map(addr =>
        addr.id === addressId ? { ...addr, ...addressData } : addr
      ) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses
      };

      // Update JSON server
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteAddress = async (addressId) => {
    if (!user) return { success: false, error: "User not authenticated" };

    try {
      const updatedAddresses = user.shippingAddresses?.filter(addr => addr.id !== addressId) || [];

      const updatedUser = {
        ...user,
        shippingAddresses: updatedAddresses
      };

      // Update JSON server
      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setUser(updatedUser);
      localStorage.setItem('dovini_user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};