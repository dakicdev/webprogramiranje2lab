window.onload = function(){
	
	/* PODACI */
	
	const menu = [
		{
			"id": 1,
			"title": "Home",
			"link": "index.html"
		},
		{
			"id": 2,
			"title": "Products",
			"link": "products.html"
		},
		{
			"id": 3,
			"title": "Contact",
			"link": "contact.html"
		}
	]
	
	const slides = [
		{
			"id": 1,
			src: "first.jpg",
			alt: "First"
		},
		{
			"id": 2,
			src: "second.jpg",
			alt: "Second"
		},
		{
			"id": 3,
			src: "third.jpg",
			alt: "Third"
		}
	];
	
	const products = [
		{
			"id": 1,
			"name": "Item One",
			"price": "49.99",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [
				{
					"id": 1,
					"name": "Category 1"
				},
				{
					"id": 3,
					"name": "Category 3"
				}
			],
			"image": {
				"src": "product1.jpg",
				"alt": "Product 1"
			}
		},
		{
			"id": 2,
			"name": "Item Two",
			"price": "39.99",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [
				{
					"id": 2,
					"name": "Category 2"
				}
			],
			"image": {
				"src": "product2.jpg",
				"alt": "Product 2"
			}
		},
		{
			"id": 3,
			"name": "Item Three",
			"price": "42.99",
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
			"categories": [
				{
					"id": 2,
					"name": "Category 2"
				},
				{
					"id": 3,
					"name": "Category 3"
				}
			],
			"image": {
				"src": "product3.jpg",
				"alt": "Product 3"
			}
		}
	];
	
	/* ISPIS MENIJA */
	
	const menuDiv = document.getElementById('menu');
	let html = '';
	for(let i=0; i < menu.length; i++){
		html+=`<li class="nav-item">
                <a class="nav-link" href="${menu[i]['link']}">${menu[i]['title']}</a>
              </li>`;
	}
	menuDiv.innerHTML = html;
	
	/* ISPIS SLAJDERA */
	
	const sliderDiv = document.getElementById('slider');
	html = '';
	slides.forEach((slide, index) => {
		html+=`<div class="carousel-item ${index == 0 ? 'active' : ''}">
              <img class="d-block img-fluid" src="assets/img/${slide.src}" alt="${slide.alt}">
            </div>`;
	});
	sliderDiv.innerHTML = html;
	
	/* ISPIS PROIZVODA */
	
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
                <h5>$${product.price}</h5>
				<p class="card-text">`;
		product.categories.forEach((category, index) => {
			if(index == product.categories.length-1){
				html+=`${category.name}`;
			} else {
				html+=`${category.name}, `;
			}
		});	
		html+=`</p>
                <p class="card-text">${product.description}</p>
              </div>
            </div>
          </div>`;
	}
	productsDiv.innerHTML = html;
}