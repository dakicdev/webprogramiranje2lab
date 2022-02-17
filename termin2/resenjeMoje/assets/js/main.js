var categories, products, slides, menu = [];

window.onload = function () {

    categories = [{
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

    products = [{
        "id": 1,
        "img": {
            "src": "product1.jpg",
            "alt": "Product 1"
        },
        "name": "Item One",
        "price": {
            "oldPrice": 70,
            "newPrice": 49.99
        },
        "freeShipping": true,
        "categories": [1, 3],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi."
    },
    {
        "id": 2,
        "img": {
            "src": "product2.jpg",
            "alt": "Product 2"
        },
        "name": "Item Two",
        "price": {
            "newPrice": 39.99
        },
        "freeShipping": false,
        "category": [2],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi."
    },
    {
        "id": 3,
        "img": {
            "src": "product3.jpg",
            "alt": "Product 3"
        },
        "name": "Item Three",
        "price": {
            "oldPrice": 50,
            "newPrice": 42.99
        },
        "freeShipping": true,
        "category": [2, 3],
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu est non dolor lacinia posuere quis ultricies nisl. Nulla facilisi."
    }
    ]
    /*Slajder*/
    slides = [
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
    // menu
    menu = [
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

    showProducts(products);
    showCategories(categories);
    filterByFreeShipping(products);

    let html = '';
    //prikaz menija
    for (let i = 0; i < menu.length; i++) {

        html += `
        <li class="nav-item">
            <a class="nav-link" href="${menu[i]['href']}">${menu[i]['title']}</a>
        </li>`;
    }
    document.getElementById('menu') = html;

    //prikaz slajdera

    var sliderDiv = document.getElementById('slider');
    console.log(sliderDiv);

    html = '';
    slides.forEach((slide, index) => {
        html += `<div class="carousel-item ${index == 0 ? 'active' : ''}">
            <img class="d-block img-fluid" src="assets/img/${slide.slika.src}" alt="${slide.slika.alt}">
            </div>`;
    });
    sliderDiv.innerHTML = html;

    //prikaz proizvoda
    function showProducts(products) {
        const productsDiv = document.getElementById('products');
        console.log(productsDiv);

        let html = '';
        for (product of products) {
            html += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
        <a href="#"><img class="card-img-top" src="assets/img/${product.img.src}" alt="${product.img.alt}"></a>
        <div class="card-body">
            <h4 class="card-title">
            <a href="#">${product.name}</a>
            </h4>
            <h5>49.99</h5>
            <s>70</s>
            <p style="color: blue;">${showFreeShipping(product.freeShipping)}</p>
                    <p class="card-text">
                    ${showProductCategories(products.category)}
            </p>
            <p class="card-text">${product.description}</p>
        </div>
        </div>
    </div>
        `
        };
        productsDiv.innerHTML = html;

    }

    //prikaz kategorija
    function showCategories(categories) {
        let html = '';
        const categoriesDiv = document.getElementById('categories');
        for (category of categories) {
            html += `
            <li class="list-group-item">
                <input type="checkbox" id="${category.id}" name="categories" class="categories" value="${category.id}"/> ${category.name}
            </li>
            `
        }
        categoriesDiv.innerHTML = html;
    }

    // funkcija za prikaz Free shippinga u textu
    function showFreeShipping(freeShipping) {
        let html = '';
        if (freeShipping) {
            html += `Free Shipping`
        }
        return html;
    }

    //funckija za prikaz vise kategorija u okviru Products-a  ??????????
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


    //FILTRIRANJE  ?????/

    function filterByFreeShipping(products) {
        if ($("#free-shipping").is(':checked')) {
            console.log("Kurac");
        }
    }

}