// BlogList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './Card';
import { Button } from './Button';
import { isAuthenticated } from '../utils/auth';

export function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:8080/blogs', {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          });
        console.log(res.data[0]);
        
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      {isAuthenticated() && (
        <Link to="/create">
          <Button className="mb-4">Create New Blog</Button>
        </Link>
      )}
      {blogs.map((blog) => (
        <Card key={blog.id} className="mb-4">
          <CardHeader>
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-gray-500">By {blog.author}</p>
          </CardHeader>
          <CardContent>
            <p>{blog.content.substring(0, 100)}...</p>
            <Link to={`/blogs/${blog.id}`}>
              <Button className="mt-2">Read More</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
