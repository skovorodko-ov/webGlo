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

export default lowScroll;