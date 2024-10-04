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

export const wantPlay = async (username: string, token: string, competitorUsername: string) => {
  try {
    const payload = {
      user: username,
      competitor: competitorUsername
    };
    const response = await axios.post("http://127.0.0.1:8000/rest_api/play/", payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed', error);
    return null;
  }
};

export const checkIfSomeoneWantsToPlay = async (token: string) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/rest_api/check/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.data.key === -1) {
      console.log("Nikt nie chce z Tobą grać.");
    } else {
      console.log(`Ktoś chce z Tobą grać! Klucz gry: ${response.data.room}`);
    }

    return response.data;
  } catch (error) {
    console.error('Błąd przy sprawdzaniu', error);
    return null;
  }
};


export const deleteGame = async (username1: string, username2: string, token: string) => {
  try {
    const payload = {
      username1: username1,
      username2: username2,
    };
    const response = await axios.delete("http://127.0.0.1:8000/rest_api/delete_game/", {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: payload,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Błąd przy usuwaniu gry', error);
    return null;
  }
};
