export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("hfhfhhfhreturn token!!!")
  if (user && user.accessToken) {
    console.log("return token!!!")
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
