document.getElementById('fetch-button').addEventListener('click', fetchProducts);
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        document.getElementById('product-list').innerText = 'Failed to load products.';
    }
}
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    const header = document.getElementById('product-header');
    if (products.length > 0) {
        header.style.display = 'block';  // Show header
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('li');
            productItem.textContent = `${product.name}`;
            productList.appendChild(productItem);
        });
    }else{
        header.style.display = 'none';
        productList.innerHTML = '<li>No products found</li>';
    }
}
