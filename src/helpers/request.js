const domain = process.env.NEXT_PUBLIC_DOMAIN

export const serverUrl = `${domain}/api`

export const setError = (err) => {
    return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const setHeader = (token) => {
  return {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
}