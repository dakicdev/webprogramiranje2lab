window.onload = function () {

    var menu = [
        {
            "id": 1,
            "href": "index.html",
            "title": "Home"
        },
        {
            "id": 2,
            "href": "products.html",
            "title": "Products"
        },
        {
            "id": 3,
            "href": "contact.html",
            "title": "Contact"
        }
    ]

    /*Slajder*/
    var slides = [
        {
            "id": 1,
            "slika": {
                "src": "first.jpg",
                "alt": "First"
            }
        },
        {
            "id": 2,
            "slika": {
                "src": "second.jpg",
                "alt": "Second"
            }
        },
        {
            "id": 3,
            "slika": {
                "src": "third.jpg",
                "alt": "Third"
            }
        }
    ]

    //proizvodi

    var products = [
        {
            "id": 1,
            "name": "Item One",
            "price": "49.99",
            "category": [1, 3],
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
            "img": {
                "src": "assets/img/product1.jpg",
                "alt": "Product 1"
            }
        },
        {
            "id": 1,
            "name": "Item Two",
            "price": "39.99",
            "category": [2],
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
            "img": {
                "src": "assets/img/product2.jpg",
                "alt": "Product 2"
            }
        },
        {
            "id": 1,
            "name": "Item Three",
            "price": "42.99",
            "category": [2, 3],
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi.",
            "img": {
                "src": "assets/img/product3.jpg",
                "alt": "Product 3"
            }
        }
    ]

    //ispis menija
    var menuDiv = document.getElementById('menu');
    let html = '';

    for (let i = 0; i < menu.length; i++) {
        html += `
        <li class="nav-item">
            <a class="nav-link" href="${menu[i]['href']}">${menu[i]['title']}</a>
        </li>`;
    }
    menuDiv.innerHTML = html;


    //ispis slajdera

    var sliderDiv = document.getElementById('slider');
    console.log(sliderDiv);

    html = '';
    slides.forEach((slide, index) => {
        html += `<div class="carousel-item ${index == 0 ? 'active' : ''}">
            <img class="d-block img-fluid" src="assets/img/${slide.slika.src}" alt="${slide.slika.alt}">
            </div>`;
    });
    sliderDiv.innerHTML = html;

    //ispis proizvoda

    var productDiv = document.getElementById('products');
    html = '';
    for (product of products) {
        html += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
                <a href="#"><img class="card-img-top" src="${product.img.src}" alt="${product.img.alt}"></a>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="#">${product.name}</a>
                    </h4>
                    <h5>${product.price}</h5>
                    <p class="card-text"> Categories: ${product.category}</p>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        </div>
        `
    };

    productDiv.innerHTML = html
    console.log(productDiv);

}