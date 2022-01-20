let movies = [
  {
    title: '../img/guardiansofthegalaxyvol.2_lob_crd_01_logo.jpg',
    image: '../img/guardiansofthegalaxyvol.2_lob_crd_01.jpg',
    type: '슈퍼히어로, SF, 코미디, 액션, 모험, 스페이스 오페라',
    release: '2017-05-02',
    synopsis:
      '최강 빌런 ‘타노스’에 맞서 은하계를 구하고 최고의 해결사로 등극한 ‘가.오.갤’ 멤버들. 하지만 외계 여사제 ‘아이샤’가 맡긴 임무를 수행하던 중 실수로 또 다시 쫓기는 신세로 전락한다. 한편 자신에게 숨겨진 힘의 원천에 대해 고민하던 리더 ‘스타로드’는 갑작스레 나타난 아버지로 인해 또 다른 위기에 빠지게 되는데…',
  },
  {
    title: '../img/scale_logo.jpg',
    image: '../img/scale.jpg',
    type: '슈퍼히어로, SF, 액션, 어드벤처, 판타지',
    release: '2019-04-24',
    synopsis:
      '인피니티 워 이후 절반만 살아남은 지구, 마지막 희망이 된 어벤져스. 먼저 떠난 그들을 위해 모든 것을 걸었다! 위대한 어벤져스, 운명을 바꿀 최후의 전쟁이 펼쳐진다!',
  },
  {
    title: '../img/doctor_logo.png',
    image: '../img/doctor.jpg',
    type: '슈퍼히어로, 판타지, SF, 액션, 어드벤처',
    release: '2016-10-25',
    synopsis:
      '불의의 사고로 절망에 빠진 천재 외과의사 ‘닥터 스트레인지(베네딕트 컴버배치)’. 마지막 희망을 걸고 찾아 간 곳에서 ‘에인션트 원(틸다 스윈튼)’을 만나 세상을 구원할 강력한 능력을 얻게 되면서, 모든 것을 초월한 최강의 히어로로 거듭나는데...',
  },
];

const buttons = document.querySelectorAll('button');
const movieInfo = document.querySelector('.movie-info ');

// 요소 만들기
const bg = document.createElement('bg');
const text = document.createElement('div');
const title = document.createElement('img');
const image = document.createElement('img');
const type = document.createElement('p');
const release = document.createElement('p');
const synopsis = document.createElement('p');

function data(movie) {
  bg.className = 'bg';
  text.className = 'text';

  title.src = movie.title;
  image.src = movie.image;
  type.innerText = movie.type;
  release.innerText = '개봉일 ' + movie.release;
  synopsis.innerText = movie.synopsis;
  text.append(title, type, release, synopsis);
  movieInfo.append(bg, text, image);
}

buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    data(movies[i]);
    buttons.forEach((button) => (button.style.color = '#fff'));
  });
});
