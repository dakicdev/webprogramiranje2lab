window.onload = () => {

	var brands = [];
	var categories = [];

	ajaxPoziv("brands", prikaziBrendove);
	//ajaxPoziv("categories", prikaziKategorije);
	//ajaxPoziv("products", prikaziProizvode);

	document.getElementById('sort').addEventListener("change", filterChange);

	function ajaxPoziv(jsonFajl, nazivFunckije) {
		$.ajax({
			url: `assets/data/${jsonFajl}.json`,
			method: "get",
			dataType: "json",
			success: function (response) {
				nazivFunckije(response);
			},
			error: function (err) {
				console.log(err);
			}
		});
	}

	function prikaziBrendove(data) {
		let html = "";
		data.forEach(brand => {
			html += `<li class="list-group-item">
					<input type="checkbox" value="${brand.id}" class="brand" name="brands"/> ${brand.name}
					</li>`;
		});
		document.getElementById('brands').innerHTML = html;
		brands = data;
		$('.brand').change(filterChange);

		ajaxPoziv("categories", prikaziKategorije);
	}

	function prikaziKategorije(data) {
		let html = "";
		data.forEach(category => {
			html += `<li class="list-group-item">
					<input type="checkbox" value="${category.id}" class="category" name="categories"/> ${category.name}
					</li>`;
		});
		document.getElementById('categories').innerHTML = html;
		categories = data;
		$('.category').change(filterChange);

		ajaxPoziv("products", prikaziProizvode);
	}

	function prikaziProizvode(data) {
		data = brandFilter(data);
		data = categoryFilter(data);
		data = sort(data);
		let html = "";
		data.forEach(product => {
			html += `<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
            <a href="#"><img class="card-img-top" src="assets/img/${product.image.src}" alt="${product.image.alt}"></a>
            <div class="card-body">
                <h4 class="card-title">
                  <a href="#">${product.name}</a>
                </h4>
				<h6>${getProductBrand(product.brand)}</h6>
                <h5>$${product.price.currentPrice}</h5>
                ${product.price.priceBeforeDiscount ? "<s>$" + product.price.priceBeforeDiscount + "</s>" : ""}
                <p style="color: blue;">${product.freeShipping ? "Free shipping" : ""}</p>
				<p class="card-text">
                  ${getProductCategories(product.categories)}
                </p>
                <p class="card-text">${product.description}</p>
              </div>
            </div>
          </div>`;
		});
		document.getElementById('products').innerHTML = html;
	}

	function getProductBrand(id) {
		return brands.filter(b => b.id == id)[0].name;
	}

	function getProductCategories(ids) {
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

	function sort(data) {
		const sortType = document.getElementById('sort').value;
		if (sortType == 'asc') {
			return data.sort((a, b) => a.price.currentPrice > b.price.currentPrice ? 1 : -1);
		}
		return data.sort((a, b) => a.price.currentPrice < b.price.currentPrice ? 1 : -1);
	}

	function brandFilter(data) {
		let selectedBrands = [];
		$('.brand:checked').each(function (el) {
			selectedBrands.push(parseInt($(this).val()));
		});
		if (selectedBrands.length != 0) {
			return data.filter(x => selectedBrands.includes(x.brand));
		}
		return data;
	}

	function categoryFilter(data) {
		let selectedCategories = [];
		$('.category:checked').each(function (el) {
			selectedCategories.push(parseInt($(this).val()));
		});
		if (selectedCategories.length != 0) {
			return data.filter(x => x.categories.some(y => selectedCategories.includes(y)));
		}
		return data;
	}

	function filterChange() {
		ajaxPoziv("products", prikaziProizvode);
	}
}