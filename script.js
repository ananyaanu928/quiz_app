let question = [
  {
    num: 1,
    title: "What is default display of div ?",
    option: ["flex", "block", "inline", "both b & c"],
    ans: "d"
  },
  {
    num: 2,
    title: "Why were cookies designed ?",
    option: ["server-side programming", "client-side programming", "both a & b", "none"],
    ans: "a"
  },
  {
    num: 3,
    title: "Identify incorrect HTML tag :",
    option: ["div tag", "list tag", "input tag", "select tag"],
    ans: "b"
  },
  {
    num: 4,
    title: "When is the body tag used ?",
    option: ["after title tag", "before style tag", "after head tag", "after form tag"],
    ans: "c"
  },
  {
    num: 5,
    title: "Which of the following tags doesn't require a closing tag ?",
    option: ["br tag", "hr tag", "both a & b", "none"],
    ans: "c"
  }
];

let abc = ["a", "b", "c", "d"];
let sum = 0;
let interval;
let opt;
let startBox = document.querySelector(".begin");
let mainBox = document.querySelector(".mainBox");
let queBox = document.querySelector(".questions");
let nextBtn = document.getElementById("next-btn");
let finishBtn = document.getElementById("finish-btn");
let timerDiv = document.querySelector(".timer");
let resultBox = document.querySelector(".result");
let index = 0;
const eachTime = 15;
let timeLimit = question.length * eachTime;
const fixedTime = timeLimit;
function quizBegins(begin) {
  startBox.classList.add("hiddenPart");
  mainBox.classList.remove("hiddenPart");
  interval = setInterval(timer, 1000);
}

for (i = 0; i < question.length; i++) {
  queBox.innerHTML +=
    `<div class='section' id='${question[i].num}'>` +
    `<p class='title'>${question[i].title}</p>` +
    `</div>`;
  let section = queBox.querySelectorAll(".section");
  for (k = 0; k < 4; k++) {
    section[
      i
    ].innerHTML += `<div id='${abc[k]}'>(${abc[k]}) ${question[i].option[k]}</div>`;
  }
}
section = queBox.querySelectorAll(".section");
section.forEach((section1) => {
  opt = section1.querySelectorAll("div");
  let input = document.createElement("input");
  input.hidden = true;
  input.readOnly = true;
  section1.appendChild(input);
  opt.forEach((opt1) => {
    opt1.onclick = (e) => {
      section1.querySelectorAll("div").forEach((optR) => {
        optR.classList.remove("selected");
      });
      opt1.classList.add("selected");
      input.value = e.target.id;
    };
  });
});

function increament() {
  index++;
  if (index < question.length) {
    queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
  }
  if (index == question.length - 1) {
    nextBtn.classList.add("hiddenPart");
    finishBtn.classList.remove("hiddenPart");
  }
}
nextBtn.onclick = () => {
  increament();
};

finishBtn.onclick = () => {
  clearInterval(interval);
  index = 0;
  mainBox.classList.add("hiddenPart");
  resultBox.classList.remove("hiddenPart");
  for (j = 0; j < section.length; j++) {
    if (section[j].querySelector("input").value == question[j].ans) {
      sum++;
      section[j].querySelector(".selected").innerHTML +=
        "<i class='fa fa-check ricon'></i>";
    } else if (section[j].querySelector(".selected")) {
      section[j].querySelector(".selected").classList.add("wrong");
      section[j].querySelector(".selected").innerHTML +=
        "<i class='fa fa-times ricon'></i>";
    }
  }
  resultBox.querySelector("#numberGot").innerHTML = sum;
  resultBox.querySelector("#OutOf").innerHTML = question.length;
};
function answers() {
  sum = 0;
  index = 0;
  timeLimit = fixedTime;
  clearInterval(interval);
  interval = setInterval(timer, 1000);

  mainBox.classList.remove("hiddenPart");
  resultBox.classList.add("hiddenPart");
  nextBtn.classList.remove("hiddenPart");
  finishBtn.classList.add("hiddenPart");
  queBox.style.transform = `translateX(0px)`;
  queBox.style.pointerEvents = "initial";
  queBox.querySelectorAll("div").forEach((opt2) => {
    opt2.classList.remove("selected", "correct", "wrong");
  });
  queBox.querySelectorAll(".ricon").forEach((ricon) => {
    ricon.remove();
  });
  queBox.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });
}
function showSolutions() {
  index = 0;
  sum = 0;
  mainBox.classList.remove("hiddenPart");
  resultBox.classList.add("hiddenPart");
  nextBtn.classList.remove("hiddenPart");
  finishBtn.classList.remove("hiddenPart");
  queBox.style.transform = `translateX(0px)`;
  for (m = 0; m < question.length; m++) {
    section[m].querySelector(`#${question[m].ans}`).classList.add("correct");
  }
  queBox.style.pointerEvents = "none";
}
let min = (timeLimit / 60).toString().split(".")[0];
let sec = timeLimit % 60;
if (min < 10) min = "0" + min;
if (sec < 10) sec = "0" + sec;
timerDiv.innerHTML = min + " : " + sec;
function timer() {
  timeLimit--;
  min = (timeLimit / 60).toString().split(".")[0];
  sec = timeLimit % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  if (timeLimit == 0) {
    clearInterval(interval);
    nextBtn.classList.add("hiddenPart");
    finishBtn.classList.remove("hiddenPart");
    queBox.style.pointerEvents = "none";
  }
  timerDiv.innerHTML = min + " : " + sec;
}
document.onkeydown = (e) => {
  e.preventDefault();
  if (e.keyCode == 13 && index + 1 < question.length) {
    increament();
  }
};
window.onresize = () => {
  queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
};
window.oncontextmenu = (e) => {
  e.preventDefault();
};
