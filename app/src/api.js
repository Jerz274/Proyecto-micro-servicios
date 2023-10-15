import { token, URL } from './utils'

export const api_call = async (endpoint) => {
  try {
    const resp = await fetch(`${endpoint}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })

    const data = await resp.json();
    if (resp.status == 200) {
      return data
    } else {
      console.error("Error during fetch")
    }
  } catch (e) {
    console.error(e)
  }
}

export const db_get = async (endpoint) => {
  try {
    const resp = await fetch(`${URL}${endpoint}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })

    const data = await resp.json();
    if (resp.status == 200) {
      return data
    } else {
      console.error("Error during fetch")
    }
  } catch (e) {
    console.error(e)
  }
}

export const db_post = async (endpoint, body) => {
  try {
    const resp = await fetch(`${URL}${endpoint}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json();
    if (resp.status == 200) {
      return data
    } else {
      console.error("Error during fetch")
    }
  } catch (e) {
    console.error(e)
  }
}

export const db_patch = async (endpoint, body) => {
  try {
    const resp = await fetch(`${URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json();
    if (resp.status == 200) {
      return data
    } else {
      console.error("Error during fetch")
    }
  } catch (e) {
    console.error(e)
  }
}