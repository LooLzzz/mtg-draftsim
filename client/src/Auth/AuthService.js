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
            .then( res => {
                if (res.data && res.data.accessToken)
                {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    return res.data
                }
                //else
                return res
            })
            .catch( err => {
                console.error('login error:', err.response)
                return err.response
            })
    }

    signup(username, password, password2)
    {
        return axios
            .post(`${API_URL}/signup`, {
                username,
                password,
                password2
            })
            .then( res => {
                if (res.data && res.data.accessToken)
                    return res.data
                return res
            })
            .catch( err => {
                console.error('signup error:', err.response)
                return err.response
            })
    }

    logout()
    {
        localStorage.removeItem('user')
        // localStorage.removeItem('collection')
    }

    async getCurrentUserData()
    {
        let isValid = await AccessService.isValidUserToken()
        if (isValid)
        {
            const userData = JSON.parse(localStorage.getItem('user'))
            return userData
        }
        //else
        localStorage.removeItem('user')
        return null
    }
}

export default new AuthService()