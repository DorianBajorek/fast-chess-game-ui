import axios from 'axios';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const payload = {
      username: username,
      password: password
    };
    const response = await axios.post("http://127.0.0.1:8000/rest_api/login/", payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Invalid login to the service', error);
    return null;
  }
};

export const registerUser = async (email: string, username: string, password: string) => {
  try {
    const payload = {
      email: email,
      username: username,
      password: password
    };
    const response = await axios.post("http://127.0.0.1:8000/rest_api/signup/", payload);
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    return null;
  }
};

export const showActiveUsers = async (token: string) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/rest_api/list_logged_in_users/",
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response
  } catch (error) {
    console.error("Coś poszło nie tak", error);
  }
};

