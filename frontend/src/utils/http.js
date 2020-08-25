import * as config from "../configs/appconfig";

export function get(endpoint) {
  return fetch(`${config.BASE_URL}${endpoint}`, {
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdF9uYW1lIjoiQWRtaW4iLCJsYXN0X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNVZYa1V3a0ZiN3RpeVYyMXFacnNaLmJkOUpicm5NRlc2S0tkanZBR1VjYUpBMHgxdWwxMFciLCJyb2xlIjoxLCJpc19kZWxldGVkIjpmYWxzZSwidXNlcm5hbWUiOiJhZG1pbiIsImlkIjoxfQ.LkJlPWYtWa_1dqc2dolN8T05Bi0JHns7-lywPkIMfwo",
    },
  })
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
