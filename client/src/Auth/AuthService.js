import axios from "axios"
import AccessService from './AccessService'

const API_URL = '/api/users'

class AuthService
{
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
                    // localStorage.setItem('collection', JSON.stringify(res.data.collection))
                    return res.data
                }
                return null
            })
            .catch( err => {
                console.error(err)
                return null
            } )
    }

    signup(username, password, password2)
    {
        return axios
            .post(`${API_URL}/signup`, {
                username,
                password,
                password2
            })
            .then( (res) => {
                return res
            })
            .catch( (err) => {
                console.error('signup error:', err)
                return null
            })
    }

    logout()
    {
        localStorage.removeItem('user')
        // localStorage.removeItem('collection')
    }

    getCurrentUserData()
    {
        if (AccessService.isValidUserToken)
            return JSON.parse(localStorage.getItem('user'))
        //else
        localStorage.removeItem('user')
        return null
    }
}

export default new AuthService()