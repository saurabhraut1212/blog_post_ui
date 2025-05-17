import { getBaseUrl } from '../libs/baseUrl';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  author: string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
  authorName: string;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${getBaseUrl()}/blog/allBlogs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const result = await response.json();
  return result.data;
};

export const createBlog = async (data: CreateBlogPayload, token: string): Promise<Blog> => {
  const response = await fetch(`${getBaseUrl()}/blog/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to create blog');
  }
  return response.json();
};

export const deleteBlog = async (id: string, token: string): Promise<void> => {
  const response = await fetch(`${getBaseUrl()}/blog/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to delete blog');
  }
};

export const getBlogById = async (id: string): Promise<Blog> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const response = await fetch(`${getBaseUrl()}/blog/getBlogById/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to fetch blog');
  }

  const result = await response.json();
  return result.data;
};

export const updateBlog = async (
  id: string,
  data: CreateBlogPayload,
  token: string,
): Promise<Blog> => {
  const response = await fetch(`${getBaseUrl()}/blog/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Failed to update blog');
  }

  return response.json();
};
