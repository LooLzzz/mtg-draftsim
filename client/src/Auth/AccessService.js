import axios from 'axios';

const API_URL = '/api/access/';

class AccessService
{
    getAuthHeaders()
    {
        const user = JSON.parse(localStorage.getItem('user'));
    
        let headers = {}
        if (user && user.accessToken)
            headers.accessToken = user.accessToken
        
        return headers;
    }

    /**
     * @ROUTE /api/access/all
     */
    isPublicAccess()
    {
        return axios.get(API_URL + 'all')
    }

    /**
     * @ROUTE /api/access/user
     */
    isUserAccess()
    {
        return axios.get(API_URL + 'user', { headers: this.getAuthHeaders() })
    }

    /**
     * returns an object with: {isValid:bool, error:str}
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

export default new AccessService();