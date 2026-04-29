const data = [
  {
    id: 1,
    title: "Jah Khalib - Медина",
    author: "Jah Khalib",
    src: "./files/audio/Jah Khalib - Медина.mp3",
    img: "./files/image/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Monica Belluci",
    author: "Malena",
    src: "./files/audio/Monica Belluci - Malena.mp3",
    img: "./files/image/monica.webp",
  },
  {
    id: 3,
    title: "Hani Bes (Official Video Klip 2021 )",
    author: "Mehman Huseynov",
    src: "./files/audio/Mehman Huseynov- Hani Bes (Official Video Klip 2021 ).mp3",
    img: "./files/image/hanibes.jpg"
  },
  {
    id: 4,
    title: "Namiq Qaracuxurlu",
    author: "Cavanligimin Ogrusu",
    src: "./files/audio/namiq.mp3",
    img: "./files/image/namiq).jpg",
  },
  {
    id: 5,
    title: "Savai",
    author: "Dark Life",
    src: "./files/audio/Savai - Dark Life (Instrumental).mp3",
    img: "./files/image/darklife.jpg",
  },
  {
    id: 6,
    title: "SHOUSE",
    author: "Love Tonight",
    src: "./files/audio/Lovetonight.mp3",
    img: "./files/image/LoveTonight.png",
  },
  {
    id: 7,
    title: "Tom Odell",
    author: "Another Love",
    src: "./files/audio/Tom Odell - Another Love (Official Video).mp3",
    img: "./files/image/another.jpg",
  },
  {
    id: 8,
    title: "Xpert",
    author: "Və bir də",
    src: "./files/audio/Xpert - Və bir də (Official Music Video).mp3",
    img: "./files/image/expert).jpg",
  }
]

const audioElem = document.querySelector("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const musicListElem = document.querySelector(".music-list");
const musicImage = document.querySelector(".music-image");
const marquee = document.querySelector("marquee");
const currentTime = document.querySelector(".currentTime");
const scrollbar = document.getElementById("scrollbar");
const shuffleBtn = document.getElementById("shuffle");

let index = 0;
let shuffle = false;
marquee.stop();

setInterval(generateDuration, 100)

playBtn.addEventListener("click", () => {
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  audioElem.play();
  marquee.stop()
  marquee.start()
  audioElem.play();
})

pauseBtn.addEventListener("click", () => {
  audioElem.pause();
  pauseBtn.style.display = "none";
  playBtn.style.display = "block";
  musicImage.classList.add('animation-pause')
  marquee.stop()
})

nextBtn.addEventListener("click", nextAudio);
audioElem.addEventListener("ended", () => {
  if (!shuffle) {
    nextAudio()
  } else {
    shuffleAudioPlay()
  }
});

function nextAudio() {
  index++;
  if (index === data.length) {
    index = 0
  }
  const musics = document.querySelectorAll(".music");
  musics.forEach(item => item.classList.remove("music-active"));
  musics[index].classList.add("music-active");
  audioPlay();
}

prevBtn.addEventListener("click", () => {
  index--;
  if (index === -1) {
    index = data.length - 1;
  }
  const musics = document.querySelectorAll(".music");
  musics.forEach(item => item.classList.remove("music-active"));
  musics[index].classList.add("music-active");
  audioPlay();
})
let copyData = structuredClone(data);


shuffleBtn.addEventListener("click", () => {
  shuffleBtn.classList.toggle("active")
  shuffle = !shuffle
})

scrollbar.addEventListener("input", () => {
  audioElem.currentTime = scrollbar.value;
})

function generateDuration() {
  let time = audioElem.duration - audioElem.currentTime;
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  currentTime.innerHTML = `${minute < 10 ? "0" + minute : minute} : ${second < 10 ? "0" + second : second}`
}

function shuffleAudioPlay() {
  let randomIndex = Math.floor(Math.random() * copyData.length);
  index = randomIndex;
  audioPlay(copyData);
  const musics = document.querySelectorAll(".music");
  musics.forEach(item => item.classList.remove("music-active"));
  musics[index].classList.add("music-active");
  copyData = copyData.filter((_, i) => i !== randomIndex)
}


audioElem.addEventListener("timeupdate", () => {
  generateDuration();
  scrollbar.value = audioElem.currentTime;
})

function audioPlay(list = data) {
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  audioElem.src = list[index].src;
  musicImage.src = list[index].img;
  marquee.innerText = list[index].title;
  musicImage.classList.remove("animation-pause")
  marquee.stop()
  marquee.start()
  audioElem.play();
  setInterval(() => {
    generateDuration();
    scrollbar.max = audioElem.duration;
  }, 100)
}

function selectAduio(i, elem) {
  index = i;
  audioPlay();
  document.querySelector(".music-active")?.classList.remove("music-active")
  elem.classList.add("music-active");
}


data.forEach((music, i) => musicListElem.innerHTML += `
  <div class="music" onclick="selectAduio(${i}, this)">
        <img src="${music.img}">
        <div class="info">
          <p title="${music.author}">${music.author.slice(0, 10)}...</p>
          <p title="${music.title}">${music.title.slice(0, 10)}...</p>
        </div>
      </div>
  `)