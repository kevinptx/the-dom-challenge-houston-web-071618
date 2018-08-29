const counter = document.getElementById('counter');
const minus = document.getElementById('-');
const plus = document.getElementById('+');
const heart = document.getElementById('<3');
const pause = document.getElementById('pause');
const commentInput = document.getElementById('input');
const submitButton = document.getElementById('submit');
const commentList = document.getElementById('list');
const likeList = document.querySelector('.likes');


let isCounting = true;
let timer;

window.addEventListener('DOMContentLoaded', () => counterSetTimeout());
pause.addEventListener('click', () => toggleTimer());
plus.addEventListener('click', () => incrementTimer());
minus.addEventListener('click', () => decrementTimer());
heart.addEventListener('click', () => addLike());
submitButton.addEventListener('click', (e) => addComment(e));


function incrementTimer() {
    return counter.innerText = parseInt(counter.innerText) + 1;
    // return counter.innerText = counter.innerText * 1 + 1;
}

function decrementTimer() {
    return counter.innerText = parseInt(counter.innerText) - 1;
    // return counter.innerText = counter.innerText * 1 - 1;
}

function counterSetTimeout() {
    if (isCounting) {
        timer = setInterval(incrementTimer, 1000);
    } else {
        clearInterval(timer);
    }
}

function toggleTimer() {
    isCounting = !isCounting;
    return counterSetTimeout();
}

const state = (function () {
    const state = {
        likes: {},
        comments: []
    };

    const obj = {
        addLike: function (num) {
            state.likes.hasOwnProperty(num) ? state.likes[num] += 1 : state.likes[num] = 1;
        },
        addComment: function (comment) {
            state.comments.push(comment);
        },
        getLikes: function () {
            return state.likes;
        },
        getComments: function () {
            return state.comments
        }
    }

    return obj
})();

function addLike() {
    let num = counter.innerText;
    state.addLike(num);
    displayLikes();
}

function addComment(e) {
    e.preventDefault();
    const comment = commentInput.value;
    commentInput.value = '';
    state.addComment(comment);
    displayComments();
}

function displayComments() {
    const comments = state.getComments();
    let list;
    comments.forEach((x) => {
        list += `<p>${x}</p>`;
    });
    commentList.innerHTML = list;
}

function displayLikes() {
    while (likeList.firstChild) {
        likeList.removeChild(likeList.firstChild);
    }
    const likes = state.getLikes();
    for (var key in likes) {
        const p = document.createElement('p')
        p.innerText = `• ${key} has been liked ${likes[key]} times`
        likeList.appendChild(p);
    }
}