  'use strict';

  import countTimer from './modules/countTimer';
  import togleMenu from './modules/togleMenu';
  import togglePopup from './modules/togglePopup';
  import lowScroll from './modules/lowScroll';
  import tabs from './modules/tabs';
  import slider from './modules/slider';
  import changePhoto from './modules/changePhoto';
  import calculator from './modules/calculator';
  import userForm from './modules/userForm';


  // Timer
  countTimer('06 september 2021');
  // Menu
  togleMenu();
  //Popup
  togglePopup();
  //Low scroll
  lowScroll();
  // табы
  tabs();
  // слайдер
  slider();
  // смена фото "наша команда"
  changePhoto();
  // калькулятор
  calculator(100);
  // send-ajax-form
  userForm();