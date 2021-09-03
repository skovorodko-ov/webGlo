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

  export default togleMenu;