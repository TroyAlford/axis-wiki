const params = {
  credentials: 'include',
  headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json' }),
  mode: 'cors',
}

export const POST = (url, payload) => fetch(url, {
  ...params, method: 'POST', body: JSON.stringify(payload),
})
export const GET = url => fetch(url, { ...params, method: 'GET' })
export const DELETE = url => fetch(url, { ...params, method: 'DELETE' })
