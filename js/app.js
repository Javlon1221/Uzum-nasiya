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


// API dan ma'lumotlarni olish

const API_URL = 'https://dummyjson.com';

const kartalarEl = document.querySelector('.kartalar');

function renderProducts(data){
  console.log("renderProducts");
  const products = data.products;

  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="karta">
        <div class="kartaImg">
          <img src="${product.thumbnail}" alt="${product.title}">
        </div>
        <div class="kartaText">
          <h3 class="kartaTitle">${product.title}</h3>
          <p class="kartaCategory"><strong>Kategoriya:</strong> ${product.category}</p>
          <p class="kartaPrice"><strong>Narxi:</strong> $${product.price}</p>
          <a href="#" class="karta_btn">Ko'rish</a>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });

  kartalarEl.appendChild(fragment);
}

function fetchData(endpoint) {
  fetch(`${API_URL}${endpoint}`)
    .then(response => {
      console.log(!response.ok);
      if (!response.ok) {
        throw new Error('Bir xatolik yuz berdi!');
      }
      return response.json();
    })
    .then(data => {
      renderProducts(data);
    })
    .catch(error => {
      console.error('Xatolik:', error);
    });
}

window.addEventListener('load', () => {
  fetchData('/products');
});
