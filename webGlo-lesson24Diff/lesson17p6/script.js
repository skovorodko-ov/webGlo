'use strict';

const week = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресение'
],
  arrWhatTime = ['утро', 'день', 'вечер', 'ночь'],
  newYaer = new Date('2022', '0', '1', '0', '0', '0');
  
const whatTime = (time) => {
  if (time.getHours() > 5 && time.getHours() <= 10) {
    return arrWhatTime[0];
  }
  if (time.getHours() > 10 && time.getHours() <= 17) {
    return arrWhatTime[1];
  }
  if (time.getHours() > 17 && time.getHours() <= 22) {
    return arrWhatTime[2];
  }
  if (time.getHours() > 22 && time.getHours() <= 5) {
    return arrWhatTime[3];
  }
};

const weekDay = (day) => {
  return week[day.getDay() - 1];
};

let date = new Date();

const now = (arg) => {
  return arg.toLocaleTimeString('en');
};

const days = (arg) => {
  let i = newYaer.getTime() - arg.getTime();
  return Math.floor(i / 1000 / 60 / 60 / 24);
};

setInterval(() => {
  let date = new Date();

  document.body.innerHTML = `Добрый ${whatTime(date)}<br>
    Сегодня: ${weekDay(date)}<br>
    Текущее время: ${now(date)}<br>
    До нового года осталось ${days(date)} дней`;
}, 1000);