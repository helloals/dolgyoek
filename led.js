
const ledOrbit = document.getElementById('ledOrbit');
  const ledCount = 24;
  const radius = 120; // 원 반지름 (240px 컨테이너 기준)

  for (let i = 0; i < ledCount; i++) {
    const led = document.createElement('div');
    led.className = 'cost-led';
    const angle = (360 / ledCount) * i;
    const rad = angle * (Math.PI / 180);
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    led.style.left = `${120 + x - 6}px`;  // -6은 led 크기(12px)의 절반
    led.style.top = `${120 + y - 6}px`;
    led.style.animationDelay = `${(2.4 / ledCount) * i}s`;
    ledOrbit.appendChild(led);
  }