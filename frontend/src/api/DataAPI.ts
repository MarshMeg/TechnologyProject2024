import API from "./API";


export default class DataAPI extends API
{
  constructor() {
    super()
    this.url = this.url + "data/"
  }

  get_tests(page: number|null): {} {
    return this.request("get_tests/", "GET", (page == null) ? null: {"page": page})
  }

  get_test_data(test_id: number): { [key: string]: any }|null {
    let req = this.request(`get_test_data/${test_id}/`, "GET")

    if (typeof req != "object") return null

    return req
  }

  get_my_tests(): Array<object> {
    return this.request("get_my_tests/", "GET")['tests']
  }

  post_answers(answer: string, test_id: number): void {
    const params: object = {
      "answer": answer,
      "test_id": test_id
    }
    this.request("post_answers/", "POST", params)
  }

  check_answers(id: number): Array<object> {
    return this.request("check_answers/", "GET", {"test_id": id})["true_answers"]
  }

  get_my_test_data(testID: number): { [key: string]: any } {
    return this.request("get_my_test_data/", "GET", {"id": testID})['data']
  }

  post_my_test(data: object): void {
    this.request("post_my_test_data/", "POST", data)
  }

  new_test(title: string): void {
    this.request("new_test/", "POST", {"title": title})
  }

  del_test(title: string): void {
    this.request("del_test/", "POST", {"title": title})
  }
}