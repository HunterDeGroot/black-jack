class Card {
    constructor(img, number, suit) {
        this.img = img;
        this.suit = suit;
        this.number = number;
    }
    suit;
    number;
    img;
}


const newDeck = function () {
    let deck = [];
    for (let i = 0; i < 4; i++) {
        let suit, jpgName;
        switch (i) {
            case 0:
                suit = 'C';
                break;
            case 1:
                suit = 'D';
                break;
            case 2:
                suit = 'S';
                break;
            case 3:
                suit = 'H';
                break;
        }
        for (let x = 1; x < 14; x++) {
            let cardName;
            switch (x) {
                case 1:
                    cardName = 'A';
                    break;
                case 11:
                    cardName = 'J';
                    break;
                case 12:
                    cardName = 'Q';
                    break;
                case 13:
                    cardName = 'K';
                    break;
                default:
                    cardName = x + '';
                    break;
            }
            jpgName = cardName + suit + '.jpg';
            const card = new Card(jpgName, x, suit);
            deck.push(card);
        }
    }
    deck.sort(function () {
        return Math.random() - .5;
    });
    return deck;
}
