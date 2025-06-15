
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
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const categories = [
      [ // 21가지 맛
        { src: '돌격닭강정/빨간맛161.webp', text: '161 빨간맛' },
        { src: '돌격닭강정/닭강정 마늘간장 45도컷.webp', text: '단짠마늘간장' },
        { src: '돌격닭강정/닭강정 빨간양념 크림폭탄 45도컷.webp', text: '크림폭탄' },
        { src: '돌격닭강정/닭강정 마늘간장청양크림 45도컷 .webp', text: '청양크림' },
        { src: '돌격닭강정/닭강정 순한맛 치즈폭포+치즈시즈닝 45도컷.webp', text: '치즈폭포' },
        { src: '돌격닭강정/후추라이드 45도컷.webp', text: '후추라이드 순살' },
        { src: '돌격닭강정/윙봉 후추 45도컷.webp', text: '후추라이드 윙봉' },
        { src: '돌격닭강정/닭강정 눈꽃시즈닝_치즈가루 45도컷 .webp', text: '눈꽃치즈' },
        { src: '돌격닭강정/닭강정 눈꽃시즈닝_하얀가루 45도컷.webp', text: '눈꽃허니버터' },
        { src: '돌격닭강정/순살 후라이드 45도컷.webp', text: '순살 후라이드' },
      ],
      [ // 사이즈 구성
        { src: '왕컵.webp', text: '왕컵' },
        { src: '대왕컵.webp', text: '대왕컵' },
        { src: '실속단품.webp', text: '실속 단품' },
        { src: '중장세트.webp', text: '중장 세트' },
        { src: '대장세트.webp', text: '대장 세트' },
        { src: '2종콤보_중장2종.webp', text: '중장 2종 콤보' },
        { src: '2종콤보_왕대장2종.webp', text: '왕대장 2종 콤보' },
        { src: '3대장.webp', text: '3대장 세트' },
      ],
      [ // 곁들임 메뉴
        { src: '떡볶이.webp', text: '火떡볶이' },
        { src: '커리어묵칩스.webp', text: '커리어묵칩스' },
        { src: '옛날통닭', text: '옛날 통닭' },
        { src: '치즈폭포감자튀김.webp', text: '치즈폭포 감자튀김' },
        { src: '레트로떡강정', text: '레트로 떡강정' },
      ],
      [ // 사이드 메뉴
        { src: '후라이드 감자튀김.webp', text: '후라이드 감자튀김' },
        { src: '눈꽃감자튀김.webp', text: '눈꽃 감자튀김' },
        { src: '치즈스틱.webp', text: '치즈스틱' },
        { src: '고구마치즈스틱.webp', text: '고구마 치즈스틱' },
        { src: '치즈볼.webp', text: '치즈볼' },
        { src: '눈꽃 치즈볼.webp', text: '눈꽃 치즈볼' },
      ]
    ];
  
    const slider = document.querySelector(".section19-slider");
    const tabs = document.querySelectorAll(".section19-tab");
    let currentCategory = 0;
    let currentIndex = 0;
    let slideInterval;
    const visibleSlides = 5; // 한 화면에 보이는 슬라이드 개수
  
    function setupSlider() {
      if (!slider) return;
      clearInterval(slideInterval);
      slider.innerHTML = "";
  
      const imgs = categories[currentCategory];
  
      imgs.forEach(({ src, text }) => {
        const div = document.createElement("div");
        div.className = "section19-slide";
  
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
  
      currentIndex = 0;
      setSliderPosition(currentIndex);
  
      slideInterval = setInterval(nextSlide, 3000);
  
      slider.addEventListener("mouseenter", () => clearInterval(slideInterval));
      slider.addEventListener("mouseleave", () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
      });
    }
  
    function getSlideWidth() {
      const slide = slider.querySelector(".section19-slide");
      return slide ? slide.offsetWidth + 10 : 0; // margin 포함
    }
  
    function setSliderPosition(index) {
      const slideWidth = getSlideWidth();
      slider.style.transition = "transform 0.3s ease";
      slider.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  
    function nextSlide() {
      const total = categories[currentCategory].length;
      currentIndex++;
  
      if (currentIndex > total - visibleSlides) {
        // 마지막 슬라이드까지 다 보여준 후 자연스럽게 첫 슬라이드로 이동
        slider.style.transition = "transform 0.3s ease";
        setSliderPosition(currentIndex);
  
        setTimeout(() => {
          slider.style.transition = "none";
          currentIndex = 0;
          setSliderPosition(currentIndex);
        }, 350);
      } else {
        setSliderPosition(currentIndex);
      }
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
  
    setupSlider();
  });
  