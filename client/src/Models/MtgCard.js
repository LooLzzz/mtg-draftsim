import ScryfallClient from 'scryfall-client'
const scryfall = new ScryfallClient()

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

    static getCardByName(name)
    {
        scryfall.getCard(name, 'exactName').then(
            (cardData) => ( new MtgCard(cardData) )
        ).catch( (e) => {
            console.log('error in \'MtgCard.getCardByName()\':', e)
            return null
        })
    }
}

export default MtgCard