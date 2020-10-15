import axios from "axios"
import AccessService from './AccessService'

const API_URL = '/api/collection/'

class CollectionService
{
    /**
     * @ROUTE /api/collection/get
     */
    async getCollectionData()
    {
        try
        {
            const {isValid, error} = await AccessService.isValidUserToken()
            if (!isValid)
                throw Error(JSON.stringify(error))

            const {username, accessToken} = JSON.parse(localStorage.getItem('user'))
            const collection = await axios
                .post(
                    API_URL + 'get',
                    {username},
                    {headers: {accessToken}},
                )
            
            localStorage.setItem('collection', JSON.stringify(collection.data))
            return collection.data
        } catch (err)
        {
            console.error('getCollectionData() error:', err)
        }
    }

    /**
     * Saves items to app.localStorage as a staging area.
     * Use commitItems() to commit the current staging.
     * @param items expected to be array of objects [{card1}, {card2}, ...]
     */
    stageItems(items)
    {
        let stage = {
            ...JSON.parse(localStorage.getItem('collectionStage')),
            ...items,
        }
        localStorage.setItem('collectionStage', JSON.stringify(stage))
    }
    
    /**
     * @ROUTE /api/collection/commit
     */
    commitItems()
    {
        //TODO this & server side
        // let items = JSON.parse(localStorage.getItem('collectionStage'))
    }
}

export default new CollectionService()