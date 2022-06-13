import axios from "axios";

export function post(url: string, body: any = null) {
  return axios.post(url, {
    body,
  });
}

export function get(url: string) {
  return axios.get(url);
}
