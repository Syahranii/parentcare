const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db'); // pastikan path benar
const supabase = getDB();

const AuthService = require('../services/auth.service');

const register = async (request, h) => {
  const payload = request.payload;
  return AuthService.register(payload, h);
};

const login = async (request, h) => {
  const payload = request.payload;
  return AuthService.login(payload, h);
};

const checkAuth = async (request, h) => {
  try {
    const token = request.state.token;
    
    if (!token) {
      return h.response({ isLoggedIn: false }).code(200);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, nama_lengkap as name, email')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return h.response({ isLoggedIn: false }).code(200);
    }

    return h.response({ 
      isLoggedIn: true,
      user 
    }).code(200);
  } catch (err) {
    return h.response({ isLoggedIn: false }).code(200);
  }
};

const getCurrentUser = async (request, h) => {
  try {
    console.log('Cookies received:', request.state); // Debug 1
    
    const token = request.state.token;
    console.log('Token extracted:', token); // Debug 2
    
    if (!token) {
      console.log('No token found');
      return h.response({ isLoggedIn: false }).code(401);
    }
console.log('✅ Token diterima:', token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('✅ Token ter-decode:', decoded);

    
   const { data: user, error } = await supabase
  .from('users')
  .select('id, nama_lengkap, email')
  .eq('id', decoded.id)
  .single();

if (error || !user) {
  return h.response({ isLoggedIn: false }).code(401);
}

    console.log('User found:', user); // Debug 4
    return h.response({ 
      isLoggedIn: true,
      user 
    }).code(200);
  } catch (err) {
    console.error('Error in getCurrentUser:', err); // Debug 5
    return h.response({ 
      isLoggedIn: false,
      user: {
    id: user.id,
    name: user.nama_lengkap,
    email: user.email
  },
      error: err.message 
    }).code(401);
  }
};

const forgotPassword = async (request, h) => {
  const payload = request.payload;
  return AuthService.forgotPassword(payload, h);
};

const logout = async (_, h) => {
  return h
    .response({ message: 'Logout berhasil' })
    .unstate('token'); // Hapus cookie token
};

module.exports = { register, login, forgotPassword, logout, checkAuth, getCurrentUser };

