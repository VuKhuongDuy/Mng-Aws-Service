import axios from "axios";
import * as cookie from "./cookie";
import { Glo_MyLocale } from "./lang/locale";
// let axiosGet = async function(api) {
// };

let get = function(api) {
  const data = axios
    .get(api, {
      headers: {
        Authorization: cookie.getTokenFromCookie(),
        Lang: Glo_MyLocale
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

let post = function(api, body) {
  const data = axios
    .post(api, body, {
      headers: {
        Authorization: cookie.getTokenFromCookie(),
        Lang: Glo_MyLocale
        // accept: "application/json",
        // "accept-language": "en-US",
        // "content-type": "application/x-www-form-urlencoded"
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

let deleteAxios = function(api) {
  const data = axios
    .delete(api, {
      headers: {
        Authorization: cookie.getTokenFromCookie(),
        Lang: Glo_MyLocale
      }
    })
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

let putAxios = function(api) {
  const data = axios
    .put(
      api,
      {},
      {
        headers: {
          Authorization: cookie.getTokenFromCookie(),
          Lang: Glo_MyLocale
        }
      }
    )
    .then(result => {
      return result.data;
    })
    .catch(() => {});

  return data;
};

export { get, post, deleteAxios, putAxios };
