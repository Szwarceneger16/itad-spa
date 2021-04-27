export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authenticationToken) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + user.authenticationToken };

    // for Node.js Express back-end
    //return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
