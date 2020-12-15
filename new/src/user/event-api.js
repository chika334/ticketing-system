
const createEvent = (formData, credentials) => {
    return fetch(`${process.env.REACT_APP_API}/event`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get all events
const getEvent = () => {
    return fetch(`${process.env.REACT_APP_API}/event`, {
        method: 'GET',
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

// Event by ID
const readEvent = (params, credentials) => {
    return fetch(`${process.env.REACT_APP_API}/event/` + params.eventId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export { createEvent, getEvent, readEvent }
