const calculator = (price) => {

  const checkInputCalc = (block) => {
    block.addEventListener('change', (e) => {
      let target = e.target;
      if (target.hasAttribute('min')) {
        target.value = target.value.replace(/\D/g, '');
      }
    });
  };

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');

      checkInputCalc(calcBlock);
    

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValye = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (!typeValue || !calcSquare.value) {
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
  calc(price);

};

export default calculator;