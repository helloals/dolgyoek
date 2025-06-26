AOS.init({easing: 'ease-in-out-sine', duration: 700});
gsap.registerPlugin(ScrollTrigger);

const fxAni = {

  animSlide : (wrap, list, duration, direction) => {
    const startTime = performance.now(),
          listMargin = parseFloat(getComputedStyle(list).marginTop) + parseFloat(getComputedStyle(list).marginBottom),
          subHeight = list.offsetHeight;

    function slideProcess(crtTime){
      const elapsedTime = crtTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      wrap.style.height = (direction === "up" ? (1 - progress) * (subHeight + listMargin) : progress * (subHeight + listMargin)) + 'px';

      if (progress < 1) {
        requestAnimationFrame(slideProcess);
      }
    }
    requestAnimationFrame(slideProcess);
  },

  slideDown : (wrap, list, duration) => {
    fxAni.animSlide(wrap, list, duration, "down");
  },

  slideUp : (wrap, list, duration) => {
    fxAni.animSlide(wrap, list, duration, "up");
  },

  slideToggle : (btn, wrap, list, className, time) => {
    if (btn.classList.contains(className)) {
      btn.classList.remove(className);
      fxAni.slideUp(wrap, list, time);
    } else {
      btn.classList.add(className);
      fxAni.slideDown(wrap, list, time);
    }
  }
}

function splitTask(selector, trDelay, aniDelay, activeClass, random){
  // 스플릿 텍스트 (음절 태그로 감싸는 기능)
  // 선택자
  // transiton-delay
  // animation-delay *transition-delay 인수가 0이어야 작동함, 
  // transition-delay:0s 만들기, 
  // random transition-delay 기능

  //<div class="test">
  //  <div class="split-text">
  //    <p class="split-text__word"></p>
  //  </div>
  //</div>  
  const splitWord = document.querySelectorAll(`${selector} .split-text__word`);
  if(splitWord.length > 0){
    splitWord.forEach((word, idx) => {
      let splitLetter = "";
      const splitWork = splitWord[idx].innerText.split("");
      splitWord[idx].setAttribute("aria-label", splitWord[idx].innerText);
      for(let i=0; i<splitWork.length; i++){
        if(splitWork[i] == " "){
          splitLetter += `<span class="split-text__letter">&nbsp;</span>`;
        }else{
          splitLetter += `<span class="split-text__letter" aria-hidden="true">${splitWork[i]}</span>`;
        }
      };
      word.innerHTML = splitLetter;
    });

    const splitText = document.querySelectorAll(`${selector}`);
    
    if(activeClass == true){
      for(let i=0; i<splitText.length; i++){
        splitText[i].querySelector(".split-text").classList.add("split-text--no-delay")
      }
    }

    if(random == true){
      let orgArr = [];
      for(let i=0; i<splitText.length; i++){
        const trdWord = splitText[i].querySelectorAll("[aria-hidden = true]");
        for(let j=0; j<trdWord.length; j++){
          orgArr.push(j)
        }
        shuffle(orgArr);
        for(let k=0; k<orgArr.length; k++){
          if(trDelay){
            trdWord[orgArr[k]].style.transitionDelay = `${k * trDelay}s`;
          }else if(trDelay == 0 && aniDelay){
            trdWord[orgArr[k]].style.animationDelay = `${k * aniDelay}s`;
          }
        }
        orgArr = [];
      }

      function shuffle(array) {
        for (let i = array.length - 1; i>0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); 
          let t = array[i]; 
          array[i] = array[j]; 
          array[j] = t;
        }
      }  
    }else{
      for(let i=0; i<splitText.length; i++){
        const trdWord = splitText[i].querySelectorAll("[aria-hidden = true]");
        for(let j=0; j<trdWord.length; j++){
          if(trDelay){
            trdWord[j].style.transitionDelay = `${j * trDelay}s`;
          }else if(trDelay == 0 && aniDelay){
            trdWord[j].style.animationDelay = `${j * aniDelay}s`;
          }
        }
      }
    }
  };
}

function Mobile(){return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
// if (Mobile()){
//   // 모바일
// } else {
//   // 모바일 외
// }

window.onload = function(){
  setScreenSize();
}

function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}