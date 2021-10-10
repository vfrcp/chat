function getOptions(body) {
  const options = {
    method: "POST",
    credentials: "include",
  }
  if (localStorage.getItem("token")) {
    options.headers = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json;charset=utf-8",
    }
  }else{
    options.headers = {
      "Content-Type": "application/json;charset=utf-8",
    }
  }
  if(body){
    options.body = JSON.stringify(body)
  }
  return options;
}

export async function fetchWrap(url, body) {
  const response = await fetch(`${global.serverLink}/${url}`, getOptions(body))
  // клонирование запроса чтобы можно было прочитать тело второй раз, нужно чтобы обновить токен при его просрочке
  let responseBody = response.clone()
  responseBody = await responseBody.json()
  if(responseBody.changeTokenA){
    localStorage.setItem("token", responseBody.changeTokenA)
  }
  return response
}