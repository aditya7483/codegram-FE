import axios from "axios";


export const isValidEmail = (email) => {
  var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email.match(validRegex)) {
    return false
  }
  else return true
}

export const authenticateUser = (authToken) => {
  axios.defaults.headers.common['auth-token'] = authToken;
  axios.get(`https://codegram-be.vercel.app/api/auth/userInfo`)
    .then((res) => { return res.data.username })
    .catch((err) => { return { err: "Error in authenticating" } })
}