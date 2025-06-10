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
        const canvas = document.getElementById("donutCanvas");
        const ctx = canvas.getContext("2d");
        const labelsContainer = document.getElementById("labels");
    
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
    
        function resizeCanvas() {
          const size = canvas.parentElement.clientWidth;
          canvas.width = size;
          canvas.height = size;
        }
    
        function polarToCartesian(angle, radius, centerX, centerY) {
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
    
        function updateLabelPositions(centerX, centerY, outerRadius) {
          const labelRadius = outerRadius + 30;
          const positions = [];
          let start = rotation;
    
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
            const sliceAngle = (d.value / total) * Math.PI * 2;
            const midAngle = start + sliceAngle / 2;
    
            let pos = polarToCartesian(midAngle, labelRadius, centerX, centerY);
    
            // 간단한 충돌 방지 (y축 기준 최소 거리 유지)
            if (i > 0) {
              const prevY = positions[i - 1].y;
              if (Math.abs(pos.y - prevY) < 18) {
                pos.y = prevY + 18;
              }
            }
    
            labelElements[i].style.left = `${pos.x}px`;
            labelElements[i].style.top = `${pos.y}px`;
            positions.push(pos);
    
            start += sliceAngle;
          }
        }
    
        function drawChart() {
          resizeCanvas();
          const w = canvas.width;
          const h = canvas.height;
          const centerX = w / 2;
          const centerY = h / 2;
          const outerRadius = w * 0.4;
          const middleRadius = w * 0.25;
          const innerRadius = w * 0.2;
    
          ctx.clearRect(0, 0, w, h);
          let start = rotation;
    
          for (let i = 0; i < data.length; i++) {
            const d = data[i];
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
            const textPos = polarToCartesian(midAngle, (outerRadius + innerRadius) / 2, centerX, centerY);
            ctx.fillStyle = "yellow";
            ctx.font = `${w * 0.04}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${d.value}%`, textPos.x, textPos.y);
    
            start += sliceAngle;
          }
    
          // 외곽 반투명 레이어
          ctx.beginPath();
          ctx.arc(centerX, centerY, outerRadius + 20, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
          ctx.fill();
    
          // 중간 반투명 원
          ctx.beginPath();
          ctx.arc(centerX, centerY, middleRadius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.fill();
    
          // 중앙 검정색 원
          ctx.beginPath();
          ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
          ctx.fillStyle = "black";
          ctx.fill();
    
          updateLabelPositions(centerX, centerY, outerRadius);
        }
    
        function animate() {
          rotation += 0.005;
          drawChart();
          requestAnimationFrame(animate);
        }
    
        window.addEventListener("resize", drawChart);
        createLabelElements();
        animate();
// 메뉴 a태그 페이지 이동 방지
        document.querySelectorAll('.grid_imgs a, .grid_image a, .grid_image a').forEach(function(anchor) {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();  // 기본 동작 방지 (페이지 이동 안함)
  });
});