window.onload = () => {

    var brands = [];
    var categories = [];
    ajaxCallback("brands", showBrands);


    function ajaxCallback(jsonFile, functionName) {
        $.ajax({
            url: `assets/data/${jsonFile}.json`,
            method: "get",
            dataType: "json",
            success: function (response) {
                functionName(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    //prikaz brendova
    function showBrands(data) {
        let html = "";
        data.forEach(brand => {
            html +=
                `
                <li class="list-group-item">
                <input type="checkbox" value="${brand.id}" class="brand" name="brands"/> ${brand.name}
                </li>
            `
        });
        document.getElementById('brands').innerHTML = html;
        brands = data;
        ajaxCallback("categories", showCategories)//kaskadno pozivanje ajax-a kako bi se elementi redom prikazivali;

    };

    //prikaz kategorija
    function showCategories(data) {
        let html = "";
        data.forEach(category => {
            html += `
                <li class="list-group-item">
                    <input type="checkbox" value="${category.id}" class="category" name="categories"/> ${category.name}
                </li>
                `
        });
        document.getElementById('categories').innerHTML = html;
        categories = data;
        ajaxCallback("products", showProducts);
    };

    //prikaz proizvoda
    function showProducts(data) {
        let html = "";
        data.forEach(product => {
            html +=
                `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="${product.img.src}" alt="${product.img.alt}"></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">${product.name}</a>
                        </h4>
                        <h6>${showProductBrand(product.brand)}</h6>
                        <h5>${product.price.currentPrice}</h5>
                        ${product.price.oldPrice ? "<s> " + product.price.oldPrice + "</s>" : ""} 
                        
                        <p class="card-text">${showProductCategories(product.category)}
                        </p>
                        <p class="card-text">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        });
        products = data;
        document.getElementById('products').innerHTML = html;
    }


    //Funkcije za prikazivanje proizvoda ->
    //1.Funckija za prikaz brenda u okviru proizvoda
    //2.Funckija za prikaz kategorije u okviru proizvoda
    //3.Funkcija za proveru da li je postojala stara cena


    function showProductBrand(id) {
        return brands.filter(b => b.id == id)[0].name;
    }

    function showProductCategories(ids) {
        let html = "";
        let productCategories = categories.filter(c => ids.includes(c.id));
        for (let i in productCategories) {
            html += productCategories[i].name;
            if (i != productCategories.length - 1) {
                html += ", ";
            }
        }
        return html;
    }


    //SORTIRANJE I FILTRIRANJE

}