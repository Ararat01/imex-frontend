import axios from "axios";
import API_URL from "./config";

const checkAuth = () => {
  const token = window.localStorage.getItem("token");

  if (token !== null) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data) {
            resolve(true);
            window.localStorage.setItem("userId", res.data._id);
          } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("userId");
            resolve(false);
          }
        })
        .catch((err) => {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("userId");
          resolve(false);
          console.log(err);
        });
    });
  } else {
    return false;
  }
};
export default checkAuth;
