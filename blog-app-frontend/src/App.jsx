// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link,createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BlogList } from './components/BlogList';
import { BlogCreate } from './components/BlogCreate';
import { BlogDetail } from './components/BlogDetail';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { removeToken, isAuthenticated } from './utils/auth';

function App() {
  // let router=createBrowserRouter([

  //   {
  //     path:'/',
  //     element:<BlogList/>
  //   }
  // ])
  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/" className="mr-4">Home</Link>
        {isAuthenticated() ? (
          <>
            <Link to="/create" className="mr-4">Create Blog</Link>
            <button onClick={removeToken}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={
          <ProtectedRoute>
            <BlogCreate />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    // <RouterProvider router={router} /> 
  );
}

export default App;
