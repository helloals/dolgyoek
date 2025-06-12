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
    let clone = roller.cloneNode(true);
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
   const container = document.querySelector('.interview-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const updateSlides = () => {
    const slides = container.querySelectorAll('.interview-slide');
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
        slide.classList.remove('center-slide'); // 기존 클래스 제거
        slide.style.transition = 'transform 0.5s, z-index 0.5s';
        slide.style.transform = positions[i].transform;
        slide.style.zIndex = positions[i].zIndex;

        if (i === 3) {
            slide.classList.add('center-slide'); // 가운데 슬라이드에만 추가
        }
    });
};

prev.addEventListener('click', () => {
    container.append(container.querySelector('.interview-slide'));
    updateSlides();
});

next.addEventListener('click', () => {
    const slides = container.querySelectorAll('.interview-slide');
    container.prepend(slides[slides.length - 1]);
    updateSlides();
});

updateSlides();

