function getToken() {
    const token = localStorage.getItem('token')

    return token
}

function saveToken(token) {
    localStorage.setItem('token', token)
}