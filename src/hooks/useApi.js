import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalLoading } from '../store/slices/uiSlice';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const makeRequest = useCallback(async (url, options = {}, showGlobalLoading = false) => {
    try {
      setLoading(true);
      setError(null);

      if (showGlobalLoading) {
        dispatch(setGlobalLoading(true));
      }

      // Add authorization header if token exists
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
      if (showGlobalLoading) {
        dispatch(setGlobalLoading(false));
      }
    }
  }, [dispatch]);

  const get = useCallback((url, showGlobalLoading = false) => {
    return makeRequest(url, {}, showGlobalLoading);
  }, [makeRequest]);

  const post = useCallback((url, data, showGlobalLoading = false) => {
    return makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    }, showGlobalLoading);
  }, [makeRequest]);

  const put = useCallback((url, data, showGlobalLoading = false) => {
    return makeRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, showGlobalLoading);
  }, [makeRequest]);

  const del = useCallback((url, showGlobalLoading = false) => {
    return makeRequest(url, {
      method: 'DELETE',
    }, showGlobalLoading);
  }, [makeRequest]);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    makeRequest,
  };
};

export default useApi;
