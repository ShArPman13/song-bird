import mix from './clevershuffle';
import showHeader from './draw_header';
import showFooter from './draw_footer';
import showWinPopUp from './win_popup';
import showResultPopUp from './result-popup';
import createMusic from './audio';
import './styles/normalize.scss';
import './styles/styles.scss';
import { drawAllSquares, drawSquare } from './draw_squares';
import { draw3AllSquares } from './draw_3x3_square';
import mix3 from './mix3';

document.body.append(showHeader());

const main = document.createElement('main');
main.classList.add('main');
document.body.append(main);

document.body.append(showFooter());
document.body.append(showWinPopUp());
document.body.append(showResultPopUp());
const popUp = document.querySelector('.pop-up');
const popUpResult = document.querySelector('.pop-up-result');

const audio = document.querySelector('.volume');
audio.addEventListener('click', () => {
  audio.classList.toggle('mute');
});

const canvasField = document.createElement('canvas');
canvasField.classList.add('canvas');
if (window.screen.width > 1400) {
  canvasField.width = 600;
  canvasField.height = 600;
} else if (window.screen.width > 600 && window.screen.width < 1400) {
  canvasField.width = 500;
  canvasField.height = 500;
} else {
  canvasField.width = 300;
  canvasField.height = 300;
}
canvasField.innerText = 'Please use modern browser! =)';
main.append(canvasField);

const ctx = canvasField.getContext('2d');

const arrTrue15 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
const arrTrue3 = [1, 2, 3, 4, 5, 6, 7, 8, 0];

let rateTable = [];
if (!localStorage.getItem('winners')) {
  localStorage.setItem('winners', JSON.stringify(rateTable));
}

let arr15 = mix(1000);

let clickSquare;
let clickTime;
let moves = 0;
const blockTime = document.querySelector('.times-raw__time');

function whichSquare(offsetX) {
  let square;
  if (offsetX < (((canvasField.width - 30) / 4) + 6)) {
    square = 1;
  } if (offsetX >= (((canvasField.width - 30) / 4) + 6)
  && offsetX < ((canvasField.width - 30) / 4) * 2 + 12) {
    square = 2;
  } if (offsetX >= ((canvasField.width - 30) / 4) * 2 + 12
  && offsetX < ((canvasField.width - 30) / 4) * 3 + 18) {
    square = 3;
  } if (offsetX >= ((canvasField.width - 30) / 4) * 3 + 18) {
    square = 4;
  }
  return square;
}

function takeCoordForSquare(pos) {
  let x;
  let y;
  const xy = [];
  switch (pos) {
    case 1:
      x = ((canvasField.width - 30) / 4) + 6;
      y = 0;
      xy.push(x); xy.push(y); break;
    case 2:
      x = ((canvasField.width - 30) / 4) * 2 + 12;
      y = 0;
      xy.push(x); xy.push(y); break;
    case 3:
      x = ((canvasField.width - 30) / 4) * 3 + 18;
      y = 0;
      xy.push(x); xy.push(y); break;
    case 4:
      x = 0;
      y = (((canvasField.width - 30) / 4) + 6);
      xy.push(x); xy.push(y); break;
    case 5:
      x = ((canvasField.width - 30) / 4) + 6;
      y = ((canvasField.width - 30) / 4) + 6;
      xy.push(x); xy.push(y); break;
    case 6:
      x = ((canvasField.width - 30) / 4) * 2 + 12;
      y = ((canvasField.width - 30) / 4) + 6;
      xy.push(x); xy.push(y); break;
    case 7:
      x = ((canvasField.width - 30) / 4) * 3 + 18;
      y = (((canvasField.width - 30) / 4) + 6);
      xy.push(x); xy.push(y); break;
    case 8:
      x = 0;
      y = ((canvasField.width - 30) / 4) * 2 + 12;
      xy.push(x); xy.push(y); break;
    case 9:
      x = (((canvasField.width - 30) / 4) + 6);
      y = ((canvasField.width - 30) / 4) * 2 + 12;
      xy.push(x); xy.push(y); break;
    case 10:
      x = ((canvasField.width - 30) / 4) * 2 + 12;
      y = ((canvasField.width - 30) / 4) * 2 + 12;
      xy.push(x); xy.push(y); break;
    case 11:
      x = ((canvasField.width - 30) / 4) * 3 + 18;
      y = ((canvasField.width - 30) / 4) * 2 + 12;
      xy.push(x); xy.push(y); break;
    case 12:
      x = 0;
      y = ((canvasField.width - 30) / 4) * 3 + 18;
      xy.push(x); xy.push(y); break;
    case 13:
      x = (((canvasField.width - 30) / 4) + 6);
      y = ((canvasField.width - 30) / 4) * 3 + 18;
      xy.push(x); xy.push(y); break;
    case 14:
      x = ((canvasField.width - 30) / 4) * 2 + 12;
      y = ((canvasField.width - 30) / 4) * 3 + 18;
      xy.push(x); xy.push(y); break;
    case 15:
      x = ((canvasField.width - 30) / 4) * 3 + 18;
      y = ((canvasField.width - 30) / 4) * 3 + 18;
      xy.push(x); xy.push(y); break;
    case 0:
      x = 0; y = 0;
      xy.push(x); xy.push(y); break;
    default: break;
  }
  return xy;
}

arr15.forEach((el, i) => drawAllSquares(i, el));
//  --------------------------------------------------------------------------Drag & Drop-----------
const BB = canvasField.getBoundingClientRect();
const dragX = BB.left;
const dragY = BB.top;
let dragOk = false;
let startDragX;
let startDragY;
let rects = [];
let timeout;
// let isDragging;

canvasField.addEventListener('mousedown', (e) => {
  e.preventDefault();
  e.stopPropagation();
  clickTime = new Date();
  const mx = Math.floor(e.clientX - dragX);
  const my = Math.floor(e.clientY - dragY);

  dragOk = false;
  for (let i = 0; i < arr15.length; i += 1) {
    rects.push({
      isDragging: false,
      num: arr15[i],
      xCoord: takeCoordForSquare(i)[0] + 6,
      yCoord: takeCoordForSquare(i)[1] + 6,
      widthRect: (canvasField.width - 30) / 4,
    });
  }
  for (let i = 0; i < rects.length; i += 1) {
    const r = rects[i];
    if (mx > r.xCoord && mx < r.xCoord + r.widthRect
      && my > r.yCoord && my < r.yCoord + r.widthRect) {
      dragOk = true;
      r.isDragging = true;
    }
  }
  startDragX = mx;
  startDragY = my;

  let clickPos;
  if (e.offsetY < (((canvasField.width - 30) / 4) + 6)) {
    const square = whichSquare(e.offsetX);
    switch (square) {
      case 1: clickPos = 0; break;
      case 2: clickPos = 1; break;
      case 3: clickPos = 2; break;
      default: clickPos = 3;
    }
  }
  if (e.offsetY >= (((canvasField.width - 30) / 4) + 6)
  && e.offsetY < ((canvasField.width - 30) / 4) * 2 + 12) {
    const square = whichSquare(e.offsetX);
    switch (square) {
      case 1: clickPos = 4; break;
      case 2: clickPos = 5; break;
      case 3: clickPos = 6; break;
      default: clickPos = 7;
    }
  }
  if ((e.offsetY >= ((canvasField.width - 30) / 4) * 2 + 12
  && e.offsetY < ((canvasField.width - 30) / 4) * 3 + 18)) {
    const square = whichSquare(e.offsetX);
    switch (square) {
      case 1: clickPos = 8; break;
      case 2: clickPos = 9; break;
      case 3: clickPos = 10; break;
      default: clickPos = 11;
    }
  }
  if (e.offsetY > ((canvasField.width - 30) / 4) * 3 + 18) {
    const square = whichSquare(e.offsetX);
    switch (square) {
      case 1: clickPos = 12; break;
      case 2: clickPos = 13; break;
      case 3: clickPos = 14; break;
      default: clickPos = 15;
    }
  }
  clickSquare = clickPos;
});

canvasField.addEventListener('mouseup', (e) => {
  e.preventDefault();
  e.stopPropagation();
  dragOk = false;
  for (let i = 0; i < rects.length; i += 1) {
    rects[i].isDragging = false;
  }

  ctx.clearRect(0, 0, canvasField.width, canvasField.height);
  arr15.forEach((el, i) => drawAllSquares(i, el));

  if (rects[clickSquare - 4]) { // ----------------------------up
    if (startDragY < rects[clickSquare - 4].yCoord + rects[clickSquare - 4].widthRect
      && startDragY > rects[clickSquare - 4].yCoord
      && startDragX < rects[clickSquare - 4].xCoord + rects[clickSquare - 4].widthRect * 1.5
      && startDragX > rects[clickSquare - 4].xCoord - rects[clickSquare - 4].widthRect / 2) {
      if (arr15[clickSquare - 4] === 0) {
        arr15[clickSquare - 4] = arr15[clickSquare];
        arr15[clickSquare] = 0;
        if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      }
    }
  }
  if (rects[clickSquare + 4]) { // ----------------------------down
    if (startDragY < rects[clickSquare + 4].yCoord + rects[clickSquare + 4].widthRect
      && startDragY > rects[clickSquare + 4].yCoord
      && startDragX < rects[clickSquare + 4].xCoord + rects[clickSquare + 4].widthRect * 1.5
      && startDragX > rects[clickSquare + 4].xCoord - rects[clickSquare + 4].widthRect / 2) {
      if (arr15[clickSquare + 4] === 0) {
        arr15[clickSquare + 4] = arr15[clickSquare];
        arr15[clickSquare] = 0;
        if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      }
    }
  }
  if (rects[clickSquare - 1]) { // ----------------------------left
    if (startDragX > rects[clickSquare - 1].xCoord - rects[clickSquare - 1].widthRect
      && startDragX < rects[clickSquare - 1].xCoord + rects[clickSquare - 1].widthRect
      && startDragY < rects[clickSquare - 1].yCoord + rects[clickSquare - 1].widthRect * 1.5
      && startDragY > rects[clickSquare - 1].yCoord - rects[clickSquare - 1].widthRect / 2
    ) {
      if (arr15[clickSquare - 1] === 0) {
        arr15[clickSquare - 1] = arr15[clickSquare];
        arr15[clickSquare] = 0;
        if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      }
    }
  }
  if (rects[clickSquare + 1]) { // ----------------------------right
    if (startDragX > rects[clickSquare + 1].xCoord
      && startDragX < rects[clickSquare + 1].xCoord + rects[clickSquare + 1].widthRect * 1.5
      && startDragY < rects[clickSquare + 1].yCoord + rects[clickSquare + 1].widthRect * 1.5
      && startDragY > rects[clickSquare + 1].yCoord - rects[clickSquare + 1].widthRect / 2
    ) {
      if (arr15[clickSquare + 1] === 0) {
        arr15[clickSquare + 1] = arr15[clickSquare];
        arr15[clickSquare] = 0;
        if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      }
    }
  }
  rects = [];

  ctx.clearRect(0, 0, canvasField.width, canvasField.height);
  arr15.forEach((el, i) => drawAllSquares(i, el));
  // ---------------------------------------------------------------------------Check WIN---------
  if (JSON.stringify(arr15) === JSON.stringify(arrTrue15)) {
    setTimeout(() => {
      popUp.classList.remove('hidden');
      clearTimeout(timeout);
      setTimeout(() => {
        popUp.innerHTML = `Hooray!<br> You solved the puzzle<br> in<br> ${blockTime.textContent} and ${moves} moves!`;
      }, 500);
      if (!audio.classList.contains('mute')) { createMusic('./Sound_025.wav'); }
    }, 300);
  }
  // ---------------------------------------------------------------------------Check WIN---------
});

canvasField.addEventListener('mousemove', (e) => {
  e.stopPropagation();
  e.preventDefault();
  const mx = Math.floor(e.clientX - dragX);
  const my = Math.floor(e.clientY - dragY);

  const dx = mx - startDragX;
  const dy = my - startDragY;

  for (let i = 0; i < rects.length; i += 1) {
    const r = rects[i];
    if (r.isDragging) {
      r.xCoord += dx;
      r.yCoord += dy;
    }
  }
  for (let i = 0; i < rects.length; i += 1) {
    const r = rects[i];
    if (r.isDragging) {
      ctx.clearRect(0, 0, canvasField.width, canvasField.height);
      drawSquare(r.xCoord, r.yCoord, r.num);
      for (let j = 0; j <= 15; j += 1) {
        if (j === i) {
          j += 1;
        }
        drawAllSquares(j, arr15[j]);
      }
    }
  }
  startDragX = mx;
  startDragY = my;
});
//  --------------------------------------------------------------------------Drag & Drop-----------

function moveSquare(x, y, direction, number) {
  const startX = x;
  const startY = y;
  let positionX = x; // начальная позиция X координаты
  let positionY = y; // начальная позиция Y координаты

  function animation() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvasField.width, canvasField.height); // очистка холста
    for (let i = 0; i <= 15; i += 1) {
      if (arr15[i] === number) {
        i += 1;
      }
      drawAllSquares(i, arr15[i]);
    }
    ctx.fillStyle = 'rgba(100, 100, 100, 0.7)';
    ctx.fillRect(
      positionX + 6,
      positionY + 6,
      ((canvasField.width - 30) / 4),
      ((canvasField.width - 30) / 4),
    ); // x, y, width, height

    if (number < 10 && number !== 0) {
      if (canvasField.width === 300) {
        ctx.font = '45px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 26, positionY + 55);
      } else if (canvasField.width === 500) {
        ctx.font = '55px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 48, positionY + 85);
      } else {
        ctx.font = '60px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 58, positionY + 95);
      }
    } else if (number >= 10) {
      if (canvasField.width === 300) {
        ctx.font = '45px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 13, positionY + 55);
      } else if (canvasField.width === 500) {
        ctx.font = '55px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 27, positionY + 85);
      } else {
        ctx.font = '60px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(number, positionX + 37, positionY + 95);
      }
    }

    if (direction === 'up') {
      positionY -= 3.5;
    }
    if (direction === 'down') {
      positionY += 3.5;
    }
    if (direction === 'right') {
      positionX += 3.5;
    }
    if (direction === 'left') {
      positionX -= 3.5;
    }
    const requestAnimation = requestAnimationFrame(animation);

    if (positionX > startX + ((canvasField.width - 30) / 4) + 6
    || positionX < startX - ((canvasField.width - 30) / 4) - 6) {
      cancelAnimationFrame(requestAnimation);
    }
    if (positionY > startY + ((canvasField.width - 30) / 4) + 6
    || positionY < startY - ((canvasField.width - 30) / 4) - 6) {
      cancelAnimationFrame(requestAnimation);
    }
  }

  requestAnimationFrame(animation);
}

function eraseSquare(square, direction, number) {
  // console.log(square, direction);
  switch (square) {
    case 1:
      ctx.clearRect(((canvasField.width - 30) / 4) + 6, 0, 124, 124);
      moveSquare(((canvasField.width - 30) / 4) + 6, 0, direction, number); break;
    case 2:
      ctx.clearRect(((canvasField.width - 30) / 4) * 2 + 12, 0, 124, 124);
      moveSquare(((canvasField.width - 30) / 4) * 2 + 12, 0, direction, number); break;
    case 3:
      ctx.clearRect(((canvasField.width - 30) / 4) * 3 + 18, 0, 124, 124);
      moveSquare(((canvasField.width - 30) / 4) * 3 + 18, 0, direction, number); break;
    case 4:
      ctx.clearRect(0, ((canvasField.width - 30) / 4) + 6, 124, 124);
      moveSquare(0, ((canvasField.width - 30) / 4) + 6, direction, number); break;
    case 5:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) + 6,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) + 6,
        direction,
        number,
      ); break;
    case 6:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) + 6,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) + 6,
        direction,
        number,
      ); break;
    case 7:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) * 3 + 18,
        ((canvasField.width - 30) / 4) + 6,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) * 3 + 18,
        ((canvasField.width - 30) / 4) + 6,
        direction,
        number,
      ); break;
    case 8:
      ctx.clearRect(0, ((canvasField.width - 30) / 4) * 2 + 12, 124, 124);
      moveSquare(0, ((canvasField.width - 30) / 4) * 2 + 12, direction, number); break;
    case 9:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) * 2 + 12,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) * 2 + 12,
        direction,
        number,
      ); break;
    case 10:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) * 2 + 12,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) * 2 + 12,
        direction,
        number,
      ); break;
    case 11:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) * 3 + 18,
        ((canvasField.width - 30) / 4) * 2 + 12,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) * 3 + 18,
        ((canvasField.width - 30) / 4) * 2 + 12,
        direction,
        number,
      ); break;
    case 12:
      ctx.clearRect(0, ((canvasField.width - 30) / 4) * 3 + 18, 124, 124);
      moveSquare(0, ((canvasField.width - 30) / 4) * 3 + 18, direction, number); break;
    case 13:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) * 3 + 18,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) + 6,
        ((canvasField.width - 30) / 4) * 3 + 18,
        direction,
        number,
      ); break;
    case 14:
      ctx.clearRect(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) * 3 + 18,
        124,
        124,
      );
      moveSquare(
        ((canvasField.width - 30) / 4) * 2 + 12,
        ((canvasField.width - 30) / 4) * 3 + 18,
        direction,
        number,
      ); break;
    case 15: ctx.clearRect(
      ((canvasField.width - 30) / 4) * 3 + 18,
      ((canvasField.width - 30) / 4) * 3 + 18,
      124,
      124,
    );
      moveSquare(
        ((canvasField.width - 30) / 4) * 3 + 18,
        ((canvasField.width - 30) / 4) * 3 + 18,
        direction,
        number,
      ); break;
    default:
      ctx.clearRect(0, 0, 124, 124);
      moveSquare(0, 0, direction, number);
  }
}
const countMoves = document.querySelector('.times-raw__moves');

canvasField.addEventListener('click', (e) => {
  e.preventDefault();
  if (new Date() - clickTime < 150) {
    let clickPos;
    if (e.offsetY < (((canvasField.width - 30) / 4) + 6)) {
      const square = whichSquare(e.offsetX);
      switch (square) {
        case 1: clickPos = 0; break;
        case 2: clickPos = 1; break;
        case 3: clickPos = 2; break;
        default: clickPos = 3;
      }
    }
    if (e.offsetY >= (((canvasField.width - 30) / 4) + 6)
      && e.offsetY < ((canvasField.width - 30) / 4) * 2 + 12) {
      const square = whichSquare(e.offsetX);
      switch (square) {
        case 1: clickPos = 4; break;
        case 2: clickPos = 5; break;
        case 3: clickPos = 6; break;
        default: clickPos = 7;
      }
    }
    if ((e.offsetY >= ((canvasField.width - 30) / 4) * 2 + 12
      && e.offsetY < ((canvasField.width - 30) / 4) * 3 + 18)) {
      const square = whichSquare(e.offsetX);
      switch (square) {
        case 1: clickPos = 8; break;
        case 2: clickPos = 9; break;
        case 3: clickPos = 10; break;
        default: clickPos = 11;
      }
    }
    if (e.offsetY > ((canvasField.width - 30) / 4) * 3 + 18) {
      const square = whichSquare(e.offsetX);
      switch (square) {
        case 1: clickPos = 12; break;
        case 2: clickPos = 13; break;
        case 3: clickPos = 14; break;
        default: clickPos = 15;
      }
    }
    clickSquare = clickPos;
    const numberOnSquare = arr15[clickPos];
    if (arr15[clickPos - 4] === 0) {
      arr15[clickPos - 4] = arr15[clickPos];
      arr15[clickPos] = 0;
      eraseSquare(clickPos, 'up', numberOnSquare);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvasField.width, canvasField.height);
        for (let i = 0; i <= 15; i += 1) {
          drawAllSquares(i, arr15[i]);
        }
      }, 200);
      if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
      moves += 1;
      countMoves.innerText = moves;
    } else if (arr15[clickPos + 4] === 0) {
      arr15[clickPos + 4] = arr15[clickPos];
      arr15[clickPos] = 0;
      eraseSquare(clickPos, 'down', numberOnSquare);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvasField.width, canvasField.height);
        for (let i = 0; i <= 15; i += 1) {
          drawAllSquares(i, arr15[i], numberOnSquare);
        }
      }, 200);
      if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
      moves += 1;
      countMoves.innerText = moves;
    } else if (arr15[clickPos - 1] === 0 && whichSquare(e.offsetX) !== 1) {
      arr15[clickPos - 1] = arr15[clickPos];
      arr15[clickPos] = 0;
      eraseSquare(clickPos, 'left', numberOnSquare);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvasField.width, canvasField.height);
        for (let i = 0; i <= 15; i += 1) {
          drawAllSquares(i, arr15[i]);
        }
      }, 200);
      if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
      moves += 1;
      countMoves.innerText = moves;
    } else if (arr15[clickPos + 1] === 0 && whichSquare(e.offsetX) !== 4) {
      arr15[clickPos + 1] = arr15[clickPos];
      arr15[clickPos] = 0;
      eraseSquare(clickPos, 'right', numberOnSquare);
      setTimeout(() => {
        ctx.clearRect(0, 0, canvasField.width, canvasField.height);
        for (let i = 0; i <= 15; i += 1) {
          drawAllSquares(i, arr15[i]);
        }
      }, 200);
      if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
      moves += 1;
      countMoves.innerText = moves;
    }
    // ---------------------------------------------------------------------------Check WIN---------
    let winners = 1;
    if (localStorage.getItem('count-winners')) {
      winners = JSON.parse(localStorage.getItem('count-winners'));
    }

    if (JSON.stringify(arr15) === JSON.stringify(arrTrue15)) {
      rateTable.push([moves, blockTime.textContent, winners]);
      winners += 1;
      localStorage.setItem('count-winners', JSON.stringify(winners));
      setTimeout(() => {
        popUp.classList.remove('hidden');
        clearTimeout(timeout);
        setTimeout(() => {
          popUp.innerHTML = `Hooray!<br> You solved the puzzle<br> in<br> ${blockTime.textContent} and ${moves} moves!`;
        }, 500);
        if (!audio.classList.contains('mute')) { createMusic('./Sound_025.wav'); }
      }, 300);
    }
    // ---------------------------------------------------------------------------Check WIN---------
  }
});

function showTime() { // -----------------------------------------------------------------show TIMER
  let sec = 0;
  let min = 0;

  function tick() {
    sec += 1;
    if (sec >= 60) {
      sec = 0;
      min += 1;
    }
  }
  function timer() {
    timeout = setTimeout(() => {
      tick();
      if (sec >= 10) {
        blockTime.textContent = `0${min}:${sec}`;
      } else blockTime.textContent = `0${min}:0${sec}`;

      timer();
    }, 1000);
  }
  timer();
}
showTime();

popUp.addEventListener('click', () => { // -----------------------------------------------------------------close Pop-Up-WIN
  popUp.innerHTML = '';
  popUp.classList.add('hidden');
  arr15 = mix(1000);
  blockTime.innerText = '00:00';
  showTime();
  moves = 0;
  countMoves.innerText = moves;
  localStorage.setItem('winners', JSON.stringify(rateTable));
});

popUpResult.addEventListener('click', () => { // ----------------------------------------------------------close Pop-Up-RESULT
  popUpResult.innerHTML = '';
  popUpResult.classList.add('hidden');
});

const newGameButton = document.querySelector('.buttons-raw__button-new-game');
const easyGameButton = document.querySelector('.buttons-raw__button-new-game-easy');
const resultsButton = document.querySelector('.buttons-raw__button-results');
newGameButton.addEventListener('click', () => { // -----------------------------------------------------click new HARD
  arr15 = mix(1000);
  arr15.forEach((el, i) => drawAllSquares(i, el));
  setTimeout(() => {
    if (!audio.classList.contains('mute')) { createMusic('./Sound_017.wav'); }
  }, 50);
  moves = 0;
  countMoves.innerText = moves;
  clearTimeout(timeout);
  blockTime.textContent = '00:00';
  showTime();
});
easyGameButton.addEventListener('click', () => { // -----------------------------------------------------click new EASY
  if (!audio.classList.contains('mute')) { createMusic('./Sound_017.wav'); } // -------------------Sounds
  arr15 = mix(20);
  arr15.forEach((el, i) => drawAllSquares(i, el));
  moves = 0;
  countMoves.innerText = moves;
  clearTimeout(timeout);
  blockTime.textContent = '00:00';
  showTime();
});
resultsButton.addEventListener('click', () => { // --------------------------------------------------------click RESULT
  popUpResult.classList.remove('hidden');

  const caption = document.createElement('h2');
  caption.classList.add('pop-up-result__caption');
  caption.innerText = 'High Score Table';
  setTimeout(() => {
    popUpResult.append(caption);
  }, 500);

  if (localStorage.getItem('winners') !== 'undefined') {
    rateTable = JSON.parse(localStorage.getItem('winners'));
  }
  setTimeout(() => {
    if (rateTable.length === 0) {
      popUpResult.innerHTML = 'No winners yet!';
    } else {
      rateTable.sort((a, b) => a[0] - b[0]);
      const rateTableSliced = rateTable.slice(0, 10);
      rateTableSliced.forEach((el, i) => {
        const res = document.createElement('div');
        res.classList.add('winner-name');
        res.innerText = `${i + 1} ⦁ Player ${el[2]} solved the puzzle in ${el[1]} and ${el[0]} moves `;
        popUpResult.append(res);
      });
    }
  }, 500);
});
// -------------------------------------------------LOCAL STORAGE-----------------------------------
function setLocalStorage() {
  localStorage.setItem('currentState', JSON.stringify(arr15));
  localStorage.setItem('currentMove', JSON.stringify(moves));
  // localStorage.setItem('winners', JSON.stringify(rateTable));
}

const saveGameButton = document.querySelector('.buttons-raw__button-save-game');
saveGameButton.addEventListener('click', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('currentState')) {
    arr15 = JSON.parse(localStorage.getItem('currentState'));
    moves = JSON.parse(localStorage.getItem('currentMove'));
  }
  ctx.clearRect(0, 0, canvasField.width, canvasField.height);
  arr15.forEach((el, i) => drawAllSquares(i, el));
  countMoves.innerText = moves;
}
const loadGameButton = document.querySelector('.buttons-raw__button-load-game');
loadGameButton.addEventListener('click', getLocalStorage);
// -------------------------------------------------LOCAL STORAGE-----------------------------------

const arr3 = mix3(100);

function whichSquare3(offsetX) {
  let square;
  if (offsetX < (((canvasField.width - 30) / 3) + 9)) {
    square = 1;
  } if (offsetX >= (((canvasField.width - 30) / 3) + 9)
  && offsetX < ((canvasField.width - 30) / 3) * 2 + 18) {
    square = 2;
  } if (offsetX > ((canvasField.width - 30) / 3) * 2 + 18) {
    square = 3;
  }
  return square;
}

const size3Button = document.querySelector('.size3');
size3Button.addEventListener('click', () => {
  size3Button.classList.toggle('pressed');
  if (size3Button.classList.contains('pressed')) {
    main.innerHTML = '';
    const canvasField3 = document.createElement('canvas');
    canvasField3.classList.add('canvas');
    if (window.screen.width > 1400) {
      canvasField3.width = 600;
      canvasField3.height = 600;
    } else if (window.screen.width > 600 && window.screen.width < 1400) {
      canvasField3.width = 500;
      canvasField3.height = 500;
    } else {
      canvasField3.width = 300;
      canvasField3.height = 300;
    }
    canvasField3.innerText = 'Please use modern browser! =)';
    main.append(canvasField3);

    const ctx3 = canvasField3.getContext('2d');

    ctx3.clearRect(0, 0, canvasField3.width, canvasField3.height);
    arr3.forEach((el, i) => draw3AllSquares(i, el));

    canvasField3.addEventListener('click', (e) => {
      let clickPos;
      countMoves.innerText = moves;
      if (e.offsetY < (((canvasField.width - 30) / 3) + 9)) {
        const square = whichSquare3(e.offsetX);
        switch (square) {
          case 1: clickPos = 0; break;
          case 2: clickPos = 1; break;
          case 3: clickPos = 2; break;
          default: break;
        }
      }
      if (e.offsetY >= (((canvasField.width - 30) / 3) + 9)
          && e.offsetY < ((canvasField.width - 30) / 3) * 2 + 18) {
        const square = whichSquare3(e.offsetX);
        switch (square) {
          case 1: clickPos = 3; break;
          case 2: clickPos = 4; break;
          case 3: clickPos = 5; break;
          default: break;
        }
      }
      if (e.offsetY > ((canvasField.width - 30) / 3) * 2 + 18) {
        const square = whichSquare3(e.offsetX);
        switch (square) {
          case 1: clickPos = 6; break;
          case 2: clickPos = 7; break;
          case 3: clickPos = 8; break;
          default: break;
        }
      }
      clickSquare = clickPos;
      const numberOnSquare = arr3[clickPos];
      if (arr3[clickPos - 3] === 0) {
        arr3[clickPos - 3] = arr3[clickPos];
        arr3[clickPos] = 0;
        // eraseSquare(clickPos, 'up', numberOnSquare);

        ctx3.clearRect(0, 0, canvasField3.width, canvasField3.height);
        for (let i = 0; i <= 9; i += 1) {
          draw3AllSquares(i, arr3[i], numberOnSquare);
        }

        if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      } else if (arr3[clickPos + 3] === 0) {
        arr3[clickPos + 3] = arr3[clickPos];
        arr3[clickPos] = 0;
        // eraseSquare(clickPos, 'down', numberOnSquare);
        ctx3.clearRect(0, 0, canvasField3.width, canvasField3.height);
        for (let i = 0; i <= 9; i += 1) {
          draw3AllSquares(i, arr3[i], numberOnSquare);
        }

        if (!audio.classList.contains('mute')) { createMusic('./Sound_005.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      } else if (arr3[clickPos - 1] === 0 && whichSquare3(e.offsetX) !== 1) {
        arr3[clickPos - 1] = arr3[clickPos];
        arr3[clickPos] = 0;
        // eraseSquare(clickPos, 'left', numberOnSquare);
        ctx3.clearRect(0, 0, canvasField3.width, canvasField3.height);
        for (let i = 0; i <= 9; i += 1) {
          draw3AllSquares(i, arr3[i]);
        }
        if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      } else if (arr3[clickPos + 1] === 0 && whichSquare(e.offsetX) !== 4) {
        arr3[clickPos + 1] = arr3[clickPos];
        arr3[clickPos] = 0;
        // eraseSquare(clickPos, 'right', numberOnSquare);
        ctx3.clearRect(0, 0, canvasField3.width, canvasField3.height);
        for (let i = 0; i <= 9; i += 1) {
          draw3AllSquares(i, arr3[i]);
        }
        if (!audio.classList.contains('mute')) { createMusic('./Sound_001.wav'); } // -------------------Sounds
        moves += 1;
        countMoves.innerText = moves;
      }
      // ---------------------------------------------------------------------------Check WIN-------
      if (JSON.stringify(arr3) === JSON.stringify(arrTrue3)) {
        // rateTable.push([moves, blockTime.textContent, winners]);
        // winners += 1;
        // localStorage.setItem('count-winners', JSON.stringify(winners));
        setTimeout(() => {
          popUp.classList.remove('hidden');
          clearTimeout(timeout);
          setTimeout(() => {
            popUp.innerHTML = `Hooray!<br> You solved the puzzle<br> in<br> ${blockTime.textContent} and ${moves} moves!`;
          }, 500);
          if (!audio.classList.contains('mute')) { createMusic('./Sound_025.wav'); }
        }, 300);
      }
      // -------------------------------------------------------------------------Check WIN---------
    });
  } else {
    main.innerHTML = '';
    main.append(canvasField);
    arr15 = mix(1000);
    moves = 0;
    countMoves.innerText = moves;
  }
});
