let modalTriger = document.querySelectorAll('[data-modal]'); // получаем кнопки button по data atributam 
let modal = document.querySelector('.modal'); //получаем модалку 
let modalCloseBtn = document.querySelector('[data-close]'); // получаеем элемент (крестик на модальном окне);
//****************************PART_ONE***************************************/
//функиця на открытия модального окна
function openModal() {
    modal.style.display = 'inline'; //переключает стиль класса modal
    document.body.style.overflow = 'hidden'; // переприсваивает кллас
    clearInterval(modelTimerId); //если открыли самостоятельно модальное окно, то оно больше не вызовится
}
//переберираем HTML коллекцию, присваивая ей обработчик событий 'click'
modalTriger.forEach((elem) => {
    elem.addEventListener('click', openModal);
});
//функ-я закрытия модального окна 
function closeModal() {
    modal.style.display = 'none'; // переприсваиваем стиль класса modal 
    document.body.style.overflow = ''; // ставим обязательное поле ovrflow пустым
}

modalCloseBtn.addEventListener('click', closeModal); //навешеваем обрабочик события на крестик модального окна


//делаем кликабельным кнопку модального окна если оно открыто, закрываем его 
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
//навешиваем обработчик по нажатию клавиши Escape выход с модального окна 
document.addEventListener('keydown', (e) => {
    if (e.code === "Escape") {
        closeModal();
    }
});

//делаем обрабочитчик вызова setTimout через 5 секунд//*********SETTIMEOUT */
// const modelTimerId = setTimeout(openModal, 5000);

//ф-я на сколлинг до конца страницы, если это произошло, вызываем модальное окно
function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll); // удаляем модальное окно, после 1-о 
        //раза вызова 
    }
}
//навешиваем обработчик события, вложа в неё ф-ю showModalScroll
window.addEventListener('scroll', showModalByScroll);

//****************************PART_TWO_create_timer***************************************/

let deadline = "2021-05-10";
//создаём ф-ю на получение всех дат, дни недели, месяцы
function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()); // отнимаем входящую дату от текущей
    let days = Math.floor(t / (1000 * 60 * 60 * 24)); // дни
    let hours = Math.floor((t / (1000 * 60 * 60) % 24)); // часы
    let minutes = Math.floor((t / (1000 * 60 * 60 * 24)) % 60); //минуты
    let seconds = Math.floor((t / 1000) % 60); // секунды
    // возвращаем обьект текущих дат 
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
// ф-я на проверку числа без нуля в таймере 
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
//ф-я получения элементов со страницы (передающая 2 аргумента)
function setClock(selector, endtime) {
    let timer = document.querySelector(selector);
    let days = document.querySelector('#days');
    let hours = document.querySelector('#hours');
    let minutes = document.querySelector('#minutes');
    let seconds = document.querySelector('#seconds');
    let timerInterval = setInterval(updateCock, 1000); //частота вызова ф-и по обновлению

    updateCock();

    function updateCock() {
        let t = getTimeRemaining(endtime);
        //передача в функцию getZero
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timerInterval);
        }
    }
}
setClock('.timer', deadline);

//slider with menu


////***************************создание класса на практике**************************/
class MenuCard {
    constructor(scr, alt, title, descr, price, parentSelector, ...classes) {
        this.scr = scr;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAN();
    }

    changeToUAN() {
        this.price = this.price * this.transfer;
    }
    render() {
        const element = document.createElement("div");

        if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach((className) => element.classList.add(className));
        }


        element.innerHTML = `
                <img src=${this.scr} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>

        `;
        this.parent.append(element);
        return this;
    }
}



new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render(),

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        18,
        '.menu .container',
        'menu__item',
        'big'
    ).render(),

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню “Постное”',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        11,
        '.menu .container',
        'menu__item',
        'big'
    ).render()





//**********************************************обрабтчики событий******************** */
//при наведении на логотип у него появлется/убирается нижнее подчеркивание 
let logoAnime = document.querySelector(".header__logo");
logoAnime.addEventListener('mouseover', (elem) => {
    elem.target.classList.toggle("header__logo");
});


// слайдер верхних элементов**********************************

//получаем первую надпись с раздела: Выберите стиль питания 
let getImageInSlider = document.querySelector('.tabcontent');
let getHeadersText = document.querySelectorAll(".tabheader__item"); //nodelist с надписей

let arrImages = [
    "<img src='img/tabs/elite.jpg'>",
    "<img src='img/tabs/post.jpg'>",
    "<img src='img/tabs/hamburger.jpg'>",
    "<img src='img/tabs/vegy.jpg'>"
];
//c помощью цикла for мы перебрали все элементы 
for (let i = 0; i < getHeadersText.length; i++) {
    getHeadersText[i].addEventListener('click', () => {
        getImageInSlider.innerHTML = arrImages[i];
        getHeadersText[i].classList.toggle("tabheader__item_active");

    });
}


//forms 


let message = {
    loading: "загрузка",
    success: "спасибо, всё кул",
    failure: "Что-то пошло не так...."
};


function postData() {
    let forms = document.querySelectorAll("form");
    console.log(forms);
    forms.forEach((elem) => {
        postData(elem);
    });
    forms.addEventListener('click', (element) => {
        alert("asd");
    });


    // let statusMessage = document.createElement('div');
    // statusMessage.classList.add('status');
    // statusMessage.textContent = message.loading;
    // forms.append(statusMessage);

    // const request = new XMLHttpRequest();
    // request.open("POST", "server.php");

    fetch('server.php', {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: formData
    })


    // const formData = new FormData(forms);
    // request.send(formData);
    // request.addEventListener('load', () => {
    //     if (request.status === 200) {
    //         console.log(request.response);
    //         statusMessage.textContent = message.success;
    //     } else {
    //         statusMessage.textContent = message.failure;
    //     }
    // });

}


// fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: "POST",
//         body: JSON.stringify({ name: 'Supreme' }),
//         headers: {
//             "Content-type": "application/json"
//         }
//     })
//     .then(response => response.json())
//     .then(json => console.log(json));


// slider **********************************************************

let prevBtn = document.querySelector('.offer__slider-prev'); // стрелка назад
let nextBtn = document.querySelector('.offer__slider-next'); // стрелка вперед
let imgSlider = document.querySelector('.offer__slide'); // колекция картинок слайдера 03/04


let Total = document.querySelector("#total");
let current = document.querySelector('#current');




let arrNewImagesOfSlider = [
    "<img src='img/slider/food-12.jpg'>",
    "<img src='img/slider/olive-oil.jpg'>",
    "<img src='img/slider/paprika.jpg'>",
    "<img src='img/slider/pepper.jpg'>"
];

let img = 0;

nextBtn.addEventListener('click', () => {
    imgSlider.innerHTML = arrNewImagesOfSlider[img];
    img++;
    if (img > arrNewImagesOfSlider.length - 1) {
        img = 1;
    }
    if (arrNewImagesOfSlider.length < 10) {
        Total.textContent = `0${img}`;
    } else {
        Total.textContent = arrNewImagesOfSlider.length;
    }
    console.log(img);

});

prevBtn.addEventListener('click', () => {
    imgSlider.innerHTML = arrNewImagesOfSlider[img];
    img--;
    if (img < 0) {
        img = arrNewImagesOfSlider.length - 1;
    }
    if (arrNewImagesOfSlider.length < 10) {
        current.textContent = `0${img}`;
    } else {
        current.textContent = img;
    }
    console.log(img);
});


//////////////////////////////////// ____Kalkulator____////////////////////////////// 

const result = document.querySelector(".calculating__result span");
let sex = "female",
    height, weight, age, ratio = 1.375;

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = "____";
        return;
    }

    if (sex === "female") {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}
calcTotal();

function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
        elem.addEventListener("click", (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute("data-ratio");
            } else {
                sex = e.target.getAttribute('id');
            }
            elements.forEach((elem) => {
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);

            calcTotal(); // вызываем ф-ю расчёта 
        });
    });



}
getStaticInformation("#gender", "calculating__choose-item_active");
getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', function() {
        switch (input.getAttribute('id')) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }
        calcTotal(); // вызываем ф-ю расчёта  
    });

}

getDynamicInformation("#height");
getDynamicInformation("#weight");
getDynamicInformation("#age");

console.log(result);