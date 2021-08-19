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

	countTimer('20 august 2021');

  // Menu
  const togleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItems = menu.querySelectorAll('a');

    const handlerMenu = (e) => {
      e.preventDefault();
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((elem) => {
      elem.addEventListener('click', handlerMenu);
    });

  };

  togleMenu();

  //Popup


  console.log(innerWidth);
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popupClose = document.querySelector('.popup-close');

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

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
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

    window.scrollTo({
      top: block.offsetTop,
      behavior: "smooth"
    });
    };
    
  menu.addEventListener('click', scroll);
  main.addEventListener('click', scroll);
  };

  lowScroll();


});