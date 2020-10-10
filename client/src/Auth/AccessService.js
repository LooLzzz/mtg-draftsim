import axios from 'axios';

const API_URL = '/api/access/';

class UserService
{
    getAuthHeader()
    {
        const user = JSON.parse(localStorage.getItem('user'));
    
        let res = {}
        if (user && user.accessToken)
            res = {
                'accessToken': user.accessToken
            };
        
        return res;
    }

    isPublicAccess()
    {
        // '/api/access/all'
        return axios.get(API_URL + 'all')
    }

    isUserAccess()
    {
        // '/api/access/user'
        return axios.get(API_URL + 'user', { headers: this.getAuthHeader() })
    }

    /**
     * returns an object following: {isValid:bool, error:str}
     */
    async isValidUserToken()
    {
        const userData = JSON.parse(localStorage.getItem('user'))
        if (!userData)
            return false

        const {data} = await this.isUserAccess()
        return {
            isValid: !!(data && data.user),
            error: data.error ? data.error : '',
        }

        // if (data && data.user)
        //     return true
        //else
        // if (data && data.error)
        //     console.log('error:', data.error)
        // return false
    }
}

export default new UserService();