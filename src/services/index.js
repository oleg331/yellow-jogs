export const config = {
  apiUrl: "https://jogtracker.herokuapp.com/api/v1"
};

export const userService = {
  login,
  logout,
  getJogs,
  addJog,
  editJog
};

function login() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uuid: "hello" })
  };

  return fetch(`${config.apiUrl}/auth/uuidLogin`, requestOptions)
    .then(handleResponse)
    .then(response => {
      let user = { access_token: response.access_token };
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getJogs() {
  let user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`
  };

  return fetch(`${config.apiUrl}/data/sync`, { headers }).then(handleResponse);
}

function addJog(jog) {
  let user = JSON.parse(localStorage.getItem("user"));

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`
  };

  return fetch(`${config.apiUrl}/data/jog`, {
    headers: headers,
    body: JSON.stringify(jog),
    method: "POST"
  })
    .then(handleResponse)
    .then(response => {
      return response;
    });
}

function editJog(jog) {
  let user = JSON.parse(localStorage.getItem("user"));

  let body = Object.keys(jog)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(jog[key]);
    })
    .join("&");

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${user.access_token}`,
    "Content-Type": "application/x-www-form-urlencoded"
  };

  return fetch(`${config.apiUrl}/data/jog`, {
    headers: headers,
    body: body,
    method: "PUT"
  })
    .then(handleResponse)
    .then(response => {
      localStorage.setItem("user", JSON.stringify(user));

      return response;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data.response;
  });
}
