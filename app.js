const playerBoard = document.getElementById('player-board');
const dealerBoard = document.getElementById('bot-board');
const deck = newDeck();
const board = document.getElementById('board');
let sums = [];

for (let i = 0; i < 2; i++) {
    const c = deck.pop();

    if (sums.length === 0) sums[0] = 0;
    for (let i = 0; i < sums.length;i++) {
        switch (c.number) {
            case 11:
                sums[i] += 10;
                break;
            case 12:
                sums[i] += 10;
                break;
            case 13:
                sums[i] += 10;
                break;
            case 1:
                sums[i] += 1;
                break;
            default:
                sums[i] += c.number;
                break;
        }
    }

    if(c.number === 1) {
        let newSums = [];
        for (let i = 0; i < sums.length;i++) {
            newSums.push(sums[i]+10);
        }

        for(let i = 0; i < newSums.length; i++) {
            sums.push(newSums[i]);
        }
    }

    const imgName = c.img;
    console.log(imgName)
    const card = document.createElement('div');
    // g.className='tclose'; g.v=0;
    card.setAttribute('class', 'col-2');

    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/' + imgName;
    // card.innerText = i;

    card.appendChild(img);
    playerBoard.appendChild(card);
}
showSums()
addFaceDownCard()
for (let i = 0; i < 1; i++) {
    const imgName = deck.pop().img;
    console.log(imgName)
    const card = document.createElement('div');
    // g.className='tclose'; g.v=0;
    card.setAttribute('class', 'col-2');

    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/' + imgName;
    // card.innerText = i;

    card.appendChild(img);
    dealerBoard.appendChild(card);
}

let stayed = false;

function hit() {
    const c = deck.pop()

    if (sums.length === 0) sums[0] = 0;
    for (let i = 0; i < sums.length;i++) {
        switch (c.number) {
            case 11:
                sums[i] += 10;
                break;
            case 12:
                sums[i] += 10;
                break;
            case 13:
                sums[i] += 10;
                break;
            case 1:
                sums[i] += 1;
                break;
            default:
                sums[i] += c.number;
                break;
        }
    }

    if(c.number === 1) {
        let newSums = [];
        for (let i = 0; i < sums.length;i++) {
            newSums.push(sums[i]+10);
        }

        for(let i = 0; i < newSums.length; i++) {
            sums.push(newSums[i]);
        }
    }

    const imgName = c.img;
    console.log(imgName)
    const card = document.createElement('div');
    // g.className='tclose'; g.v=0;
    card.setAttribute('class', 'col-2');

    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/' + imgName;
    // card.innerText = i;

    card.appendChild(img);
    playerBoard.appendChild(card);
    const bust = checkBust()
    showSums()
    console.log(bust)
    if(bust) setTimeout(function() { alert('Player Busted: Dealer Wins')}, 1000);
}

function addFaceDownCard() {
    const card = document.createElement('div');
    card.setAttribute('class', 'col-2');
    card.id = 'face-down-card';
    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/Red_back.jpg';
    card.appendChild(img);
    dealerBoard.append(card);
}

function replaceFaceDownCard() {
    const imgName = deck.pop().img;
    console.log(imgName)
    const card = document.createElement('div');
    // g.className='tclose'; g.v=0;
    card.setAttribute('class', 'col-2');

    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/' + imgName;
    // card.innerText = i;

    card.appendChild(img);
    console.log(dealerBoard.childNodes)
    const faceDownCard = document.getElementById('face-down-card');
    dealerBoard.replaceChild(card, faceDownCard);
    // dealerBoard.prepend(card);
}

function showSums() {
    const card = document.createElement('div');
    card.setAttribute('class', 'col-2');
    card.innerText = sums.toString();
    card.id = 'sums';
    playerBoard.append(card);
}
var playerHas21 = false;
function checkBust() {
    let bust = true;
    for(let i = 0; i < sums.length; i++) {
        if(sums[i] <= 21) bust = false;
        if(sums[i] === 21) playerHas21 = true;
    }
    return bust;
}

function hideHitStay() {
    const hit = document.getElementById('hit');
    const stay = document.getElementById('stay');
    hit.style.display = 'none';
    stay.style.display = 'none';
}

function showHitStay() {
    const hit = document.getElementById('hit');
    const stay = document.getElementById('stay');
    hit.style.display = 'inline';
    stay.style.display = 'inline';
}

function resetBoard() {
    playerBoard.innerHTML = '';
    dealerBoard.innerHTML = '';
}

// resetBoard();

// addFirstSum()
// while (sums.filter((each) => each < 21).length > 0) {
//     setTimeout(() => console.log(500), 500)
// }

// hideHitStay();

// function addFirstSum() {

// }

setTimeout(replaceFaceDownCard, 3000)
// setTimeout(hideHitStay, 2000)
// setTimeout(showHitStay, 4000);