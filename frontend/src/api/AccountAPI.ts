import API from "./API";


export default class AccountAPI extends API {
  constructor() {
    super()
    this.url = this.url + "auth/"
  }

  status() {
    return this.request("", "POST")
  }

  login(login: string, password: string) {
    let params: {[key: string]: any}
    if ("@" in Array(login)) {
      params = {"email": login, "password": password}
    } else {
      params = {"username": login, "password": password}
    }

    return this.request("login/", "POST", params)
  }

  logout() {
    this.request("logout/", "POST")
  }

  register(login: string, password: string): void {
    this.request("reg/", "POST", {'username': login, 'password1': password, 'password2': password})
  }
}