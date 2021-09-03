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

export default changePhoto;