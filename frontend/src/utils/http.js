import * as config from "../configs/appconfig";

export function get(endpoint) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    headers: {
      token: localStorage.getItem("authToken"),
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error));
}

export function post(endpoint, body) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    method: "post",
    headers: {
      token: localStorage.getItem("authToken"),
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error));
}

export function put(endpoint, body) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    method: "put",
    headers: {
      token: localStorage.getItem("authToken"),
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error));
}

export function deleteEntry(endpoint, body) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    method: "delete",
    headers: {
      token: localStorage.getItem("authToken"),
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log(error));
}
