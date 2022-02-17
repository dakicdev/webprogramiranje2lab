var products, categories;
window.onload = function () {

	categories = [
		{
			"id": 1,
			"name": "Category 1"
		},
		{
			"id": 2,
			"name": "Category 2"
		},
		{
			"id": 3,
			"name": "Category 3"
		}
	];
	products = [
		{
			"id": 1,
			"name": "Item One",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [1, 2, 3],
			"freeShipping": true,
			"image": {
				"src": "product1.jpg",
				"alt": "Product 1"
			},
			"price": {
				"priceBeforeDiscount": "100",
				"currentPrice": "89"
			},
		},
		{
			"id": 2,
			"name": "Item Two",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [1, 2],
			"freeShipping": false,
			"price": {
				"priceBeforeDiscount": "50",
				"currentPrice": "20"
			},
			"image": {
				"src": "product2.jpg",
				"alt": "Product 2"
			}
		},
		{
			"id": 3,
			"name": "Item Three",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [1],
			"freeShipping": true,
			"image": {
				"src": "product3.jpg",
				"alt": "Product 3"
			},
			"price": {
				"priceBeforeDiscount": "20",
				"currentPrice": "15"
			},
		}
	];
	showProducts(products);
	showCategoriesList(categories);
	$("#free-shipping").change(filterByFreeShipping);
}
/* ISPIS PROIZVODA */
function showProducts(products) {
	const productsDiv = document.querySelector('#products');
	html = '';
	for (const product of products) {
		html += `<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="assets/img/${product.image.src}" alt="${product.image.alt}"></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">${product.name}</a>
                </h4>
				<h5>$${product.price.currentPrice}</h5>
				<s>$${product.price.priceBeforeDiscount}</s>
				<p style="color: blue;">${showFreeShipping(product.freeShipping)}</p>
				<p class="card-text">${showProductCategories(product.categories)}</p>
                <p class="card-text">${product.description}</p>
            </div>
            </div>
        </div>`;
	}
	productsDiv.innerHTML = html;
}
function showFreeShipping(freeShipping) {
	let html = "";
	if (freeShipping) {
		html += `Free shipping`;
	}
	return html;
}
function showProductCategories(categoriesIds) {
	let html = "";
	for (let categoryId in categoriesIds) {
		for (let category of this.categories) {
			if (categoriesIds[categoryId] == category.id) {
				if (categoryId == categoriesIds.length - 1) {
					html += `${category.name}`;
				} else {
					html += `${category.name}, `;
				}
			}
		}
	}
	return html;
}
function showCategoriesList(categories) {
	let html = "";
	for (let category of categories) {
		html += `
		<li class="list-group-item">
        <input type="checkbox" id="${category.id}" name="categories" class="categories" value="${category.id}"/> ${category.name}
        </li>
		`;
	}
	$("#categories").html(html);
	$(".categories").change(filterByCategory);
}
function filterByFreeShipping() {
	if ($("#free-shipping").is(':checked')) {
		let filteredProducts = products.filter(el => el.freeShipping == true);
		showProducts(filteredProducts);
	} else {
		showProducts(products);
	}
}
function filterByCategory() {
	let categoriesIds = [];
	$.each($("input[name='categories']:checked"), function () {
		categoriesIds.push($(this).val());
	});
	let filteredProducts = products.filter(function (e) {
		for (let catId of e.categories) {
			for (let id of categoriesIds) {
				if (catId == id) {
					return true;
				}
			}
		}
	});
	if (filteredProducts.length) {
		showProducts(filteredProducts);
	} else {
		showProducts(products);
	}
}

