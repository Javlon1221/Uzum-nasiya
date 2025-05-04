const API_URL = 'https://dummyjson.com';
const kartalarEl = document.querySelector('.kartalar');
const showMoreBtn = document.querySelector('.show_more');

let limit = 10;  // nechta mahsulot olish
let skip = 0;    // qaysi mahsulotdan boshlab olish

function renderProducts(data){
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
          <a href="./page.html" class="karta_btn">Ko'rish</a>
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
  fetchData(`/products?limit=${limit}&skip=${skip}`);
  skip += limit;
});

// "Yana" bosilganda keyingi mahsulotlarni qo‘shish
showMoreBtn.addEventListener('click', () => {
  fetchData(`/products?limit=${limit}&skip=${skip}`);
  skip += limit;
});
