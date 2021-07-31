import axios from "axios";

const API_URL = "http://localhost:3002/users/"; //UserMngmnt Component SignIn, SignUp

//UserMngmnt Component SignIn, SignUp
class AuthService {
  login(email, password) {
    console.log("Try to login");
    return axios
        .post(API_URL + "login", {
          email,
          password
        })
        .then(response => {
          console.log("Tooken Response MUST-Before IF");
          console.log(JSON.stringify(response));
          if (response.data.access_token) {
            console.log("Tooken Response MUST");
            console.log(JSON.stringify(response.data.access_token));
            console.log("DEBUUUG")
            console.log(JSON.stringify(response.data))
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "register", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
    ;
  }
}
export default new AuthService();
