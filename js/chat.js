import answers from './talk.js';

const API_KEY = 'aa2e624891b98ef211a0ab4604cad0d0';

function getWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      talkBot(data);
    });
}

function handleGeoSucc(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);

  getWeather(url);
}

function handleGeoErr() {
  talkBot(null);
}

navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);

const image = document.querySelector('img');
const form = document.querySelector('form');
const input = document.querySelector('input[type=text]');
const message = document.querySelector('.chatMsg p');
const button = document.querySelectorAll('.btn');

function talkBot(data) {
  const weatherData = data;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    chatbot(data);
  });
}

function chatbot(data) {
  const text = input.value;
  const weatherData = data;

  showText(weatherData, text);
  input.value = '';
}

function showText(data, text) {
  // 날씨
  if (text.includes('날씨')) {
    if (data !== null) {
      message.innerText = `현재 날씨는 ${data.main.temp}도예요!`;
      image.src = './img/puru5.jpg';
    }
    if (data === null) {
      message.innerText = '현재 날씨를 알 수가 없어요 😥';
      setTimeout(() => {
        message.innerText = '현재 위치를 알려주시면 찾아볼게요! 😍';
      }, 1000);
      image.src = './img/puru4.jpg';
    }
  }

  // 유머
  if (text.includes('재미있는')) {
    const index = Math.floor(Math.random() * answers.humors.length);
    message.innerHTML = answers.humors[index];

    const img = Math.floor(Math.random() * answers.humorsImage.length);
    image.src = answers.humorsImage[img];
  }

  // 불 켜 / 불 꺼
  if (text.includes('불 꺼')) {
    message.innerText = '불 끄니까 별이 너무 잘 보여요!';
    document.body.style.background = 'url(./img/bg.jpg) no-repeat center/cover';
    image.src = './img/puru6.gif';
  }
  if (text.includes('불 켜')) {
    if (document.body.style.background !== '') {
      message.innerText = '갑자기 불 키면 눈부신데..!';
      document.body.style.background = '#fff';
      image.src = './img/puru7.gif';
    } else {
      message.innerText = '이미 밝은걸요!?';
      image.src = './img/puru4.jpg';
    }
  }

  // 음식 관련
  if (text.includes('뭐 먹지') || text.includes('음식 추천') || text.includes('배고파')) {
    message.innerText = '어떤 종류 좋아하세요?';
    input.placeholder = '한식 / 중식 / 일식 / 양식';
  }
  if (text.includes('한식')) {
    const index = Math.floor(Math.random() * answers.korean.length);
    message.innerText = `${answers.korean[index]} 어때요?`;
    input.placeholder = '메시지를 입력해주세요';
    image.src = './img/puru3.gif';
  }
  if (text.includes('중식')) {
    const index = Math.floor(Math.random() * answers.chinese.length);
    message.innerText = `${answers.chinese[index]} 어때요?`;
    input.placeholder = '메시지를 입력해주세요';
  }
  if (text.includes('일식')) {
    const index = Math.floor(Math.random() * answers.japanese.length);
    message.innerText = `${answers.japanese[index]} 어때요?`;
    input.placeholder = '메시지를 입력해주세요';
  }
  if (text.includes('양식')) {
    const index = Math.floor(Math.random() * answers.western.length);
    message.innerText = `${answers.western[index]} 어때요?`;
    input.placeholder = '메시지를 입력해주세요';
  }

  //심심해
  if (text.includes('심심')) {
    const index = Math.floor(Math.random() * answers.game.length);
    message.innerHTML = `${answers.game[index]}`;

    const img = Math.floor(Math.random() * answers.humorsImage.length);
    image.src = answers.humorsImage[img];
  }
}

button.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.modal').classList.toggle('open');
  });
});
