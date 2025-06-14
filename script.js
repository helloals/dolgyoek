  document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.getElementById("slides");
  const slides = slidesContainer.querySelectorAll("img");
  const prevBtn = document.getElementById("prevBtn");
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
  }
  
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
        