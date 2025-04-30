const images = [
    './img/hero.png',
    './img/hero2.png',
    './img/hero3.png'
  ];
  
  let current = 0;
  
  const heroImg = document.querySelector('.hero_img');
  const prevBtn = document.querySelector('.hero_btn.prev');
  const nextBtn = document.querySelector('.hero_btn.next');
  
  function updateImage() {
    heroImg.style.opacity = 0;
    setTimeout(() => {
      heroImg.src = images[current];
      heroImg.style.opacity = 1;
    }, 300);
  }
  
  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    updateImage();
  });
  
  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    updateImage();
  });
  