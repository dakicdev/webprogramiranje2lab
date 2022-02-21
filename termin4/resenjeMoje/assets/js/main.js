window.onload = () => {

    var books, writers, genres = [];
    ajaxCallback("zanrovi", showGenres);

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
    };


    function showGenres(data) {
        let html = "";
        data.forEach(genre => {
            html += `
                <li class="list-group-item">
                    <input type="checkbox" value="${genre.id}" class="zanr" name="zanrovi"/> ${genre.name}
                </li>
            `
        });
        document.getElementById('zanrovi').innerHTML = html;
        genres = data;
        ajaxCallback("pisci", showWritters);
    };

    function showWritters(data) {
        let html = "";
        data.forEach(writer => {
            html +=
                `
                <li class="list-group-item">
                    <input type="checkbox" value="${writer.id}" class="pisac" name="pisci"/> ${writer.name + " " + writer.lastName}  
                </li>
            `
        });
        writers = data;
        document.getElementById('pisci').innerHTML = html;
        ajaxCallback("knjige", showBooks);
    };


    function showBooks(data) {
        let html = "";
        data.forEach(book => {
            html +=
                `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <a href="#"><img class="card-img-top" src="${book.img.src}" alt="${book.img.alt}"></a>
                    <div class="card-body">
                        <h4 class="card-title">
                        <a href="#">${book.name}</a>
                        </h4>
                        <h6>${showAuthor(book.author)}</h6>
                        <h5>${book.price.currentPrice}</h5>
                        <s>${book.price.currentPrice ? book.price.oldPrice : ""} </s>
                        <p class="card-text">
                        
                        </p>
                    </div>
                </div>
            </div>
            `
            // console.log(writers);
        });

        books = data;
        document.getElementById('knjige').innerHTML = html;
    };

    //${showAuthor(book.author)}
    // ${showGenre(book.genre)}

    function showAuthor(id) {
        return writers.filter(w => w.id == id)
    };

}