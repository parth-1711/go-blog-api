// BlogCreate.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { getToken } from '../utils/auth';

export function BlogCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      await axios.post(
        'http://localhost:8080/blogs',
        { title, content, author:localStorage.getItem('username') },
        {
          headers: {
            Authorization: `${getToken()}`,
          },
        }
      );
      navigate('/');
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  return (
    <form onSubmit={handleCreateBlog} className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
      />
      <Button type="submit">Create Blog</Button>
    </form>
  );
}
