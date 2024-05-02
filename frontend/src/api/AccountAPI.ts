import API from "./API";


export default class AccountAPI extends API {
  constructor() {
    super()
    this.url = this.url + "auth/"
  }

  status(): number {
    return this.request("", "POST")
  }

  login(login: string, password: string): number {
    return this.request("login/", "POST", {"username": login, "password": password})
  }

  logout() {
    this.request("logout/", "POST")
  }

  register(login: string, password: string): void {
    this.request("reg/", "POST", {'username': login, 'password1': password, 'password2': password})
  }
}