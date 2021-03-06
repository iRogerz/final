$(document).ready(function() {
    //Database column name
    const
        ID = 0,
        NAME = 1,
        PRICE = 2,
        GENRE = 3,
        IMAGE_PATH = 4,
        SELLING_VOLUME = 5,
        URL = 6;

    var value = "",
        genre = "",
        min = 1,
        max = 99999,
        pages = 1;
    filterType = '',
        filteredGame = [],
        url = decodeURIComponent(window.location.search.substring(1));
    var variables = url.split('&');
    //Database: id, name, price, category, imagepath, sellingvolume
    const gameList = [
        ['arktika', 'Arktika', 399, 'action', './img/arktika.jpg', 20, 'arktika.html'],
        ['battlefield 4', 'Battlefield 4', 599, 'shooter', './img/battlefield.jpg', 30, 'battlefield.html'],
        ['call of duty infinite warfare', 'Call of Duty: Infinite Warfare', 599, 'shooter', './img/callofduty.jpg', 40, 'Call of Duty_infinitewarefare.html'],
        ['civilization vi', 'Civilization VI', 899, 'simulation', './img/civilization6.jpg', 50, 'Civilization.html'],
        ['command conquer', 'Command & Conquer', 239, 'survival', './img/commandandconquer.jpg', 60, 'command_conquer.html'],
        ['detroit become human', 'Detroit: Become Human', 1899, 'strategy', './img/detroit.jpg', 70, 'Detroit.html'],
        ['forza horizon 4', 'Forza Horizon 4', 799, 'racing sport', './img/forzahorizon4.jpg', 80, 'forza_horizon.html'],
        ['dark souls remastered', 'Dark souls remastered', 1299, 'action survival', './img/darksoul.jpg', 90, 'darksoul.html'],
        ['sea of theives', 'Sea of Theives', 1099, 'survival simulation', './img/seaoftheives.jpg', 100, 'sea_of_theive.html'],
        ['heroine_Anthem', 'Heroine_Anthem', 999, 'action', './img/Heroine_Anthem.JPG', 110, 'HeroineAnthemZERO.html'],
        ['rise of the Tomb Raider', 'Rise of the Tomb Raider', 799, 'survival action', './img/Raider.jpg', 80, 'RiseOfTheTombRaider.html'],
        ['Clash of Cards', 'Clash of Cardsr', 699, 'strategy', './img/Clash of Cards.jpg', 40, 'ClashOfCards.html'],
        ['thesims4', 'Thesims4', 499, 'strategy simulation', './img/thesims4.jpg', 30, 'thesims4.html'],
        ['hellblade', 'Hellblade', 1299, 'survival action', './img/Hellblade.jpg', 70, 'Hellblade.html'],
        ['final fantasy xv', 'Final fantasy xv', 1099, 'rpg action', './img/final fantasy xv.jpg', 60, 'final fantasy xv.html'],
        ['watchdog2', 'watchdog2', 1499, 'action', './img/watchdogs2.jpg', 70, 'watchdog2.html'],
        ['team Super Sonic', 'Team Super Sonic', 899, 'action', './img/teamsupersonic.jpg', 20, 'Team Super Sonic.html'],
        ['unravel', 'Unravel', 599, 'family', './img/unravel2.jpg', 20, 'unravel.html'],
        ['nBA 2K18', 'NBA 2K18', 899, 'sport', './img/NBA 2K18.jpg', 60, 'NBA 2K18.html'],
        ['burnout Paradise', 'Burnout Paradise', 1099, 'racing sport', './img/Burnout Paradise.jpg', 70, 'Burnout Paradise.html'],
    ];

    //Sorting use compartor function
    function sortPriceASC(a, b) {
        if (a[PRICE] < b[PRICE]) return -1;
        if (a[PRICE] > b[PRICE]) return 1;
        return 0;
    }

    function sortPriceDES(a, b) {
        if (a[PRICE] < b[PRICE]) return 1;
        if (a[PRICE] > b[PRICE]) return -1;
        return 0;
    }

    function sortSoldVolume(a, b) {
        if (a[SELLING_VOLUME] < b[SELLING_VOLUME]) return 1;
        if (a[SELLING_VOLUME] > b[SELLING_VOLUME]) return -1;
        return 0;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function searchURL() {
        return "store.html?min=" + min + "&max=" + max + "&value=" + value + "&genre=" + genre + "&pages=" + pages;
    }

    function paginate(array, page_size, page_number) {
        //Paging
        --page_number;
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
    }

    function generateGameCard(gameArray) {
        /* Generate game card */
        gameArray = paginate(gameArray, 9, pages);
        gameArray.forEach(function(game) {
            var html = `
                    <div class="game card col-lg-4 col-md-6 col-sm-12" id="` + game[ID] + `" style="display: block;">
                        <a href="` + game[URL] + `">
                            <img class="card-img-top" src="` + game[IMAGE_PATH] + `" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">` + game[NAME] + `</h5>

                                <div class="box float-right">NT$ ` + game[PRICE] + `</div>
                                <div class="box float-right" style="background-color: peru">` + game[SELLING_VOLUME] + ` SOLD</div>
                            </div>
                        </a>
                    </div>
                `;
            $('#allGame').append(html);
        });
    }
    /* ********** DECLARETION END ********** */
    for (var i = 0; i < variables.length; i++) {
        var html = ''
        var parameter = variables[i].split('=');
        if (parameter[0] == 'value' && parameter[1] != undefined) {
            value = parameter[1];
        } else if (parameter[0] == 'min' && parameter[1] != undefined) {
            min = parseInt(parameter[1]);
            if (min != 1) {
                //Breadcrumb
                html = `
                        <li class="breadcrumb-item">
                           Min Price ` + min + `
                        </li>
                    `;
                $('#breadcrumb').append(html);
            }
        } else if (parameter[0] == 'max' && parameter[1] != undefined) {
            max = parseInt(parameter[1]);
            if (max != 99999) {
                //Breadcrumb
                html = `
                        <li class="breadcrumb-item">
                           Max Price ` + max + `
                        </li>
                    `;
                $('#breadcrumb').append(html);
            }
        } else if (parameter[0] == 'genre' && parameter[1] != undefined) {
            genre = parameter[1];
            if (genre) {
                //Breadcrumb
                html = `
                        <li class="breadcrumb-item">
                           ` + capitalizeFirstLetter(genre) + `
                        </li>
                    `;
                $('#breadcrumb').append(html);
            }
        } else if (parameter[0] == 'pages' && parameter[1] != undefined) {
            pages = parameter[1];
        }
    }

    $('#searchBox').val(value);
    //Filter game when page loaded
    gameList.forEach(function(game) {
        if (game[ID].includes(value) && game[PRICE] >= min && game[PRICE] <= max && game[GENRE].includes(genre)) {
            filteredGame.push(game);
        }
    });
    generateGameCard(filteredGame);

    $('#searchBox').on('keyup keypress', function(event) {
        if (event.keyCode === 10 || event.keyCode === 13) {
            event.preventDefault();
            $('#submit').attr("href", );
            $('#submit').trigger("click");
        }
        value = $(this).val().toLowerCase();
    });

    $(".price").on('click', function() {
        min = $(this).attr("min");
        max = $(this).attr("max");
        $(this).attr("href", searchURL());
    });

    $(".genre").on('click', function() {
        genre = $(this).attr("genre");
        $(this).attr("href", searchURL());
    });

    $('#submit').on('click', function() {
        $(this).attr("href", searchURL());
    });

    $('#dropdownSelect').on('change', function() {
        var selected = $('#dropdownSelect option:selected').val();
        if (selected == 1) {
            filteredGame = filteredGame.sort(sortSoldVolume);
        } else if (selected == 2) {
            filteredGame = filteredGame.sort(sortPriceDES);
        } else if (selected == 3) {
            filteredGame = filteredGame.sort(sortPriceASC);;
        }

        $('#allGame').html('');
        generateGameCard(filteredGame);
    });

    $('.page-link').on('click', function(event) {
        var element = $(this).attr("id");
        if (element == 'previous') {
            if (pages != 1) {
                pages--;
            }
        } else if (element == 'next') {
            if (pages != 3) {
                pages++;
            }
        } else {
            pages = $(this).attr("pages");
        }
        $(this).attr("href", searchURL());
    });
});