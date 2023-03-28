import Icred from "../../models/cred";
import axios from "axios"

const MY_SERVER = "http://127.0.0.1:8000/"

export function login(cred: Icred) {
  // console.log(cred)
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER + "login/",cred).then(res => resolve({ data: res.data }))
  );
}

export function register(reg : Icred) {
  // console.log(cred)
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER + "register/", reg).then(res => resolve({ data: res.data }))
  );
}

export function refresh(token: string) {
  // console.log(cred)
  return new Promise<{ data: any }>((resolve) =>
    axios.post(MY_SERVER + "login/refresh/",{refresh:token}).then(res => resolve({ data: res.data }))
  );
}