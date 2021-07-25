const playerBoard = document.getElementById('player-board');
const dealerBoard = document.getElementById('bot-board');
const deck = newDeck();
const board = document.getElementById('board');
let playerSums = [];
let dealerSums = [];

let ds = document.getElementById('dealerscore');
let ps = document.getElementById('playerscore');
let s = document.getElementById('pecentscore');

const dealerScore = Number.parseInt(localStorage.getItem('dealerscore') || 0);
const playerScore = Number.parseInt(localStorage.getItem('playerscore') || 0);
console.log(playerScore / (dealerScore + playerScore))
ds.innerText = 'Dealer: ' + dealerScore;
ps.innerText = 'Player: ' + playerScore;

const percentScore = playerScore / (dealerScore + playerScore);
s.innerText = (percentScore * 100).toPrecision(4) + '%';
s.style.width = '55px'
s.style.backgroundColor = percentScore < .5 ? 'red' : 'green'


function dealCard(isDealer, replacesFaceDown = false) {
    const c = deck.pop();

    let sums = isDealer ? dealerSums : playerSums;
    if (sums.length === 0) sums[0] = 0;
    for (let i = 0; i < sums.length; i++) {
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

    if (c.number === 1) {
        let newSums = [];
        for (let i = 0; i < sums.length; i++) {
            newSums.push(sums[i] + 10);
        }

        for (let i = 0; i < newSums.length; i++) {
            sums.push(newSums[i]);
        }
    }

    const imgName = c.img;
    const card = document.createElement('div');
    card.setAttribute('class', 'col-2');

    const img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '200px';
    img.src = './JPEG/' + imgName;
    card.append(img);

    const row = isDealer ? dealerBoard : playerBoard;
    if (replacesFaceDown) {
        const faceDownCard = document.getElementById('face-down-card');
        dealerBoard.replaceChild(card, faceDownCard);
    } else {
        row.append(card);
    }
}


dealCard(false);
dealCard(false);

addFaceDownCard()
dealCard(true);

let stayed = false;

function playerScored() {
    if (!localStorage.getItem('playerscore')) localStorage.setItem("playerscore", 0);
    localStorage.setItem("playerscore", Number.parseInt(localStorage.getItem('playerscore')) + 1);
}

function dealerScored() {
    if (!localStorage.getItem('dealerscore')) localStorage.setItem("dealerscore", 0);
    localStorage.setItem("dealerscore", Number.parseInt(localStorage.getItem('dealerscore')) + 1);
}

function hit() {
    dealCard(false);
    const bust = checkBust()
    if (playerHas21) { hideHitStay(); caclulateDealersHand(); }
    if (bust) setTimeout(function () {
        alert('Player Busted: Dealer Wins'); dealerScored(); reset();
    }, 1000);
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
    dealCard(true, true);
}

function showSums() {
    const card = document.createElement('div');
    card.setAttribute('class', 'col-2');
    card.innerText = playerSums.toString();
    card.id = 'sums';
    playerBoard.append(card);
}
var playerHas21 = false;
function checkBust(isDealer) {
    let bust = true;
    const sums = isDealer ? dealerSums : playerSums;
    for (let i = 0; i < sums.length; i++) {
        if (sums[i] <= 21) bust = false;
        if (sums[i] === 21) playerHas21 = true;
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

function stay() {
    hideHitStay();
    replaceFaceDownCard();
    setTimeout(caclulateDealersHand, 1000);
}

let dealerStay = false;
let dealerBusted = true;

function caclulateDealersHand() {
    dealerBusted = true;
    for (let i = 0; i < dealerSums.length; i++) {
        if (dealerSums[i] <= 21) dealerBusted = false;
        if (dealerSums[i] >= 17 && dealerSums[i] <= 21) dealerStay = true;
    }

    if (dealerBusted) { alert('Dealer busted, player wins!'); playerScored(); reset() }


    if (dealerStay) {
        const a = bestSum(playerSums);
        const b = bestSum(dealerSums);

        if (a < b) {
            alert('Dealer Wins!'); dealerScored(); reset()
        } else if (a > b) {
            alert('Player Wins!'); playerScored(); reset()
        } else {
            alert('Push!'); reset()
        }
    } else if (!dealerBusted) {
        dealCard(true);
        setTimeout(caclulateDealersHand, 1000);
    }
}

function bestSum(sums) {
    sums = sums.filter((each) => each <= 21);
    sums.sort();
    sums.reverse();
    return sums[0];
}

function reset() {
    window.location.reload();
}