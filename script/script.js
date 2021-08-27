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
        return {timeRemaining, hours, minuts, seconds};
    };

    const addZero = (elem) => {
      if (elem < 10) {
        return '0' + elem;
      } else {return elem;}
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
    e.preventDefault();

    if (e.target.hasAttribute('href')) {
      target = e.target.getAttribute('href');
    } else {
      if (e.target.parentNode.hasAttribute('href')) {
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

  // валидация калькулятора, имени, сообщения, e-mail, телефона
  const validation = () => {

    const checkInputValue = (e) => {
      let inputValue = e.value;
      if (e.hasAttribute('min')) {
          inputValue = inputValue.replace(/\D/g, '');
          return inputValue;
      }
      if (e.getAttribute('name') === 'user_name' || e.getAttribute('name') === 'user_message') {
          inputValue = inputValue.replace(/[^А-Яа-яЁё -]/g, '');
          return inputValue;
      }
      if (e.getAttribute('name') === 'user_email') {
          inputValue = inputValue.replace(/[^(A-Za-z0-9\-_\.!~\*'@)]/g, '');
          return inputValue;
      }
      if (e.getAttribute('name') === 'user_phone') {
          inputValue = inputValue.replace(/[^(\d\-\(\))]/g, '');
          return inputValue;
      }
    };

    document.addEventListener('focusout', (event) => {
      let target = event.target;

      if (target.value && !target.matches('select')) {
        target.value = checkInputValue(target);
        target.value = target.value.trim();
        target.value = target.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();
      }
      
      if (target.getAttribute('name') === "user_name") {
        target.value = target.value.toLowerCase().replace(/^.|\s./g, (match) => match.toUpperCase());
      }

    });
  };

  validation();

  // калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValye =1;
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

});
