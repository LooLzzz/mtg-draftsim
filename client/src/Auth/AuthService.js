import axios from "axios"

const API_URL = '/api/users/'

class AuthService
{
    logout() { return localStorage.removeItem('user')}
    getCurrentUser() { return JSON.parse(localStorage.getItem('user'))}

    login(username, password)
    {
        return axios
            .post(`${API_URL}/login`, {
                username,
                password
            })
            .then( (res) => {
                if (res.data.accessToken)
                    localStorage.setItem('user', JSON.stringify(res.data))
                return res.data
            })
            .catch( res => {
                // res = String(res).split(':')
                // res = res.reduce( (prev, curr, i) => {
                //     return i!==0 ? prev + curr : ''
                // })
                return Object(res)
            })
    }

    register(username, email, password)
    {
        return axios
            .post(`${API_URL}/register`, {
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