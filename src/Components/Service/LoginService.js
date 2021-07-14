import { BASE_URL } from "../../Constant";

class LoginService {
  login = async (email, password) => {
    console.log(email, password);

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
 
    };
    return await fetch(BASE_URL + "/api/auth/login", requestOptions);
  };
}

export default new LoginService();
