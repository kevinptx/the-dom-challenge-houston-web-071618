// As a user, i should see the timer increment every second once the page has loaded
// As a user, i can manually increment and decrement the counter as i like
// As a user, i can like an individual number of the counter. I should see the appropriate number of likes associated with that particular number
// As a user I can pause the game, which should disable all buttons except the pause button, which should now show the text 'resume'
// As a user I can leave comments on my gameplay, such as "Wow, what a fun game this is"

//===== Variable declarations =====
const counter = document.getElementById("counter");
const minus = document.getElementById("-");
const add = document.getElementById("+");
const heart = document.getElementById("<3");
const pauseBtn = document.getElementById("pause");
const likes = document.querySelector(".likes");
const submitButton = document.getElementById("submit");
const form = document.getElementById("comment-form");
const comments = document.querySelector(".comments");
let seconds = 0;
let paused = false;
let likeHash = {};

//===== ADD EVENT LISTENERS =====
minus.addEventListener("click", decrementCounter);
add.addEventListener("click", incrementCounter);
pauseBtn.addEventListener("click", togglePause);
heart.addEventListener("click", addLike);
form.addEventListener("submit", e => e.preventDefault);
submitButton.addEventListener("click", e => addComment(e));

function decrementCounter() {
  seconds -= 1;
  counter.innerText = seconds;
}

function incrementCounter() {
  seconds += 1;
  counter.innerText = seconds;
}

function incrementSeconds() {
  if (!paused) {
    seconds += 1;
  }
  counter.innerText = seconds;
}

function togglePause() {
  paused = !paused;
  paused ? (pauseBtn.innerHTML = "resume") : (pauseBtn.innerHTML = "pause");
}

function addLike() {
  let likedNum = counter.innerText;
  if (likeHash[likedNum] != undefined) {
    likeHash[likedNum]++;
  } else {
    likeHash[likedNum] = 1;
  }
  likes.innerHTML = "";
  for (const likedNum in likeHash) {
    likes.innerHTML += `<li>${likedNum} has been liked ${
      likeHash[likedNum]
    } times</li>`;
  }
}

function addComment(e) {
  let commentText = document.getElementById("input").value;
  if (commentText !== "") {
    const ul = document.getElementById("list");
    ul.innerHTML += `
        <li>${commentText}</li>
      `;

    //alternate way:
    // let li = document.createElement("li");
    // li.append(document.createTextNode(commentText));
    // ul.append(li);

    e.preventDefault();
    form.reset();
  }
}

// SET ON PAGE LOAD
setInterval(incrementSeconds, 1000);

// const counter = document.getElementById("counter");
// const minus = document.getElementById("-");
// const plus = document.getElementById("+");
// const heart = document.getElementById("<3");
// const pause = document.getElementById("pause");
// const commentInput = document.getElementById("input");
// const submitButton = document.getElementById("submit");
// const commentList = document.getElementById("list");
// const likeList = document.querySelector(".likes");

// let isCounting = true;
// let timer;

// window.addEventListener("DOMContentLoaded", () => counterSetTimeout());
// pause.addEventListener("click", () => toggleTimer());
// plus.addEventListener("click", () => incrementTimer());
// minus.addEventListener("click", () => decrementTimer());
// heart.addEventListener("click", () => addLike());
// submitButton.addEventListener("click", e => addComment(e));

// function incrementTimer() {
//   return (counter.innerText = parseInt(counter.innerText) + 1);
//   // return counter.innerText = counter.innerText * 1 + 1;
// }

// function decrementTimer() {
//   return (counter.innerText = parseInt(counter.innerText) - 1);
//   // return counter.innerText = counter.innerText * 1 - 1;
// }

// function counterSetTimeout() {
//   if (isCounting) {
//     timer = setInterval(incrementTimer, 1000);
//   } else {
//     clearInterval(timer);
//   }
// }

// function toggleTimer() {
//   isCounting = !isCounting;
//   return counterSetTimeout();
// }

// const state = (function() {
//   const state = {
//     likes: {},
//     comments: []
//   };

//   const obj = {
//     addLike: function(num) {
//       state.likes.hasOwnProperty(num)
//         ? (state.likes[num] += 1)
//         : (state.likes[num] = 1);
//     },
//     addComment: function(comment) {
//       state.comments.push(comment);
//     },
//     getLikes: function() {
//       return state.likes;
//     },
//     getComments: function() {
//       return state.comments;
//     }
//   };

//   return obj;
// })();

// function addLike() {
//   let num = counter.innerText;
//   state.addLike(num);
//   displayLikes();
// }

// function addComment(e) {
//   e.preventDefault();
//   const comment = commentInput.value;
//   commentInput.value = "";
//   state.addComment(comment);
//   displayComments();
// }

// function displayComments() {
//   const comments = state.getComments();
//   let list = "";
//   comments.forEach(x => {
//     list += `<p>${x}</p>`;
//   });
//   commentList.innerHTML = list;
// }

// function displayLikes() {
//   while (likeList.firstChild) {
//     likeList.removeChild(likeList.firstChild);
//   }

//   const likes = state.getLikes();
//   for (var key in likes) {
//     const p = document.createElement("p");
//     p.innerText = `${key} has been liked ${likes[key]} times`;
//     likeList.appendChild(p);
//   }
// }
