interface params {
  [key: string]: any
}

export default class API {
  public url: string;

  constructor() {
    this.url = localStorage.getItem("backend-url")
    let url_ = localStorage.getItem("backend-url-th")
    if (!this.url || url_ === "0") {
      if (!url_) localStorage.setItem("backend-url-th", "1")

      this.url = '/api/'
      localStorage.setItem("backend-url", this.url)
    } else {
      localStorage.setItem("backend-url-th", "0")
    }
  }

  params(
      params: params | null,
  ): string {
    if (params === null) return ''

    let param: string
    let out: string = '?'
    for (param in params) out += `${param}=${params[param]}&`

    return out
  }

  request(
    url: string,
    method: 'POST' | 'GET',
    params: params | null = null
  ): {}|string|number {
    // отправляю запрос к backend-у
    let req = new XMLHttpRequest()

    req.open(method, `${this.url}${url}${((method == 'POST') ? '': this.params(params))}`, false)
    req.setRequestHeader('X-CSRFToken', localStorage.getItem('csrftoken'))

    if (method == 'POST') {
      req.setRequestHeader("Content-Type", "application/json")
      req.send(JSON.stringify(params))
    } else {
      req.send()
    }

    // принимаю данные
    if (req.status >= 200 && req.status < 300 && method == 'GET') {
      try {
        return JSON.parse(req.response)
      } catch (e) {
        console.error(`request, not return data (data is null)`)
        return {}
      }
    }

    return req.status
  }
}