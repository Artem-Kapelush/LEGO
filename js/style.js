var input, search, pr, result, result_arr, locale_HTML, result_store;

const popularToggle = document.querySelector('#burger1');
const sbcToggle = document.querySelector('#burger2');
const newsToggle = document.querySelector('#burger3');

function func() {
    locale_HTML = document.body.innerHTML;   // сохраняем в переменную весь body (Первоначальный)
}

setTimeout(func, 1000);  //ждем подгрузки Jsona и выполняем

function FindOnPage(name, status) {

    input = document.getElementById(name).value; //получаем значение из поля в html

    if (input.length < 3 && status == true) {
        alert('You must enter three or more characters to search');

        function FindOnPageBack() {
            document.body.innerHTML = locale_HTML;
        }
    }

    if (input.length >= 3) {
        function FindOnPageGo() {

            search = '/' + input + '/g';  //делаем из строки регуярное выражение
            pr = document.body.innerHTML;   // сохраняем в переменную весь body
            result = pr.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
            result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)

            var warning = true;
            for (var i = 0; i < result.length; i++) {
                if (result[i].match(eval(search)) != null) {
                    warning = false;
                }
            }
            if (warning == true) {
                alert('No matches found');
            }

            for (var i = 0; i < result.length; i++) {
                result_arr[i] = result[i].replace(eval(search), '<span style="background-color:yellow;">' + input + '</span>'); //находим нужные элементы, задаем стиль и сохраняем в новый массив
            }
            for (var i = 0; i < result.length; i++) {
                pr = pr.replace(result[i], result_arr[i])  //заменяем в переменной с html текст на новый из новогом ассива
            }
            document.body.innerHTML = pr;  //заменяем html код
        }
    }

    function FindOnPageBack() {
        document.body.innerHTML = locale_HTML;
    }

    if (status) {
        FindOnPageBack();
        FindOnPageGo();
    } //чистим прошлое и Выделяем найденное
    if (!status) {
        FindOnPageBack();
    } //Снимаем выделение
}

function hideBlocksByClassname(className) {
    return function () {
        const hiddenBlocks = document.querySelectorAll(className);

        for (let i = 4; i < hiddenBlocks.length; i++) {
            if (hiddenBlocks[i].style.display === 'block') {
                hiddenBlocks[i].style.display = 'none';
            } else {
                hiddenBlocks[i].style.display = 'block';
            }
        }
    }
}

console.log(sbcToggle);

popularToggle.addEventListener('click', hideBlocksByClassname('.popular__gallery'));
sbcToggle.addEventListener('click', hideBlocksByClassname('.sbc__gallery'));
newsToggle.addEventListener('click', hideBlocksByClassname('.news__gallery_box'));


const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        // удалим у кнопки класс btn-up_hide
        this.el.classList.remove('btn-up_hide');
    },
    hide() {
        // добавим к кнопке класс btn-up_hide
        this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
        // при прокрутке содержимого страницы
        window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 1800px, то делаем кнопку видимой, иначе скрываем
            scrollY > 1800 ? this.show() : this.hide();
        });
        // при нажатии на кнопку .btn-up
        document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
btnUp.addEventListener();

function filterProducts() {
    var selectElement = document.getElementById("filter");
    var selectedValue = selectElement.value;
    var products = document.getElementsByClassName("gallery__item");

    for (var i = 0; i < products.length; i++) {
        var product = products[i];
        var price = parseFloat(product.getAttribute("data-price"));

        if (selectedValue === "all") {
            product.style.display = "block";
        } else if (selectedValue === "under100" && price <= 100) {
            product.style.display = "block";
        } else if (selectedValue === "under200" && price <= 200) {
            product.style.display = "block";
        } else if (selectedValue === "over200" && price > 200) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    }
}
