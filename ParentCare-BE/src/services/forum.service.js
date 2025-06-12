const { getDB } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const fetchAllPosts = async () => {
  const supabase = getDB();
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*, forum_answers(*)')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

const addNewPost = async ({ nama_lengkap, content, topic, user_id }) => {
  const supabase = getDB();

  const { data, error } = await supabase
    .from('forum_posts')
    .insert([{ 
      // kalau kolom nama_lengkap tidak ada, jangan pakai
      content,
      topic,
      user_id,
      username: nama_lengkap ,
    }]);

  if (error) throw error;
  return data;
};


const addAnswerToPost = async ({ post_id, nama_lengkap, answer }) => {
  const supabase = getDB();
  const { data, error } = await supabase
    .from('forum_answers')
    .insert([
      {
        id: uuidv4(),
        post_id,
        answer,
        username: nama_lengkap ,
      }
    ])
    .select();

  if (error) throw new Error(error.message);
  return data;
};

module.exports = {
  fetchAllPosts,
  addNewPost,
  addAnswerToPost
};
