const signin = (user) => {
  return fetch(`${process.env.REACT_APP_API}/auth/signin/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const signout = () => {
    return fetch(`${process.env.REACT_APP_API}/auth/signout`, {
        method: 'GET',
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export { signin, signout }
