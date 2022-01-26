import json from './question.js';

const API_KEY = 'aa2e624891b98ef211a0ab4604cad0d0';

function getWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pushData(data);
    });
}

function handleGeoSucc(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  getWeather(url);
}

function handleGeoErr() {
  nullData();
}

navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);

const image = document.querySelector('img');
const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const message = document.querySelector('.chatMsg p');
const button = document.querySelectorAll('.btn');

let follow = 0;
let ask = '';
let answers = '';
let key = 0;

function pushData(data) {
  const index = json.findIndex((el) => el.question == '날씨');

  json[index].answer = [`현재 기온은 ${data.main.temp} 이에요`];
  json[index].image = ['./img/puru5.jpg'];
}

function nullData() {
  const index = json.findIndex((el) => el.question == '날씨');

  json[index].answer = [`현재 날씨를 알 수가 없어요 😥<br>현재 위치를 알려주시면 찾아볼게요! `];
  json[index].image = ['./img/puru4.jpg'];
  console.log(json[index]);
}

function pushJson() {
  json.push({
    question: [`${ask}`],
    answer: [`${answers}`],
    image: ['./img/puru1.gif'],
    placeholder: '메시지를 입력해주세요',
  });
  message.innerHTML = '말을 배웠어요! 감사합니다!';
  input.placeholder = '메시지를 입력해주세요';
  key = 0;

  console.log(json);
}

function checkText() {
  const text = input.value;
  if (!text) return;

  // 말 따라하기
  if (text.includes('따라해')) {
    if (follow === 0) {
      follow = 1;
      message.innerHTML = '열심히 할게요!';
      image.src = './img/puru10.gif';
    }
    return;
  } else if (follow === 1) {
    message.innerHTML = `${text}`;

    if (text.includes('그만해')) {
      follow = 0;
      message.innerHTML = '저 잘했나요?? 😍';
      image.src = './img/puru11.gif';
    }
    return;
  }

  for (let i = 2; i < json.length; i++) {
    let jsonIndex = json[i];
    let index = Math.floor(Math.random() * jsonIndex.answer.length);

    // 불 켜
    if (text.includes(json[0].question)) {
      switch (document.body.style.background) {
        case '':
          message.innerHTML = '이거보다 더 밝으면 눈부시다구요!';
          image.src = './img/puru7.gif';
          break;
        case 'url("./img/bg.jpg")':
          document.body.style.background = '';
          message.innerHTML = '일어났어요!';
          image.src = './img/puru8.gif';
          break;
      }
      return;
    }

    // 불 꺼
    if (text.includes(json[1].question)) {
      switch (document.body.style.background) {
        case '':
          document.body.style.background = 'url(./img/bg.jpg)';
          message.innerHTML = '벌써 잘 시간 이에요?';
          image.src = './img/puru6.gif';
          break;
        case 'url("./img/bg.jpg")':
          message.innerHTML = `(이미 어두운 상태이다<br>푸루는 자고 있는 것 같다)`;
          image.src = './img/puru9.png';
          break;
      }
      return;
    }

    // 나머지 질문들
    else if (text.includes(jsonIndex.question)) {
      message.innerHTML = jsonIndex.answer[index];
      image.src = jsonIndex.image;
      input.placeholder = jsonIndex.placeholder;

      return;
    }
  }

  if (key === 1) {
    if (text.includes('좋아')) {
      message.innerHTML = '뭐라고 대답하면 될까요?';
      input.placeholder = '푸루에게 말을 가르쳐주세요';
      key = 2;
    } else {
      message.innerHTML = `아쉬워요😥\n다음번엔 꼭 가르쳐주세요!`;
      input.placeholder = '메시지를 입력해주세요!';
      key = 0;
    }
    return;
  }

  if (key === 2) {
    answers = text;
    pushJson();
    return;
  }

  message.innerHTML = '제가 대답할 수 있게 말을 가르쳐 주세요!';
  image.src = './img/puru4.jpg';
  ask = text;
  input.value = '';
  input.placeholder = '좋아! / 싫어!';
  key = 1;
  alerts();
}

function alerts() {
  var app = document.getElementById('app');

  var typewriter = new Typewriter(app, {
    loop: false,
  });

  typewriter
    .typeString('이전 질문에 대한 대답을 가르쳐 주세요!')
    .pauseFor(1000)
    .deleteAll()
    .start();
}

button.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.modal').classList.toggle('open');
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkText();

  input.value = '';
});
