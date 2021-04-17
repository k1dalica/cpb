export const loggedIn = () => {
  let pw = localStorage.getItem('token')
  return pw ? login(pw) : false
}

export function login (pass) {
  // if (pass === 'c8837b23ff8aaa8a2dde915473ce0991') {
  if (pass === '9b9ef3de7e4f5fd0392b6b2b0ea14030') {
    localStorage.setItem('token', pass)
    return true
  }
  return false
}
