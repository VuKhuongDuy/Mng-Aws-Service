function getUserNameFromCookie() {
  const name = "username";

  let username = "";
  var cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    if (cookie.indexOf(name) >= 0) {
      let arr = cookie.split("=");

      username = arr[1];
    }
  });

  return username;
}

function getTokenFromCookie() {
  const name = "token";

  let id = "";
  var cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    if (cookie.indexOf(name) > 0) {
      let arr = cookie.split("=");

      id = arr[1];
    }
  });

  return id;
}

export { getUserNameFromCookie, getTokenFromCookie };
