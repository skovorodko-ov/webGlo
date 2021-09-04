const userForm = () => {
const validationFormInputs = (param) => {

    let elements = Array.from(param.elements);

    let status = false;

    const errorLable = (elem) => {
      const errorDiv = document.createElement('lable');
      const nameLable = 'Введите имя',
            emailLable = 'email не существует',
            phoneLable = 'Ввидите номер телефона',
            messageLable = 'Ввидите сообщение на русском языке';
      if (elem.id === `${param.id}-name`) {
        errorDiv.textContent = nameLable;
      }
      if (elem.id === `${param.id}-email`) {
        errorDiv.textContent = emailLable;
      }
      if (elem.id === `${param.id}-phone`) {
        errorDiv.textContent = phoneLable;
      }
      if (elem.id === `${param.id}-message`) {
        errorDiv.textContent = messageLable;
      }
      
      errorDiv.classList.add('validator-error');
      elem.insertAdjacentElement('afterend', errorDiv);
      let styleElem = getComputedStyle(elem);

      if (styleElem.transform) {
        errorDiv.style.transform = styleElem.transform;
      }
    };

    elements.forEach(elem => {
      if (elem.id === `${param.id}-name`) {
        // elem.value = elem.value.replace(/[^А-Яа-яЁё -]/g, '');
        // elem.value = elem.value.trim();
        // elem.value = elem.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();
        // elem.value = elem.value.toLowerCase().replace(/^.|\s./g, (match) => match.toUpperCase());
        if (elem.value.length < 2) {
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
          // elem.value = elem.value.replace(/[^А-Яа-я \d,\.\?!-;:]+/g, '');
          // elem.value = elem.value.trim();
          // elem.value = elem.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();
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
          statusMessage.remove();
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

  const changeInput = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(elem => {
      elem.addEventListener('change', (event) => {
        let target = event.target;

        target.value = target.value.trim();
        target.value = target.value.replace(/^(\-+)|(\-+)$/g, '').replace(/ +/g, ' ').replace(/\-+/g, '-').trim();

        if (target.name === 'user_name') {
          target.value = target.value.replace(/[^А-Яа-яЁё -]/g, '');
          target.value = target.value.toLowerCase().replace(/^.|\s./g, (match) => match.toUpperCase());
        }
        if (target.name === 'user_email') {
          target.value = target.value.replace(/[^A-Za-z0-9-@_\.!~*']/g, '').trim();
        }
        if (target.name === 'user_message') {
          target.value = target.value.replace(/[^А-Яа-я \d,\.\?!-;:]+/g, '').trim();
        }
      })
    })
  };
  changeInput();
};
  export default userForm;