window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Timer
  const countTimer = (deadLine) => {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

    const getTimeRemaining = () => {
      let dateStop = new Date(deadLine).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minuts = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minuts, seconds };
    };

    const addZero = (elem) => {
      if (elem < 10) {
        return '0' + elem;
      } else { return elem; }
    };

    const updateClock = setInterval(() => {
      let timer = getTimeRemaining();
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minuts);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(updateClock);
        timerHours.textContent = '00';
        timerHours.style.color = 'red';
        timerMinutes.textContent = '00';
        timerMinutes.style.color = 'red';
        timerSeconds.textContent = '00';
        timerSeconds.style.color = 'red';
      }
    }, 1000);

  };

  countTimer('02 september 2021');

  // Menu
  const togleMenu = () => {
    const menu = document.querySelector('menu');

    document.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu')) {
        menu.classList.toggle('active-menu');
      } else {
        if (!target.closest('menu') || target.closest('a')) {
          menu.classList.remove('active-menu');
        } else {
          return;
        }
      }
    });
  };

  togleMenu();

  //Popup

  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        popup.style.opasiti = '0';

        if (innerWidth > 768) {
          let count = 0,
            animateInterval;

          const popupAnimate = () => {
            animateInterval = requestAnimationFrame(popupAnimate);
            count += 5;
            if (count <= 100) {
              popup.style.opacity = `${count / 100}`;
            } else {
              cancelAnimationFrame(animateInterval);
              count = 0;
            }
          };

          animateInterval = requestAnimationFrame(popupAnimate);
        }
      });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };

  togglePopup();

  //Low scroll
  const lowScroll = () => {
    const menu = document.querySelector('menu'),
      main = document.querySelector('main');
    let target;

    const scroll = (e) => {
      // e.preventDefault(); // проблема с этим превент дефолт, отменяется также событие отправик формы!!!

      if (e.target.hasAttribute('href')) {
        e.preventDefault();
        target = e.target.getAttribute('href');
      } else {
        if (e.target.parentNode.hasAttribute('href')) {
          e.preventDefault();
          target = e.target.parentNode.getAttribute('href');
        } else {
          return;
        }
      }

      const block = document.querySelector(target);

      if (block) {
        window.scrollTo({
          top: block.offsetTop,
          behavior: "smooth"
        });
      }
    };

    menu.addEventListener('click', scroll);
    main.addEventListener('click', scroll);
  };

  lowScroll();

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');


    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };

  tabs();

  // слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
      interval;

    const creatorDots = (arr) => {              // создаем точки для слайдов
      arr.forEach((e, index) => {
        const li = document.createElement('li');
        li.classList.add('dot');
        if (index === 0) {
          li.classList.add('dot-active');
        }
        portfolioDots.appendChild(li);
      });
    };

    creatorDots(slide);

    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else {
        if (target.matches('#arrow-left')) {
          currentSlide--;
        } else {
          if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
              if (elem === target) {
                currentSlide = index;
              }
            });
          }
        }
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(3000);
  };

  slider();

  // смена фото "наша команда"
  const changePhoto = () => {
    const command = document.querySelector('.command');
    let src;

    command.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('command__photo')) {
        src = e.target.src;
        e.target.src = e.target.dataset.img;
      }
    });
    command.addEventListener('mouseout', (e) => {
      if (e.target.classList.contains('command__photo')) {
        e.target.src = src;
      }
    });
  };

  changePhoto();


  // калькулятор
  const checkInputCalc = (block) => {
    block.addEventListener('change', (e) => {
      let target = e.target;
      if (target.hasAttribute('min')) {
        target.value = target.value.replace(/\D/g, '');
      }
    });
  };



  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

      checkInputCalc(calcBlock);
    

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValye = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (!typeValue) {
        calcSquare.value = '';
        calcCount.value = '';
        calcDay.value = '';
        totalValue.textContent = 0;
      }

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValye *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValye *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValye;
      }

      let count = 0;

      if (total !== 0) {
        let animationTotal = setInterval(() => {
          if (count <= total) {
            totalValue.textContent = Math.floor(count);
          } else if (count > total) {
            clearInterval(animationTotal);
          }

          count += total / 20;

        }, 50);
      }

    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });
  };

  calc(100);

  // send-ajax-form
  const validationFormInputs = (param) => {

    let elements = Array.from(param.elements);

    let status = false;

    const errorLable = (elem) => {
      const errorDiv = document.createElement('lable');
      errorDiv.textContent = `неверный формат ввода`;
      errorDiv.classList.add('validator-error');
      elem.insertAdjacentElement('afterend', errorDiv);
      let styleElem = getComputedStyle(elem);

      if (styleElem.transform) {
        errorDiv.style.transform = styleElem.transform;
      }
    };

    elements.forEach(elem => {
      if (elem.id === `${param.id}-name`) {
        elem.value = elem.value.replace(/[^А-Яа-яЁё -]/g, '');
        elem.value = elem.value.trim();
        elem.value = elem.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();
        elem.value = elem.value.toLowerCase().replace(/^.|\s./g, (match) => match.toUpperCase());
        if (elem.value.length < 3) {
          elem.value = '';
        } 
        if (!elem.value) {
          elem.classList.add('error');
          errorLable(elem);
          status = true;
        }
      }

      if (elem.id === `${param.id}-email`) {

          let regExpEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
          if (!regExpEmail.test(elem.value)) {
            elem.classList.add('error');
            errorLable(elem);
            status = true;
          }
      }
      if (elem.id === `${param.id}-phone`) {

          let regExpPhone = /^\+?7 ?\(\d{3}\) ?\d{3}-\d{2}-\d{2}$/;
          if (!regExpPhone.test(elem.value)) {
            elem.classList.add('error');
            errorLable(elem);
            status = true;
          }
      }
      if (elem.id === `${param.id}-message`) {
          elem.value = elem.value.replace(/[^А-Яа-я \d,\.\?!-;:]+/g, '');
          elem.value = elem.value.trim();
          elem.value = elem.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();
          if (elem.value.length < 3) {
            elem.value = '';
          } 
          if (!elem.value) {
            elem.classList.add('error');
            errorLable(elem);
            status = true;
          }
      }
    });
    return status;
  };

  const clearError = (param) => {
    let elements = Array.from(param.elements);

    const errorLable = document.querySelectorAll('.validator-error');

    let elementsError = Array.from(errorLable);

    elementsError.forEach(elem => elem.remove());

    elements.forEach(elem => elem.classList.remove('error'));
  };


  const sendForm = (id) => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = document.createElement('style'),
      successMesage = 'Спасибо! Мы скоро с вами свяжемся!';

    loadMessage.textContent = `
      .sk-rotating-plane {
        width: 2em;
        height: 2em;
        margin: auto;
        background-color: #337ab7;
        animation: sk-rotating-plane 1.2s infinite ease-in-out;
      }

      @keyframes sk-rotating-plane {
        0% {
          transform: perspective(120px) rotateX(0deg) rotateY(0deg);
        }
        50% {
          transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
        }
        100% {
          transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
        }
    }`;
  

    document.head.appendChild(loadMessage);

    const style = document.createElement('style'); 
    style.textContent = `
      .error {
        border: 2px solid red !important;
      }
      .validator-error {
        display: inline-block;
        border: 1px solid red;
        border-radius: 5px;
        font-size: 12px;
        font-family: sans-serif;
        color: red;
        padding: 0 5px;
      }
    `;
    document.head.appendChild(style);

    const form = document.getElementById(id),
      statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem;';

    const clearFormInputs = () => {
      for (let i = 0; i < (form.length - 1); i++) {
        form[i].value = '';
      }
    };

    form.addEventListener('submit', (event) => {
      
      clearError(form);
      event.preventDefault();

      if (validationFormInputs(form)) {
        return;
      }

      statusMessage.textContent = '';
      statusMessage.classList.add('sk-rotating-plane');
      form.appendChild(statusMessage);


      const formData = new FormData(form);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
      });

      const success = (response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200.');
        }
        statusMessage.classList.remove('sk-rotating-plane');
        statusMessage.textContent = successMesage;
        const popup = document.querySelector('.popup');
        setTimeout(()=> {
          popup.style.display = 'none';
        }, 2000);
      },
      error = (error) => {
        statusMessage.classList.remove('sk-rotating-plane');
        statusMessage.textContent = errorMessage;
        console.error(error);
      };

      (async () => {
        try {
          const responce = await postData(body);
          success(responce);
          clearFormInputs();
        } catch(e) {
          error(e);
        }
      })();
    });

    const postData = (body) => {
      return fetch('./server.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json',
        },
        body: JSON.stringify(body)
      });
    };
  };

  const takeForms = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(elem => {
      sendForm(elem.id);
    });
  };

  takeForms();
});