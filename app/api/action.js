import { useAuth } from '../context/authContext';

export const submitFormAction = async (actionType, data) => {
  const endpoint = actionType === 'register' ? '/api/register' : '/api/login';
  console.log('endpoint', endpoint);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log('response', response);

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || 'Failed to submit form');
  }

  const result = await response.json();
  if (result.token) {
    const { login } = useAuth();
    login(result.token);
  }
  return result;
};

export const logout = () => {
  const { logout } = useAuth();
  logout();
};