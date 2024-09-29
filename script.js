async function fetchProductInfo() {
  try {
    const response = await fetch('https://dummyjson.com/products/1');
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error('Error fetching product info:', error);
    document.getElementById('product-info').innerHTML =
      'Error loading product information.';
  }
}

function createStarRating(rating) {
  const fullStars = Math.round(rating);
  return '★'.repeat(fullStars);
}

function displayProductInfo(product) {
  const cardHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" class="card-image">
    <div class="card-content">
        <h2 class="card-title">${product.title}</h2>
        <p class="card-brand">${product.brand}</p>
        <p class="card-price">$${product.price}</p>
        <p class="card-description">${product.description}</p>
        <p class="card-stock">${
          product.stock > 0 ? 'In stock' : 'Out of stock'
        }</p>
        <div class="card-rating">
            <span class="stars">${createStarRating(product.rating)}</span>
            <span>${product.rating.toFixed(2)}</span>
        </div>
        <button class="add-to-cart">Add to cart</button>
    </div>
`;
  document.getElementById('product-info').innerHTML = cardHTML;
}

async function init() {
  const productData = await fetchProductInfo();

  setTimeout(() => {
    if (productData) {
      displayProductInfo(productData);
    }
  }, 2000);
}

init();
