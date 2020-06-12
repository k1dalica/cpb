export const loggedIn = () => {
  let pw = localStorage.getItem('token')
  return pw ? login(pw) : false
}

export function login (pass) {
  // if (pass === 'c8837b23ff8aaa8a2dde915473ce0991') {
  if (pass === '8dd8398e3d3528f48e834972e4c78f0a') {
    localStorage.setItem('token', pass)
    return true
  }
  return false
}
