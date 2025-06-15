  document.addEventListener("DOMContentLoaded", () => {

  const slides = slidesContainer.querySelectorAll("img");
  const nextBtn = document.getElementById("nextBtn");
  const slider = document.getElementById("slider");

  let currentIndex = 0;
  let isPaused = false;
  let slideInterval;

  function updateSlidePosition() {
    const slideWidth = slides[0].clientWidth;
    slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  }

  function startSlideShow() {
    slideInterval = setInterval(showNextSlide, 3000);
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  function togglePause() {
    if (isPaused) {
      startSlideShow();
    } else {
      stopSlideShow();
    }
    isPaused = !isPaused;
  };
    // 매출 슬라이드
  let roller = document.querySelector('.roller .rolling_list');
roller.id = 'roller1';
let clone = roller.cloneNode(true)
clone.id = 'roller2';
document.querySelector('.roller').appendChild(clone);
roller.classList.add('original');
clone.classList.add('clone');
    
    
    
  // 버튼 이벤트
  prevBtn.addEventListener("click", () => {
    showPrevSlide();
    if (!isPaused) {
      stopSlideShow();
      startSlideShow();
    }
  });

  nextBtn.addEventListener("click", () => {
    showNextSlide();
    if (!isPaused) {
      stopSlideShow();
      startSlideShow();
    }
  });

  // 슬라이드 클릭 시 재생/일시정지
  slider.addEventListener("click", togglePause);

  // 시작
  startSlideShow();

  // 리사이즈 시 위치 재계산
  window.addEventListener("resize", updateSlidePosition);
});
const buttons = document.querySelectorAll('.category-btn');
        const contents = document.querySelectorAll('.category-content');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                buttons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                document.querySelector(`.category-content[data-category="${category}"]`).classList.add('active');
            });
        });
// 리뷰 슬라이드
        
       const options = {
            slidesPerView: 1,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
        };

        const swiper1 = new Swiper('.swiper1', options);
        const swiper2 = new Swiper('.swiper2', options);
        const swiper3 = new Swiper('.swiper3', options);

        function setupInstantPause(swiper, selector) {
            const el = document.querySelector(selector);
            el.addEventListener('mouseenter', () => swiper.autoplay.stop());
            el.addEventListener('mouseleave', () => swiper.autoplay.start());
        }

        setupInstantPause(swiper1, '.swiper1');
        setupInstantPause(swiper2, '.swiper2');
        setupInstantPause(swiper3, '.swiper3');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              observer.unobserve(entry.target); // 한 번만 애니메이션 실행
            }
          });
        });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        
// 메뉴 a태그 페이지 이동 방지
        document.querySelectorAll('.grid_imgs a, .grid_image a, .grid_image a').forEach(function(anchor) {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();  // 기본 동작 방지 (페이지 이동 안함)
  });
        });
// 점주 인터뷰
  // === [1] 인터뷰 슬라이더 ===
  const interviewContainer = document.querySelector('.interview-container');
  const interviewPrev = document.querySelector('.prev');
  const interviewNext = document.querySelector('.next');

  const updateInterviewSlides = () => {
    const slides = interviewContainer.querySelectorAll('.interview-slide');
    const positions = [
      { transform: 'translate(calc(-55% * 5.1), -200%) translateZ(-100px)', zIndex: 1 },
      { transform: 'translate(calc(-45% * 5.1), -220%) translateZ(-100px)', zIndex: 2 },
      { transform: 'translate(calc(-45% * 3.1), -230%) translateZ(-50px)', zIndex: 3 },
      { transform: 'translate(calc(-45% * 1.1), -210%) translateZ(50px)', zIndex: 4 },
      { transform: 'translate(calc(-45% * -0.9), -230%) translateZ(-50px)', zIndex: 3 },
      { transform: 'translate(calc(-45% * -2.9), -220%) translateZ(-100px)', zIndex: 2 },
      { transform: 'translate(calc(-55% * -2.9), -200%) translateZ(-100px)', zIndex: 1 },
    ];

    slides.forEach((slide, i) => {
      slide.classList.remove('center-slide');
      slide.style.transition = 'transform 0.5s, z-index 0.5s';
      slide.style.transform = positions[i].transform;
      slide.style.zIndex = positions[i].zIndex;

      let transform = positions[i].transform;

      if (i === 3) {
        transform += ' scale(1.2)';
        slide.classList.add('center-slide');
      }
      slide.style.transform = transform;
      slide.style.zIndex = positions[i].zIndex;
    });
  };

  interviewPrev.addEventListener('click', () => {
    interviewContainer.append(interviewContainer.querySelector('.interview-slide'));
    updateInterviewSlides();
  });

  interviewNext.addEventListener('click', () => {
    const slides = interviewContainer.querySelectorAll('.interview-slide');
    interviewContainer.prepend(slides[slides.length - 1]);
    updateInterviewSlides();
  });

  updateInterviewSlides();

  // === [2] 업종변경 슬라이더 ===
  const customContainer = document.querySelector('.custom-slider-container');
  const customPrev = document.querySelector('.custom-prev');
  const customNext = document.querySelector('.custom-next');

  const updateCustomSlides = () => {
    const slides = customContainer.querySelectorAll('.custom-slide');
    const positions = [
      { transform: 'translate(-150%, 50%) translateZ(100px)', zIndex: 1 },
      { transform: 'translate(-50%, 35%) translateZ(150px)', zIndex: 3 },
      { transform: 'translate(50%, 50%) translateZ(100px)', zIndex: 1 },
    ];

    slides.forEach((slide, i) => {
      slide.classList.remove('center-slide');
      slide.style.transition = 'transform 0.5s, z-index 0.5s';
      slide.style.transform = positions[i].transform;
      slide.style.zIndex = positions[i].zIndex;

      if (i === 1) {
        slide.classList.add('center-slide');
      }
    });
  };

  customPrev.addEventListener('click', () => {
    customContainer.append(customContainer.querySelector('.custom-slide'));
    updateCustomSlides();
  });

  customNext.addEventListener('click', () => {
    const slides = customContainer.querySelectorAll('.custom-slide');
    customContainer.prepend(slides[slides.length - 1]);
    updateCustomSlides();
  });

  updateCustomSlides();

  // 자동 슬라이드 (업종변경 슬라이더 전용)
  setInterval(() => {
    customNext.click();
  }, 3000);
  function revealOnScroll() {
  const elements = document.querySelectorAll('.scroll-text');
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // 페이지 로드시도 확인
(box => observer.observe(box));

// 두둥텍스트
window.addEventListener("scroll", function () {
  const target = document.getElementById("dudung");
  const rect = target.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.8;

  if (rect.top < triggerPoint) {
      target.classList.add("active");
  }
});
// 스르르텍스트
window.addEventListener("scroll", function () {
  const text = document.getElementById("fadeText");
  const rect = text.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.8;

  if (rect.top < triggerPoint) {
    text.classList.add("active");
  }
});
// 틈새공략 하단
function revealFadeUpElements() {
  const fadeElements = document.querySelectorAll('.fade-up');

  fadeElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealFadeUpElements);
window.addEventListener('load', revealFadeUpElements);

// 맛 재료자랑 스크롤 이벤트
const section11Container = document.querySelector('.section11-container');
    const section11Images = document.querySelectorAll('.section11-image');
    let section11RevealedCount = 0;
    let section11ScrollCount = 0;
    const section11ScrollThreshold = 3;
    let section11Active = false;

    // IntersectionObserver로 section11 화면 진입 감지
    const section11Observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        section11Active = entry.isIntersecting;
      });
    }, {
      threshold: 0.5
    });

    section11Observer.observe(section11Container);

    function handleSection11Scroll(e) {
      if (!section11Active) return;
      if (section11RevealedCount >= section11Images.length) return;

      section11ScrollCount++;
      if (section11ScrollCount >= section11ScrollThreshold) {
        section11Images[section11RevealedCount].classList.add('show');
        section11RevealedCount++;
        section11ScrollCount = 0;
      }

      e.preventDefault(); // 모바일 스크롤 방지
    }

    window.addEventListener('wheel', handleSection11Scroll, { passive: false });
    window.addEventListener('touchmove', handleSection11Scroll, { passive: false });

//인테리어 이미지 효과
const section12Element = document.getElementById('section12');

const section12Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            section12Observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

section12Observer.observe(section12Element);
    
//인테리어 슬라이드
const cddSliderTrack = document.getElementById('cddSliderTrack');
const cddThumbs = document.querySelectorAll('.cdd-thumb');
const cddSlideWidth = 800;
const cddSlideCount = cddSliderTrack.children.length;

let cddCurrentIndex = 1;
let cddIsDragging = false;
let cddStartX = 0;
let cddPrevTranslate = -cddSlideWidth;

function cddCloneSlides() {
    const first = cddSliderTrack.children[0].cloneNode(true);
    const last = cddSliderTrack.children[cddSlideCount - 1].cloneNode(true);
    cddSliderTrack.appendChild(first);
    cddSliderTrack.insertBefore(last, cddSliderTrack.firstChild);
    cddSliderTrack.style.transform = `translateX(-${cddSlideWidth * cddCurrentIndex}px)`;
}
cddCloneSlides();

cddThumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        cddCurrentIndex = index + 1;
        cddUpdateSlider();
    });
});

function cddUpdateSlider() {
    cddSliderTrack.style.transition = 'transform 0.4s ease';
    cddSliderTrack.style.transform = `translateX(-${cddSlideWidth * cddCurrentIndex}px)`;
    cddUpdateThumbs();
}

function cddUpdateThumbs() {
    cddThumbs.forEach(t => t.classList.remove('active'));
    if (cddCurrentIndex > 0 && cddCurrentIndex <= cddThumbs.length)
        cddThumbs[(cddCurrentIndex - 1 + cddThumbs.length) % cddThumbs.length].classList.add('active');
}

document.addEventListener('mousedown', (e) => {
    if (!e.target.closest('.cdd-slider-track')) return;
    cddIsDragging = true;
    cddStartX = e.clientX;
    cddSliderTrack.style.transition = 'none';
});

document.addEventListener('mouseup', (e) => {
    if (!cddIsDragging) return;
    cddIsDragging = false;
    const movedBy = e.clientX - cddStartX;

    if (movedBy < -100) cddCurrentIndex++;
    else if (movedBy > 100) cddCurrentIndex--;

    cddUpdateSlider();
});

document.addEventListener('mousemove', (e) => {
    if (!cddIsDragging) return;
    const moved = e.clientX - cddStartX;
    cddSliderTrack.style.transform = `translateX(${cddPrevTranslate + moved}px)`;
});

cddSliderTrack.addEventListener('transitionend', () => {
    if (cddCurrentIndex === 0) {
        cddSliderTrack.style.transition = 'none';
        cddCurrentIndex = cddSlideCount;
        cddSliderTrack.style.transform = `translateX(-${cddSlideWidth * cddCurrentIndex}px)`;
    }
    if (cddCurrentIndex === cddSlideCount + 1) {
        cddSliderTrack.style.transition = 'none';
        cddCurrentIndex = 1;
        cddSliderTrack.style.transform = `translateX(-${cddSlideWidth * cddCurrentIndex}px)`;
    }
    cddPrevTranslate = -cddSlideWidth * cddCurrentIndex;
    cddUpdateThumbs();
});

document.querySelectorAll('img').forEach(img => {
    img.ondragstart = () => false;
});

// 맛, 사이즈, 곁들임, 사이드
// const section19_categories = [
//   [ // 21가지 맛
//       { src: '돌격닭강정/빨간맛161.jpg', text: '161 빨간맛' },
//       { src: '돌격닭강정/닭강정 마늘간장 45도컷.jpg', text: '단짠마늘간장' },
//       { src: '돌격닭강정/닭강정 빨간양념 + 크림폭탄 45도컷.jpg', text: '크림폭탄' },
//       { src: '돌격닭강정/닭강정 마늘간장+청양크림 45도컷 .jpg', text: '청양크림' },
//       { src: '돌격닭강정/닭강정 순한맛 치즈폭포+치즈시즈닝 45도컷.jpg', text: '치즈폭포포' },
//       { src: '돌격닭강정/후추라이드 45도컷.jpg', text: '후추라이드 순살' },
//       { src: '돌격닭강정/윙봉 후추 45도컷.jpg', text: '후추라이드 윙봉' },
//       { src: '돌격닭강정/닭강정 눈꽃시즈닝_치즈가루 45도컷 .jpg', text: '눈꽃치즈' },
//       { src: '돌격닭강정/닭강정 눈꽃시즈닝_하얀가루 45도컷.jpg', text: '눈꽃허니버터터' },
//       { src: '돌격닭강정/순살 후라이드 45도컷.jpg', text: '순살 후라이드' },
//   ],
//   [ // 사이즈 구성
//       { src: '왕컵.jpg', text: '왕컵' },
//       { src: '대왕컵.jpg', text: '대왕컵' },
//       { src: '실속단품.jpeg', text: '실속 단품' },
//       { src: '중장세트.jpg', text: '중장 세트' },
//       { src: '대장세트.jpg', text: '대장 세트' },
//       { src: '2종콤보_중장2종.jpg', text: '중장 2종 콤보' },
//       { src: '2종콤보_왕대장2종.jpg', text: '왕대장 2종 콤보' },
//       { src: '3대장.jpeg', text: '3대장 세트' },
//   ],
//   [ // 곁들임 메뉴
//       { src: '떡볶이', text: '火떡볶이' },
//       { src: '커리어묵칩스.jpg', text: '커리어묵칩스' },
//       { src: '옛날통닭', text: '옛날 통닭' },
//       { src: '치즈폭포감자튀김.jpg', text: '치즈폭포 감자튀김' },
//       { src: '레트로떡강정', text: '레트로 떡강정' },
//   ],
//   [ // 사이드 메뉴
//       { src: '후라이드 감자튀김.jpg', text: '후라이드 감자튀김' },
//       { src: '눈꽃감자튀김.jpg', text: '눈꽃 감자튀김' },
//       { src: '치즈스틱.jpg', text: '치즈스틱' },
//       { src: '고구마치즈스틱.jpg', text: '고구마 치즈스틱' },
//       { src: '치즈볼.jpg', text: '치즈볼' },
//       { src: '눈꽃 치즈볼.jpg', text: '눈꽃 치즈볼' },
//   ]
// ];

// const section19_slider = document.querySelector('.section19-slider');
// const section19_tabs = document.querySelectorAll('.section19-tab');
// let section19_currentCategory = 0;
// let section19_currentIndex = 0;
// let section19_currentTranslate = 0;

// section19_tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//       if (tab.classList.contains('active')) return;
//       section19_tabs.forEach(t => t.classList.remove('active'));
//       tab.classList.add('active');
//       section19_currentCategory = +tab.dataset.category;
//       section19_currentIndex = 0;
//       section19_setupSlider();
//   });
// });

// function section19_setupSlider() {
//   section19_slider.innerHTML = '';
//   const imgs = section19_categories[section19_currentCategory];
//   const prependImgs = imgs.slice(-2);
//   const appendImgs = imgs.slice(0, 2);
//   const fullImgs = [...prependImgs, ...imgs, ...appendImgs];

//   fullImgs.forEach(({ src, text }) => {
//       const div = document.createElement('div');
//       div.className = 'section19-slide';
//       const img = document.createElement('img');
//       img.src = src;
//       const label = document.createElement('div');
//       label.className = 'section19-label';
//       label.textContent = text;
//       div.appendChild(img);
//       div.appendChild(label);
//       section19_slider.appendChild(div);
//   });

//   setTimeout(() => {
//       section19_updateSlidesClass();
//       section19_setPositionByIndex();
//   }, 50);
// }

// function section19_getSlideWidth() {
//   const slide = section19_slider.querySelector('.section19-slide');
//   return slide ? slide.offsetWidth + 10 : 0;
// }

// function section19_setPositionByIndex() {
//   const slideWidth = section19_getSlideWidth();
//   section19_currentTranslate = -((2 + section19_currentIndex - 1) * slideWidth);
//   section19_setSliderPosition();
// }

// function section19_setSliderPosition() {
//   section19_slider.style.transform = `translateX(${section19_currentTranslate}px)`;
// }

// function section19_updateSlidesClass() {
//   const slides = section19_slider.querySelectorAll('.section19-slide');
//   slides.forEach(slide => slide.classList.remove('current', 'prev', 'next'));

//   const prevIdx = 2 + section19_currentIndex - 1;
//   if (slides[prevIdx]) slides[prevIdx].classList.add('prev');

//   for (let i = 0; i < 3; i++) {
//       const idx = 2 + section19_currentIndex + i;
//       if (slides[idx]) slides[idx].classList.add('current');
//   }

//   const nextIdx = 2 + section19_currentIndex + 3;
//   if (slides[nextIdx]) slides[nextIdx].classList.add('next');
// }

// let section19_isDragging = false;
// let section19_startX = 0;
// let section19_prevTranslate = 0;

// section19_slider.addEventListener('mousedown', (e) => {
//   section19_isDragging = true;
//   section19_startX = e.pageX;
//   section19_prevTranslate = section19_currentTranslate;
//   section19_slider.style.transition = 'none';
// });
// section19_slider.addEventListener('touchstart', (e) => {
//   section19_isDragging = true;
//   section19_startX = e.touches[0].clientX;
//   section19_prevTranslate = section19_currentTranslate;
//   section19_slider.style.transition = 'none';
// });

// section19_slider.addEventListener('mousemove', (e) => {
//   if (!section19_isDragging) return;
//   const currentX = e.pageX;
//   section19_currentTranslate = section19_prevTranslate + (currentX - section19_startX);
//   section19_setSliderPosition();
// });
// section19_slider.addEventListener('touchmove', (e) => {
//   if (!section19_isDragging) return;
//   const currentX = e.touches[0].clientX;
//   section19_currentTranslate = section19_prevTranslate + (currentX - section19_startX);
//   section19_setSliderPosition();
// });

// function section19_touchEnd() {
//   if (!section19_isDragging) return;
//   section19_isDragging = false;
//   section19_slider.style.transition = 'transform 0.3s ease';

//   const slideWidth = section19_getSlideWidth();
//   let movedIndex = Math.round(-section19_currentTranslate / slideWidth) - 2;
//   const imgsLen = section19_categories[section19_currentCategory].length;

//   if (movedIndex < 0) movedIndex = imgsLen - 1;
//   else if (movedIndex >= imgsLen) movedIndex = 0;

//   section19_currentIndex = movedIndex;
//   section19_setPositionByIndex();
//   section19_updateSlidesClass();
// }

// section19_slider.addEventListener('mouseup', section19_touchEnd);
// section19_slider.addEventListener('mouseleave', section19_touchEnd);
// section19_slider.addEventListener('touchend', section19_touchEnd);

// section19_setupSlider();
document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    [ // 21가지 맛
      { src: '돌격닭강정/빨간맛161.jpg', text: '161 빨간맛' },
      { src: '돌격닭강정/닭강정 마늘간장 45도컷.jpg', text: '단짠마늘간장' },
      { src: '돌격닭강정/닭강정 빨간양념 + 크림폭탄 45도컷.jpg', text: '크림폭탄' },
      { src: '돌격닭강정/닭강정 마늘간장+청양크림 45도컷 .jpg', text: '청양크림' },
      { src: '돌격닭강정/닭강정 순한맛 치즈폭포+치즈시즈닝 45도컷.jpg', text: '치즈폭포포' },
      { src: '돌격닭강정/후추라이드 45도컷.jpg', text: '후추라이드 순살' },
      { src: '돌격닭강정/윙봉 후추 45도컷.jpg', text: '후추라이드 윙봉' },
      { src: '돌격닭강정/닭강정 눈꽃시즈닝_치즈가루 45도컷 .jpg', text: '눈꽃치즈' },
      { src: '돌격닭강정/닭강정 눈꽃시즈닝_하얀가루 45도컷.jpg', text: '눈꽃허니버터터' },
      { src: '돌격닭강정/순살 후라이드 45도컷.jpg', text: '순살 후라이드' },
    ],
    [ // 사이즈 구성
      { src: '왕컵.jpg', text: '왕컵' },
      { src: '대왕컵.jpg', text: '대왕컵' },
      { src: '실속단품.jpeg', text: '실속 단품' },
      { src: '중장세트.jpg', text: '중장 세트' },
      { src: '대장세트.jpg', text: '대장 세트' },
      { src: '2종콤보_중장2종.jpg', text: '중장 2종 콤보' },
      { src: '2종콤보_왕대장2종.jpg', text: '왕대장 2종 콤보' },
      { src: '3대장.jpeg', text: '3대장 세트' },
    ],
    [ // 곁들임 메뉴
      { src: '떡볶이', text: '火떡볶이' },
      { src: '커리어묵칩스.jpg', text: '커리어묵칩스' },
      { src: '옛날통닭', text: '옛날 통닭' },
      { src: '치즈폭포감자튀김.jpg', text: '치즈폭포 감자튀김' },
      { src: '레트로떡강정', text: '레트로 떡강정' },
    ],
    [ // 사이드 메뉴
      { src: '후라이드 감자튀김.jpg', text: '후라이드 감자튀김' },
      { src: '눈꽃감자튀김.jpg', text: '눈꽃 감자튀김' },
      { src: '치즈스틱.jpg', text: '치즈스틱' },
      { src: '고구마치즈스틱.jpg', text: '고구마 치즈스틱' },
      { src: '치즈볼.jpg', text: '치즈볼' },
      { src: '눈꽃 치즈볼.jpg', text: '눈꽃 치즈볼' },
    ]
  ];

  const slider = document.querySelector(".section19-slider");
  const tabs = document.querySelectorAll(".section19-tab");
  let currentCategory = 0, currentIndex = 0;

  function setupSlider() {
    if (!slider) return;
    slider.innerHTML = "";
    const imgs = categories[currentCategory];
    imgs.forEach(({ src, text }) => {
      const div = document.createElement("div");
      div.className = "section19-slide";
      div.style.width = "300px"; // ✅ 슬라이드 크기 명시적으로 지정

      const img = document.createElement("img");
      img.src = src;
      img.alt = text;
      img.loading = "lazy";

      const label = document.createElement("div");
      label.className = "section19-label";
      label.textContent = text;

      div.appendChild(img);
      div.appendChild(label);
      slider.appendChild(div);
    });

    slider.style.width = `${imgs.length * getSlideWidth()}px`;


    updateSlidesClass();
    setSliderPosition();
  }

  function getSlideWidth() {
    const slide = slider.querySelector(".section19-slide");
    return slide ? slide.offsetWidth + 10 : 0;
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${-currentIndex * getSlideWidth()}px)`;
  }

  function updateSlidesClass() {
    const slides = slider.querySelectorAll(".section19-slide");
    slides.forEach(s => s.className = "section19-slide");
    if (slides[currentIndex]) slides[currentIndex].classList.add("active");
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = +tab.dataset.category;
      currentIndex = 0;
      setupSlider();
    });
  });

  // 자동 슬라이드 순환
  setInterval(() => {
    const images = categories[currentCategory];
    currentIndex++;
    if (currentIndex >= images.length) {
      currentIndex = 0;
    }
    setSliderPosition();
    updateSlidesClass();
  }, 3000);

  setupSlider();
});

//경쟁력
let index = 0;
    const totalSlides = 8;
    const sliderTrack = document.getElementById('sliderTrack');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    let intervalId;

    function updateSlide() {
      sliderTrack.style.transform = `translateX(-${index * 100}%)`;
      indicatorDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      index = (index + 1) % totalSlides;
      updateSlide();
    }

    function goToSlide(i) {
      index = i;
      updateSlide();
      restartAutoSlide();
    }

    // 슬라이드 자동 전환
    function startAutoSlide() {
      intervalId = setInterval(nextSlide, 3000);
    }

    function restartAutoSlide() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    // 인디케이터 클릭 이벤트
    indicatorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const i = parseInt(dot.getAttribute('data-index'));
        goToSlide(i);
      });
    });

    updateSlide();
    startAutoSlide();