import ScryfallClient from 'scryfall-client'
const scryfall = new ScryfallClient()

async function getAllCardsFromSet(setId)
{
    function collectCards(list, fullList)
    {
        fullList = fullList ? fullList : [];
        fullList.push.apply(fullList, list);

        if (!list.has_more)
            return fullList;

        return list.next().then((newList) => (
            collectCards(newList, fullList)
        ));
    }

    const fullList = await scryfall.get('cards/search', {
        q: 
            'e:' + [setId] +
            ' is:booster'
    });
    return (collectCards(fullList));
}

export default class MtgObject
{
    constructor()
    {
        this.setId = '';
        this.allCards = {
            bulk: [],
            sorted: { //for easier booster logic
                basic_land: [],
                common: [],
                uncommon: [],
                rare: [],
                mythic: [],
            },
        };
        this.deck = [];
        this.pool = [];
    }

    generateSet(setId, numOfBoosters, component)
    {
        this.setId = setId;
        getAllCardsFromSet(setId).then(fullList => {
            this.allCards.bulk = fullList;
            this.pool = this.generatePool(numOfBoosters);
            
            component.setState({
                cols: MtgObject.sortCardsToColumns(component.state.mtgObj.pool, 'color'),
            });
        });
    }

    generateBooster()
    {
        let count = {
            common: 10,
            uncommon: 3,
            rare_mythic: 1,
            basic_land: 1,
        }

        let booster = [];
        
        //common
        for (let i = 0; i < count.common; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.common.length-1));
            booster.push(this.allCards.sorted.common[randIndex]);
        }

        //uncommon
        for (let i = 0; i < count.uncommon; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.uncommon.length-1));
            booster.push(this.allCards.sorted.uncommon[randIndex]);
        }

        //rare or mythic
        let rare_mythic = [...this.allCards.sorted.mythic, ...this.allCards.sorted.rare];
        for (let i = 0; i < count.rare_mythic; i++)
        {
            let randIndex = Math.floor(Math.random() * (rare_mythic.length-1));
            booster.push(rare_mythic[randIndex]);
        }

        //basic land
        for (let i = 0; i < count.basic_land; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.basic_land.length-1));
            booster.push(this.allCards.sorted.basic_land[randIndex]);
        }

        return booster;
    }

    generatePool(numOfBoosters)
    {
        //create {this.allCards.byRarity} for easier booster logic
        this.allCards.bulk.forEach(card => {
            if (card.type_line.toLowerCase().includes('land') && card.rarity === 'common') //basic land
                this.allCards.sorted.basic_land.push(card);
            else
                this.allCards.sorted[card.rarity].push(card);
        });
        
        //create actual boosters
        let boosters = [];
        for (let i = 0; i < numOfBoosters; i++)
            boosters.push(...this.generateBooster());

        return boosters;
    }

    removeCardFromPool(cardToRemove)
    {
        //remove the first occurrence of 'cardToRemove' 

        let flag = false; //did already removed
        this.pool = this.pool.filter( card => {
            if (!flag)
            {
                if (card.id === cardToRemove.id)
                {
                    flag = true;
                    return false; //remove the card
                }
                return true; //keep the card
            }
            else
                return true //keep all the rest
                
        })
    }

    /**
     * @param cards cards to sort, array of objects
     * @param sortBy accepts 'color', 'type', 'rarity'
     * @returns [[col1], [col2], ...] where 'col' is array of JSON cards
     */
    static sortCardsToColumns(cards, sortBy)
    {
        let obj = {};

        switch (sortBy)
        {
            default: //default is sort by color
            case 'color':
                obj = {
                R: [],
                G: [],
                B: [],
                U: [],
                W: [],
                multiColored: [],
                colorless: [],
                land: [],
            };

            cards.forEach(card =>
            {
                if (card.type_line.toLowerCase().includes('land') && card.rarity === 'common') //common lands
                    obj.land.push(card);
                else if (card.colors.length === 0) //colorless
                    obj.colorless.push(card);
                else if (card.colors.length > 1) //multi colored
                    obj.multiColored.push(card)
                else //mono colored
                    obj[card.colors[0]].push(card);
            });
            obj.land.sort( (a,b) => {
                let aSize = 0;
                let bSize = 0;
                
                a.color_identity.forEach(value => aSize+=value.charCodeAt(0));
                b.color_identity.forEach(value => bSize+=value.charCodeAt(0));

                return aSize - bSize;
            });
            break;
        }
        
        //sort by cmc
        Object.entries(obj).forEach(
            ([key, value]) =>
                value.sort( (a,b) => (
                    a.cmc - b.cmc)))

        //object to array
        let res = [];
        Object.entries(obj).forEach(
            ([key, value]) => res.push(value))

        return res;
    }

    /**
     * sorts col by color and then by cmc
     * @param col column to sort
     */
    static sortCol(col)
    {
        let temp = MtgObject.sortCardsToColumns(col, 'color');

        col = [];
        temp.forEach(item => {
            col.push(...item);
        });

        return col;
    }
}