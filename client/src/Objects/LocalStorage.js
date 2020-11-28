import axios from 'axios'
import Promise from 'bluebird'

Promise.config({cancellation: true})

class LocalStorage
{
    static load(name)
    {
        return localStorage.getItem(name)
    }
    
    static saveAs(obj, name)
    {
        return localStorage.setItem(name, obj)
    }
}

export default new LocalStorage()