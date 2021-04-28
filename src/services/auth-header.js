import { useSelector } from 'react-redux';

export default function authHeader() {
  //const user = JSON.parse(localStorage.getItem("user"));
  const userToken = useSelector( state => state.auth.user.authenticationToken )

  if (userToken) {
    // For Spring Boot back-end
    return { Authorization: "Bearer " + userToken };

    // for Node.js Express back-end
    //return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
