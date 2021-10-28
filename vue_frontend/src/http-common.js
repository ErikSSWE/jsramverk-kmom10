import axios from "axios";

let url = 'https://jsramverk-editor-ersr20.azurewebsites.net/api'

if (process.env.NODE_ENV === 'test') {
  url = "http://localhost:8080/api"
}

let user = JSON.parse(localStorage.getItem('user'));

let accessToken = "";

if (user && user.accessToken) {
  accessToken = user.accessToken;
}

export default axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
    "x-access-token": accessToken
  }
});
