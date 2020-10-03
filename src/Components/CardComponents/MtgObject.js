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
        q: `e: ${setId} is:booster`
    });
    return (collectCards(fullList));
}

export default class MtgObject
{
    constructor()
    {
        this.setId = '';
        this.sortBy = 'color';
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

    generateSet(setId, numOfBoosters, sortBy, component)
    {
        this.setId = setId;
        getAllCardsFromSet(setId).then(fullList => {
            this.allCards.bulk = fullList;
            this.pool = this.generatePool(numOfBoosters);
            
            component.setState({
                cols: MtgObject.sortToColumns(component.state.mtgObj.pool, sortBy),
            });
        });
    }

    generateBooster()
    {
        let booster = [];
        let count = {
            common: 10,
            uncommon: 3,
            rare_mythic: 1,
            basic_land: 1,
        }

        //0.25 chance for foil
        if (Math.random() <= 0.25)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.bulk.length-1));
            let card = this.allCards.bulk[randIndex];
            card.foil = true;
            booster.push(card);

            if (card.type_line.toLowerCase().includes('land') && card.rarity === 'common') //common lands
                count.basic_land--;
            else
               count.common--;
        }
        
        //common
        for (let i = 0; i < count.common; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.common.length-1));
            let card = this.allCards.sorted.common[randIndex];
            card.foil = false;
            booster.push(card);
        }

        //uncommon
        for (let i = 0; i < count.uncommon; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.uncommon.length-1));
            let card = this.allCards.sorted.uncommon[randIndex];
            card.foil = false;
            booster.push(card);
        }

        //rare or mythic
        let rare_mythic = [...this.allCards.sorted.mythic, ...this.allCards.sorted.rare];
        for (let i = 0; i < count.rare_mythic; i++)
        {
            let randIndex = Math.floor(Math.random() * (rare_mythic.length-1));
            let card = rare_mythic[randIndex];
            card.foil = false;
            booster.push(card);
        }

        //basic land
        for (let i = 0; i < count.basic_land; i++)
        {
            let randIndex = Math.floor(Math.random() * (this.allCards.sorted.basic_land.length-1));
            let card = this.allCards.sorted.basic_land[randIndex];
            card.foil = false;
            booster.push(card);
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
    static sortToColumns(cards, sortBy)
    {
        let res = {};

        switch (sortBy)
        {
            default: //default is sort by color
            case 'color':
                res = MtgObject.sortToColumnsByColor(cards);
                break;

            case 'rarity':
                res = MtgObject.sortToColumnsByRarity(cards);
                break;
            
            case 'cmc':
                res = MtgObject.sortToColumnsByCmc(cards);
                break;
        }
        //res is an object right now        

        //convert 'res' from object to array
        let obj = res;
        res = [];
        Object.entries(obj).forEach( ([key, value]) => {
            if (key === 'lands' && sortBy === 'cmc')
                res.splice(0, 0, value);
            else
                res.push(value)
        })

        return res;
    }

    /**
     * @returns returns an object containing arrays of different kinds
     */
    static sortToColumnsByRarity(cards)
    {
        let res = {
            mythic: [],
            rare: [],
            uncommon: [],
            common: [],
            basic_land: [],
        };

        cards.forEach(card =>
        {
            if (card.type_line.toLowerCase().includes('land') && card.rarity === 'common') //common lands
                res.basic_land.push(card);
            else
                res[card.rarity].push(card);
        });
        
        res.basic_land.sort( (a, b) => {
            let aSize = 0;
            let bSize = 0;
            
            a.color_identity.forEach(value => (
                aSize += value.charCodeAt(0)
            ));
            b.color_identity.forEach(value => (
                bSize += value.charCodeAt(0)
            ));

            return aSize - bSize;
        });

        //col sorting
        //main sort: color
        //sub sort: cmc
        Object.entries(res).forEach( ([key, value]) => {
            if (key === 'basic_land')
                value.sort( (a, b) => {
                    let aColorVal = 0;
                    let bColorVal = 0;
                    
                    a.color_identity.forEach(value => (
                        aColorVal += value.charCodeAt(0)
                    ));
                    b.color_identity.forEach(value => (
                        bColorVal += value.charCodeAt(0)
                    ));

                    return aColorVal - bColorVal;
                })
            else //not basic land
                value.sort( (a, b) => {
                    let aColorVal = 0;
                    let bColorVal = 0;
                    
                    a.colors.forEach(value => (
                        aColorVal += value.charCodeAt(0)
                    ));
                    b.colors.forEach(value => (
                        bColorVal += value.charCodeAt(0)
                    ));

                    return (aColorVal - bColorVal) === 0 ? (a.cmc - b.cmc) : (aColorVal - bColorVal);
                })
        })

        return res;
    }

    /**
     * @returns returns an object containing arrays of different kinds
     */
    static sortToColumnsByColor(cards)
    {
        let res = {
            R: [],
            G: [],
            B: [],
            U: [],
            W: [],
            multiColored: [],
            colorless: [],
            basic_land: [],
        };

        cards.forEach(card =>
        {
            if (card.type_line.toLowerCase().includes('land') && card.rarity === 'common') //common lands
                res.basic_land.push(card);
            else if (card.colors.length === 0) //colorless
                res.colorless.push(card);
            else if (card.colors.length > 1) //multi colored
                res.multiColored.push(card)
            else //if (card.color.length === 1) //mono colored
                res[card.colors[0]].push(card);
        });
        
        res.basic_land.sort( (a, b) => {
            let aSize = 0;
            let bSize = 0;
            
            a.color_identity.forEach(value => (
                aSize += value.charCodeAt(0)
            ));
            b.color_identity.forEach(value => (
                bSize += value.charCodeAt(0)
            ));

            return aSize - bSize;
        });

        //sort by cmc
        Object.entries(res).forEach( ([key, value]) =>
            value.sort( (a, b) => (
                a.cmc - b.cmc
            )))

        return res;
    }

    static sortToColumnsByCmc(cards)
    {
        let res = {
            'lands': [],
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            '7+': []
        };

        cards.forEach(card =>
        {
            if (card.type_line.toLowerCase().includes('land'))
                res['lands'].push(card);
            else if (card.cmc < 7)
                res[card.cmc].push(card);
            else
                res['7+'].push(card);
        });
        
        //col sorting
        //main sort: color
        //sub sort: cmc
        Object.entries(res).forEach( ([key, value]) => {
            value.sort( (a, b) => {
                let aColorVal = 0;
                let bColorVal = 0;
                
                a.colors.forEach(value => (
                    aColorVal += value.charCodeAt(0)
                ));
                b.colors.forEach(value => (
                    bColorVal += value.charCodeAt(0)
                ));

                return aColorVal - bColorVal;
            })
        })

        return res;
    }

    /**
     * sorts col by color and then by cmc
     * @param col column to sort
     */
    static sortDeck(col)
    {
        let temp = MtgObject.sortToColumns(col, 'color');

        col = [];
        temp.forEach(item => {
            col.push(...item);
        });

        return col;
    }
}