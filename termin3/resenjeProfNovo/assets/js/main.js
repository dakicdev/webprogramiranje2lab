var products, categories, brands;
window.onload = function(){
	
	 brands = [
		{
			"id": 1,
			"name": "Brand 1"
		},
		{
			"id": 2,
			"name": "Brand 2"
		},
		{
			"id": 3,
			"name": "Brand 3"
		}
	];
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
			"brandId": 1,
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
			"brandId": 2,
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
			"brandId": 3,
			"image": {
				"src": "product3.jpg",
				"alt": "Product 3"
			},
			"price": {
                "priceBeforeDiscount": "20",
                "currentPrice": "150"
            },
		}
	];
	showProducts(products);
	showCategoriesList(categories);
	showBrandsList(brands);
	$("#price").change(filterByPrice);
}	
	/* ISPIS PROIZVODA */
function showProducts(products){
	const productsDiv = document.querySelector('#products');
	html = '';
	for(const product of products){
		html+=`<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="assets/img/${product.image.src}" alt="${product.image.alt}"></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">${product.name}</a>
                </h4>
				<h6>${showBrand(product.brandId)}</h6>
				<h5>$${product.price.currentPrice}</h5>
				<s>$${product.price.priceBeforeDiscount}</s>
				<p class="card-text">${showProductCategories(product.categories)}</p>
                <p class="card-text">${product.description}</p>
              </div>
            </div>
          </div>`;
	}
	productsDiv.innerHTML = html;
}
function showBrand(brandId){
	let brandName;
	for(let brand of brands){
		if(brand.id == brandId) brandName = brand.name;
	}
	return brandName;
}
function showProductCategories(categoriesIds){
	let html = "";
	for(let categoryId in categoriesIds){
		for(let category of this.categories){
			if(categoriesIds[categoryId] == category.id){
				if(categoryId == categoriesIds.length - 1){
					html += `${category.name}`;
				}else{
					html += `${category.name}, `;
			}
		}
	}
	}
	return html;
}
function showCategoriesList(categories){
	let html = "";
	for(let category of categories){
		html +=`
		<li class="list-group-item">
          <input type="checkbox" id="${category.id}" name="categories" class="categories" value="${category.id}"/> ${category.name}
        </li>
		`;
	}
	$("#categories").html(html);
	$(".categories").change(filterByCategory);
}
function showBrandsList(brands){
	let html = "";
	for(let brand of brands){
		html +=`
		<li class="list-group-item">
          <input type="checkbox" id="${brand.id}" name="brands" class="brands" value="${brand.id}"/> ${brand.name}
        </li>
		`;
	}
	$("#brands").html(html);
	$(".brands").change(filterByBrands);
}
function filterByCategory(){
	let categoriesIds = [];
    $.each($("input[name='categories']:checked"), function(){
        categoriesIds.push($(this).val());
	});
	let filteredProducts = products.filter(function(e){
		for(let catId of e.categories){
			for(let id of categoriesIds){
				if(catId == id){
					return true;
				}
			}
		}
	});
	if(filteredProducts.length){
		showProducts(filteredProducts); 
	}else{
		showProducts(products); 
	}
}
function filterByBrands(){
	let selectedBrands = [];
		$('.brands:checked').each(function(el){
			selectedBrands.push(parseInt($(this).val()));
		});
		if(selectedBrands.length != 0){
			let filteredProducts =  products.filter(x => selectedBrands.includes(x.brandId));	
			showProducts(filteredProducts);
		}else{
			showProducts(products);
		}
}
function filterByPrice(){
	let range = $(this).val();
	if(range == "0") {
		showProducts(products);
		return;
	}
	let filteredProducts = products.filter(function(e){
		if(range == "range1"){
			if(parseInt(e.price.currentPrice) < 100) return true;
		}else{
			if(parseInt(e.price.currentPrice) > 100) return true;
		}
	});
	showProducts(filteredProducts);
}
	
