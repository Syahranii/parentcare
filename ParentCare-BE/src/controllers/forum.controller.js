const jwt = require('jsonwebtoken')
const { getDB } = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const ForumService = require('../services/forum.service');

const TABLE_NAME = 'forum_posts';

const getAllPosts = async (request, h) => {
  try {
    const data = await ForumService.fetchAllPosts();
    return h.response(data).code(200);
  } catch (error) {
    return h.response({ message: 'Failed to fetch posts', error: error.message }).code(500);
  }
};


const getPostById = async (request, h) => {
  const { id } = request.params;
  const supabase = getDB();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return h.response({ message: 'Post not found', error }).code(404);
  }

  return h.response(data).code(200);
};

const createPost = async (req, h) => {
  try {
<<<<<<< HEAD
   const token = req.state.token;  // ambil dari cookie 'token'
if (!token) {
  return h.response({ message: 'Token tidak ditemukan di cookie' }).code(401);
}

    if (!token) {
      return h.response({ message: 'Token missing' }).code(401);
    }

    console.log("Received token:", token);

    // Verifikasi token dengan secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ganti user_id jadi id sesuai payload token
=======
    const token = req.state.token;  // ambil dari cookie 'token'
    if (!token) {
      return h.response({ message: 'Token tidak ditemukan di cookie' }).code(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> origin/master
    const user_id = decoded.id;
    if (!user_id) {
      return h.response({ message: 'user_id tidak ditemukan di token' }).code(401);
    }

    const { topic, content } = req.payload;

    // Validasi topic dan content
    if (!topic || topic.trim() === '') {
      return h.response({ message: 'Topic tidak boleh kosong!' }).code(400);
    }
    if (!content || content.trim() === '') {
      return h.response({ message: 'Content tidak boleh kosong!' }).code(400);
    }

    const supabase = getDB();
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('nama_lengkap')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return h.response({ message: 'User tidak ditemukan' }).code(404);
    }

    const data = await ForumService.addNewPost({
      nama_lengkap: user.nama_lengkap,
      content,
      topic,
      user_id,
    });

    return h.response({ message: 'Post created', data }).code(201);
  } catch (err) {
    console.error('createPost error:', err);
    return h.response({ message: 'Gagal membuat post', error: err.message }).code(500);
  }
};



const createAnswer = async (req, h) => {
  try {
    const token = req.state.token;
    if (!token) return h.response({ message: 'Token tidak ditemukan di cookie' }).code(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;
    if (!user_id) return h.response({ message: 'user_id tidak ditemukan di token' }).code(401);

    const { id: post_id } = req.params;
    const { answer } = req.payload;

    if (!answer || answer.trim() === '') {
      return h.response({ message: 'Jawaban tidak boleh kosong!' }).code(400);
    }

    const supabase = getDB();
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('nama_lengkap')
      .eq('id', user_id)
      .single();

    if (userError || !user) {
      return h.response({ message: 'User tidak ditemukan' }).code(404);
    }

    const data = await ForumService.addAnswerToPost({
      post_id,
      nama_lengkap: user.nama_lengkap,
      answer,
    });

    return h.response({ message: 'Answer added', data }).code(201);
  } catch (err) {
    console.error('createAnswer error:', err);
    return h.response({ message: 'Gagal menambahkan jawaban', error: err.message }).code(500);
  }
};



<<<<<<< HEAD
=======

>>>>>>> origin/master
module.exports = {
  getAllPosts,
  createPost,
  createAnswer
};

