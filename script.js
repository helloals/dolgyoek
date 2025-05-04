document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector('.navbar__toggle'); // 햄버거 버튼
    const menu = document.querySelector('.navbar__menu'); // 메뉴 목록
    
    // 햄버거 버튼 클릭 시 메뉴 토글
    toggleButton.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});

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
        const canvas = document.getElementById("donutCanvas");
        const ctx = canvas.getContext("2d");
        const labelsContainer = document.getElementById("labels");

        const centerX = 200;
        const centerY = 200;
        const outerRadius = 160;
        const middleRadius = 100;
        const innerRadius = 80;

        const data = [
            { label: '식자재비', value: 34, color: '#2a0100' },
            { label: '음료&주류', value: 3, color: '#ffd291' },
            { label: '인건비', value: 17, color: '#ffbb73' },
            { label: '임대료', value: 3, color: '#feff86' },
            { label: '카드수수료', value: 1, color: '#fbe8a4' },
            { label: '배달수수료', value: 10, color: '#efd4a7' },
            { label: '공과잡비', value: 3, color: '#e9c079' },
            { label: '영업이익', value: 29, color: '#e60012' }
        ];

        const total = data.reduce((acc, d) => acc + d.value, 0);
        let rotation = 0;
        const labelElements = [];

        function polarToCartesian(angle, radius) {
            return {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
            };
        }

        function createLabelElements() {
            data.forEach(d => {
                const div = document.createElement("div");
                div.className = "label";
                div.innerText = d.label;
                labelsContainer.appendChild(div);
                labelElements.push(div);
            });
        }

        function updateLabelPositions() {
            let start = rotation;
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                const sliceAngle = (d.value / total) * Math.PI * 2;
                const midAngle = start + sliceAngle / 2;
                const pos = polarToCartesian(midAngle, 210);
                const label = labelElements[i];
                label.style.left = `${pos.x}px`;
                label.style.top = `${pos.y}px`;
                start += sliceAngle;
            }
        }

        function drawChart() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let start = rotation;

            data.forEach(d => {
                const sliceAngle = (d.value / total) * Math.PI * 2;

                // 도넛 조각
                ctx.beginPath();
                ctx.arc(centerX, centerY, outerRadius, start, start + sliceAngle);
                ctx.arc(centerX, centerY, innerRadius, start + sliceAngle, start, true);
                ctx.closePath();
                ctx.fillStyle = d.color;
                ctx.fill();

                // 퍼센트 텍스트
                const midAngle = start + sliceAngle / 2;
                const textPos = polarToCartesian(midAngle, (outerRadius + innerRadius) / 2);
                ctx.fillStyle = "white";
                ctx.font = "16px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`${d.value}%`, textPos.x, textPos.y);

                start += sliceAngle;
            });

            // 중간 반투명 원
            ctx.beginPath();
            ctx.arc(centerX, centerY, middleRadius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fill();

            // 중앙 검정색 원
            ctx.beginPath();
            ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();
        }

        function animate() {
            rotation += 0.005;
            drawChart();
            updateLabelPositions();
            requestAnimationFrame(animate);
        }

        createLabelElements(); // 최초 한 번
        animate(); // 회전 시작