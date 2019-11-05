let container = document.querySelector('.cont');
let heading = document.getElementsByTagName('h1')[0];
let modal = document.getElementsByClassName('modal')[0]
let btnOk = document.getElementsByClassName('btn-success')[0]
let btnNo = document.getElementsByClassName('btn-danger')[0]
let btnContinue = document.getElementsByClassName('btn-primary')[0]

let modalBody = document.getElementsByClassName('modal-body')[0]
let modalText = document.getElementById('text')

modal.style.display = "none"
heading.innerHTML = "LEVEL : 1"

createGrid(4, icons0, "140px", "140px");

function level2() {
  createGrid(16, icons4, "280px", "280px");
  cont3.style.height = "280px"
  heading.innerHTML = "LEVEL : 2"
}

function level3() {
  createGrid(100, icons2, "700px", "700px");
  cont3.style.height = "700px"
  heading.innerHTML = "LEVEL : 3"
}

let gameEnd = 0;
let clicked = [];
let clicked2 = [];
let counter = 0;

let boxes = document.querySelectorAll('.box');
for (var i = 0; i < boxes.length; i++) {
  const element = boxes[i];
  element.addEventListener('click', flip);
}

//Flipping the icons
function flip() {
  let back = this.getElementsByClassName('back')[0];
  clicked.push(this);
  clicked2.push(this);
  counter++;

  let front = this.children[1];

  front.style.transform = "perspective(900px) rotateY(180deg)";
  back.style.transform = "perspective(900px) rotateY(0)";

  if (counter == 2) {
    stopClicks();
    check();
  }
  // console.log(counter);
}

//Checking flipped sides and game progress
function check() {
  back1 = clicked[0].children[0];
  back2 = clicked[1].children[0];
  front1 = clicked[0].children[1];
  front2 = clicked[1].children[1];
  if (back1.innerHTML == back2.innerHTML) {
    counter = 0;
    clicked.length = 0;
    addClicks();
    gameEnd++;

    if (gameEnd == 2) {
      clearInterval(loop1)
      setTimeout(function() {
        btnNo.style.display = "none"
        btnOk.style.display = "none"

        modalText.innerHTML = "First Level Completed"
        modalBody.style.color = "green"
        modal.style.display = "block"

        btnContinue.style.display = "block"
        btnContinue.style.margin = "0 auto"

        btnContinue.addEventListener('click', function() {
          clearInterval(loop1)

          modal.style.display = "none"
          cont2.style.height = "0px"
          time = 0;
          loop2 = setInterval(timer2, 1000)
          level2();
          let boxes = document.querySelectorAll('.box');
          for (var i = 0; i < boxes.length; i++) {
            const element = boxes[i];
            element.addEventListener('click', flip);
          }
        })
      }, 700)
    } else if (gameEnd == 10) {
      clearInterval(loop2)
      setTimeout(function() {
        btnNo.style.display = "none"
        btnOk.style.display = "none"

        modalText.innerHTML = "Second Level Completed"
        modalBody.style.color = "green"
        modal.style.display = "block"
        btnContinue.style.display = "block"
        btnContinue.addEventListener('click', function() {
          clearInterval(loop2)
          modal.style.display = "none"
          cont2.style.height = "0px"
          time = 0;
          loop3 = setInterval(timer3, 1000)
          level3();
          let boxes = document.querySelectorAll('.box');
          for (var i = 0; i < boxes.length; i++) {
            const element = boxes[i];
            element.addEventListener('click', flip);
          }
        })

      }, 700)
    } else if (gameEnd == 11) {
      clearInterval(loop3)
      setTimeout(function() {
        btnNo.style.display = "none"
        btnOk.style.display = "none"
        btnContinue.style.display = "none"

        modalText.innerHTML = "Congratulations, <br>Game Finished!"
        modalBody.style.color = "green"
        modal.style.display = "block"

      }, 700)
    }
  } else {

    setTimeout(function() {
      front1.style.transform = "perspective(900px) rotateY(0deg)";
      back1.style.transform = "perspective(900px) rotateY(-180deg)";
      front2.style.transform = "perspective(900px) rotateY(0deg)";
      back2.style.transform = "perspective(900px) rotateY(-180deg)";
      counter = 0;
      clicked.length = 0;
      addClicks();

    }, 700)
  }
}

function createGrid(lvl, iconsLvl, width, height) {

  container.style.width = width;
  container.style.height = height;

  let text = "";
  for (var i = 0; i < lvl; i++) {
    let rand = Math.floor(Math.random() * iconsLvl.length);
    text += "<div class ='box'>";
    text += "<div class = 'back'>" + iconsLvl[rand] + "</div>";
    text += "<div class = 'front'></div>";
    text += "</div>";

    iconsLvl.splice(rand, 1);
  }

  container.innerHTML = text;
}

function stopClicks() {
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener('click', flip);
  }
}

function addClicks() {
  for (var i = 0; i < boxes.length; i++) {
    const element = boxes[i];
    element.addEventListener('click', flip);
  }
}


let cont3 = document.getElementsByClassName('cont3')[0];
let cont2 = document.getElementsByClassName('cont2')[0];
cont3.style.height = "140px"
let time = 0;

let loop1 = setInterval(timer1, 1000)

//timer for level1
function timer1() {

  cont2.style.height = time + 28 + "px";
  time = time + 28;
  if (cont2.style.height == '140px' && gameEnd < 2) {
    clearInterval(loop1)
    modal.style.display = "block"
    btnContinue.style.display = "none"
    btnOk.addEventListener('click', function() {
      modal.style.display = "none"
      startOver()
      gameEnd = 0;
      clearInterval(loop1)

      time = 0;
      cont2.style.height = "0px"
      loop1 = setInterval(timer1, 1000)

      let boxes = document.querySelectorAll('.box');
      for (var i = 0; i < boxes.length; i++) {
        const element = boxes[i];
        element.addEventListener('click', flip);

      }
    })

    btnNo.addEventListener('click', function() {
      modal.style.display = "none"
      modalBody.style.color = "red"
      modalBody.innerHTML = "Game Over"
      modal.style.display = "block"
      time = 0;
      cont2.style.height = "140px"
      clearInterval(loop1)
      stopClicks()

    })
  }
}

//timer for level2
function timer2() {
  cont2.style.height = time + 4 + "px";
  time = time + 4;

  if (cont2.style.height == '280px' && gameEnd < 10) {
    clearInterval(loop2)
    btnContinue.style.display = "none"
    modal.style.display = "block"
    modalText.style.color = "black"
    modalText.innerHTML = "Start Over?"
    btnOk.style.display = "inline-block"
    btnNo.style.display = "inline-block"
    modalText.style.textAlign = "center"
    btnOk.addEventListener('click', function() {
      modal.style.display = "none"
      startOver()
      gameEnd = 2;
      clearInterval(loop2)
      clearInterval(loop1)
      time = 0;
      cont2.style.height = "0px"
      loop2 = setInterval(timer2, 1000)

      let boxes = document.querySelectorAll('.box');
      for (var i = 0; i < boxes.length; i++) {
        const element = boxes[i];
        element.addEventListener('click', flip);

      }
    })

    btnNo.addEventListener('click', function() {
      modal.style.display = "none"
      modalBody.style.color = "red"
      modalBody.innerHTML = "Game Over"
      modal.style.display = "block"
      time = 0;
      cont2.style.height = "280px"
      clearInterval(loop2)
      stopClicks()

    })
  }
}

//timer for level3
function timer3() {
  cont2.style.height = time + 4 + "px";
  time = time + 4;

  if (cont2.style.height == '704px' && gameEnd < 60) {
    clearInterval(loop3)
    btnContinue.style.display = "none"
    modal.style.display = "block"
    modalText.style.color = "black"
    modalText.innerHTML = "Start Over?"
    btnOk.style.display = "inline-block"
    btnNo.style.display = "inline-block"
    modalText.style.textAlign = "center"
    btnOk.addEventListener('click', function() {
      clearInterval(loop2)
      clearInterval(loop1)
      modal.style.display = "none"
      startOver()
      gameEnd = 10;
      clearInterval(loop3)
      time = 0;
      cont2.style.height = "0px"
      loop3 = setInterval(timer3, 1000)

      let boxes = document.querySelectorAll('.box');
      for (var i = 0; i < boxes.length; i++) {
        const element = boxes[i];
        element.addEventListener('click', flip);

      }
    })

    btnNo.addEventListener('click', function() {
      modal.style.display = "none"
      modalBody.style.color = "red"
      modalBody.innerHTML = "Game Over"
      modal.style.display = "block"
      time = 0;
      cont2.style.height = "704px"
      clearInterval(loop3)
      stopClicks()

    })
  }
}

function startOver() {
  counter = 0;
  for (var k = 0; k < clicked2.length; k++) {

    clicked2[k].children[0].style.transform = "perspective(900px) rotateY(-180deg)";
    clicked2[k].children[1].style.transform = "perspective(900px) rotateY(0)";
  }
  clicked2.length = 0;
  clicked.length = 0;
}
