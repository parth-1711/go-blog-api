// BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './Card';
import { Button } from './Button';
import { Textarea } from './Textarea';
import { getToken, isAuthenticated } from '../utils/auth';

export function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/blogs/${id}`,{
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setBlog(res.data);
        setComments(res.data.comments);
      } catch (err) {
        console.error('Failed to fetch blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(
        `http://localhost:8080/blogs/${id}/comments`,
        { content: comment,author:localStorage.getItem('username') },
        {
          headers: {
            Authorization: `${getToken()}`,
          },
        }
      );
      setComments([...comments, { content: comment }]);
      setComment('');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p className="text-gray-500">By {blog.author}</p>
        </CardHeader>
        <CardContent>
          <p>{blog.content}</p>
        </CardContent>
      </Card>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Comments</h2>
        {comments?.map((c, index) => (
          <Card key={index} className="mt-2">
            <CardContent>{c.content}</CardContent>
          </Card>
        ))}
      </div>
      {isAuthenticated() && (
        <form onSubmit={handleAddComment} className="mt-4">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <Button type="submit">Post Comment</Button>
        </form>
      )}
    </div>
  );
}
