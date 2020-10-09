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
                'x-access-token': user.accessToken
            };
        
        return res;
    }

    getPublicContent()
    {
        return axios.get(API_URL + 'all');
    }

    getUserContent()
    {
        return axios.get(API_URL + 'user', { headers: this.getAuthHeader() });
    }

    isValidUserToken()
    {
        return this.getUserContent()
            .then(res => true)
            .catch(res => false)
    }
}

export default new UserService();