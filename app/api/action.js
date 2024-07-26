import { useAuth } from '../context/authContext';

export const submitFormAction = async (actionType, data) => {
  const endpoint = actionType === 'register' ? 'https://grupo5.devcorezulia.lat/cardcraft-backend/public/register.php' : 'https://grupo5.devcorezulia.lat/cardcraft-backend/public/login.php';
  console.log('Submitting form to endpoint:', endpoint);
  console.log('Form data:', data);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      const result = await response.json();
      console.error('Error response:', result);
      throw new Error(result.message || 'Failed to submit form');
    }

    const result = await response.json();
    console.log('Success response:', result);

    if (result.token) {
      const { login } = useAuth();
      login(result.token);
    }
    return result;
  } catch (error) {
    console.error('Error during form submission:', error);
    throw error;
  }
};

export const logout = () => {
  const { logout } = useAuth();
  logout();
};