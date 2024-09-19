import axios from 'axios';
import useTokenStore from './mainPage/loginPage/TokenStore';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const payload = {
      username: username,
      password: password
    };
    const response = await axios.post("http://127.0.0.1:8000/rest_api/login/", payload);
    return response.data.token;
  } catch (error) {
    console.error('Invalid login to the service', error);
    return "example-token";
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

    console.log("Zalogowani użytkownicy:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error("Coś poszło nie tak", error);
  }
};

