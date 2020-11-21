// import ScryfallClient from 'scryfall-client'
import axios from 'axios'
import Promise from 'bluebird'

Promise.config({cancellation: true})
// const scryfall = new ScryfallClient()

/**
 * An object to represent a single mtg card.
 * All info is stored in {this.data}
 */
class MtgCard
{
    constructor(data)
    {
        this.data = {...data}
    }

    static autocomplete(query)
    {
        return Promise.resolve(
            axios.get('https://api.scryfall.com/cards/autocomplete?q=' + query)
                .then( res => res.data.data )
                .catch( err => {
                    console.error("error in 'MtgCard.autocomplete()':", err)
                    return []
                })
        )
    }

    static async getCardSets(name)
    {
        // https://api.scryfall.com/cards/search?q="sol ring"&unique=prints
        try
        {
            let cards = await Promise.resolve(
                axios.get(`https://api.scryfall.com/cards/search?unique=prints&q="${name}"`)
                    .then( res => res.data.data )
                    .catch( err => {
                        console.error("error in 'MtgCard.getCardSets()':", err)
                        return []
                    })
            )
            // cards = cards.map( cardData => new MtgCard(cardData) )
            return cards
        } catch (err)
        {
            console.error("error in 'MtgCard.getCardSets()':", err)
            return null
        }
    }

    async getCardSets()
    {
        // https://api.scryfall.com/cards/search?q="sol ring"&unique=prints
        try
        {
            let cards = await Promise.resolve(
                axios.get(`https://api.scryfall.com/cards/search?unique=prints&q="${this.data.name}"`)
                    .then( res => res.data )
                    .catch( err => {
                        console.error("error in 'MtgCard.getCardSets()':", err)
                        return []
                    })
            )
            // cards = cards.map( cardData => new MtgCard(cardData) )
            return cards
        } catch (err)
        {
            console.error("error in 'MtgCard.getCardSets()':", err)
            return null
        }
    }

    static async getCard(name, set)
    {
        try
        {
            set = set ? `;set=${set}` : ''
            let cardData = await Promise.resolve(
                axios.get('https://api.scryfall.com/cards/named?exact=' + name + set)
                    .then( res => res.data )
                    .catch( err => {
                        console.error("error in 'MtgCard.getCardByName()':", err)
                        return []
                    })
            )
            return new MtgCard(cardData)
        } catch (err)
        {
            console.error("error in 'MtgCard.getCardByName()':", err)
            return null
        }
    }
}

export default MtgCard