'use strict';

class Validator {
  constructor({ selector, pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
      console.log(this.error);
      if (this.error.size) {
        e.preventDefault();
      } else {
        this.postData(body, () => {
        statusMessage.classList.remove('sk-rotating-plane');
        statusMessage.textContent = successMesage;
      }, (error) => {
        statusMessage.classList.remove('sk-rotating-plane');
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
      }
    });
  }

  clearFormInputs () {
      for (let i = 0; i < (this.form.length - 1); i++) {
        this.form[i].value = '';
      }
    }

  statusMessage () {
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem;';

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
  }

  postData (body, outputData, errorData) {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
          this.clearFormInputs();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'aplication/json');
      request.send(JSON.stringify(body));
  }

  isValid (elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и метод проверки этих полей!');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('lable');
    errorDiv.textContent = `неверный формат ввода`;
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);

    let styleElem = getComputedStyle(elem);

    if (styleElem.transform) {
      errorDiv.style.transform = styleElem.transform;
    }
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');    // display none добавлен что бы убрать подпись снизу от не валидного элемента
    style.textContent = `
      input.success {
        border: 2px solid green;
      }
      input.error {
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
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}