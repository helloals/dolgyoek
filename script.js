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
// 리뷰 헤더

 
 // 텍스트 fade-up
 const fadeUpElements = document.querySelectorAll('.scroll-fade-up');
 const fadeObserver = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
             observer.unobserve(entry.target);
         }
     });
 }, { threshold: 0.3 });
 fadeUpElements.forEach(el => fadeObserver.observe(el));

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
const interviewPrev = document.querySelector('.next');
const interviewNext = document.querySelector('.prev');

function getPositionsByScreenWidth() {
  const w = window.innerWidth;

  if (w < 768) { // 모바일
    return [
      { transform: 'translate(-120%, -450%)', zIndex: 1 },
      { transform: 'translate(-100%, -460%)', zIndex: 2 },
      { transform: 'translate(-80%, -470%)', zIndex: 3 },
      { transform: 'translate(-40%, -480%)', zIndex: 4 },
      { transform: 'translate(-20%, -470%)', zIndex: 3 },
      { transform: 'translate(0%, -460%)', zIndex: 2 },
      { transform: 'translate(20%, -450%)', zIndex: 1 },
    ];
  } else if (w < 1200) { // 태블릿
    return [
      { transform: 'translate(-160%, -200%)', zIndex: 1 },
      { transform: 'translate(-100%, -210%)', zIndex: 2 },
      { transform: 'translate(-50%, -220%)', zIndex: 3 },
      { transform: 'translate(0%, -230%) translateZ(50px)', zIndex: 4 },
      { transform: 'translate(50%, -220%)', zIndex: 3 },
      { transform: 'translate(100%, -210%)', zIndex: 2 },
      { transform: 'translate(160%, -200%)', zIndex: 1 },
    ];
  } else { // PC
    return [
      { transform: 'translate(calc(-40% * 4), -210%) translateZ(0px)', zIndex: 1 },
      { transform: 'translate(calc(-40% * 3.5), -220%) translateZ(0px)', zIndex: 2 },
      { transform: 'translate(calc(-35% * 3), -230%) translateZ(0px)', zIndex: 3 },
      { transform: 'translate(calc(-45% * 1.1), -220%) translateZ(50px)', zIndex: 4 },
      { transform: 'translate(calc(-3% * -0.5), -230%) translateZ(0px)', zIndex: 3 },
      { transform: 'translate(calc(-20% * -1.5), -220%) translateZ(0px)', zIndex: 2 },
      { transform: 'translate(calc(-35% * -1.5), -210%) translateZ(0px)', zIndex: 1 },
    ];
  }
}

const updateInterviewSlides = () => {
  const slides = interviewContainer.querySelectorAll('.interview-slide');
  const positions = getPositionsByScreenWidth();

  slides.forEach((slide, i) => {
    slide.classList.remove('center-slide');
    slide.style.transition = 'transform 0.5s, z-index 0.5s';

    let transform = positions[i].transform;
    if (i === 3) {
      transform += ' scale(1.1)';
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

// 반응형 대응
window.addEventListener('resize', updateInterviewSlides);

// 최초 실행
updateInterviewSlides();


  // === [2] 업종변경 슬라이더 ===
const customContainer = document.querySelector('.custom-slider-container');
const customPrev = document.querySelector('.custom-prev');
const customNext = document.querySelector('.custom-next');

function updateCustomSlides() {
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
    if (i === 1) slide.classList.add('center-slide');
  });
}

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
let customInterval = setInterval(() => {
  customNext.click();
}, 3000);

// revealOnScroll 함수는 별도 관리
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
window.addEventListener('load', revealOnScroll);
// (box => observer.observe(box)); // 이 줄은 삭제

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


//메뉴




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
// 창업혜택 헤더 이미지
const benefitObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('benefit-show');
          benefitObserver.unobserve(entry.target);
      }
  });
}, { threshold: 0.5 });

const benefitImage = document.getElementById('benefitImage');
benefitObserver.observe(benefitImage);
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const menuItems = document.getElementById('menuItems');
  hamburger.addEventListener('click', function() {
    menuItems.classList.toggle('active');
    hamburger.classList.toggle('active');
    // 메뉴 열릴 때 body 스크롤 방지
    if (menuItems.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  // 메뉴 항목 클릭 시 닫기 (선택)
  menuItems.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        menuItems.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
});