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

  export default togglePopup;