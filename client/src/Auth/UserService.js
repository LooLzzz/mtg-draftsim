import axios from "axios"
import isEmpty from 'is-empty'
import AccessService from './AccessService'

const API_URL = '/api/users'

class UserService
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
        const userData = JSON.parse(localStorage.getItem('user'))
        if (isEmpty(userData))
            return false

        const {isValid, error} = await AccessService.isValidUserToken()
        if (isValid)
            return userData
        //else
        localStorage.removeItem('user')
        console.error('error while fetching user data:', error)
        return null
    }
}

export default new UserService()