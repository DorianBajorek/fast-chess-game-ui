import axios from 'axios';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const payload = {
      username: username,
      password: password
    };
    const response = await axios.post("http://51.20.7.166:8000/rest_api/login", payload);
    return response.data;
  } catch (error) {
    console.error('Invalid login to the service', error);
    return "example-token"
  }
};