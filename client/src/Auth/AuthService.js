import axios from "axios"

const API_URL = '/api/users'

class AuthService
{
    logout() { return localStorage.clear() }
    getCurrentUser() { return JSON.parse(localStorage.getItem('user'))}

    login(username, password)
    {
        return axios
            .post(`${API_URL}/login`, {
                username,
                password
            })
            .then( (res) => {
                if (res.data.user.accessToken)
                {
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('collection', JSON.stringify(res.data.collection))
                    return res.data
                }
                return null
            })
            .catch( err => {
                console.error(err)
                return null
            } )
    }

    signup(username, email, password)
    {
        return axios
            .post(`${API_URL}/signup`, {
                username,
                email,
                password
            })
            .then( (res) => {
                return res
            })
    }
}

export default new AuthService()