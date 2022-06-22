import inputNumber from "./inputNumber.js"

document.addEventListener("DOMContentLoaded", () => {
   let body = document.querySelector('body')
   let background = document.querySelector('.background')
   let categoriesShowMoreBlock = document.querySelector('.categories .categories__more')
   let categoriesShowMoreBtn = document.querySelector('.categories .show__more')

   let filter = document.querySelector('.filter__inner')

   let priceFrom = filter.querySelector('.price__input-from input'),
      priceTo = filter.querySelector('.price__input-to input');

   let filterCloseBtn = filter.querySelector('.filter__close-btn')

   // создание полосы для выбора диапозона
   function priceSlider() {
      let sliderRange = $(".js-range-slider"),
         instance,
         min = 0,
         max = 100000,
         from = 0,
         to = 100000;


      // инициализация слайдера
      sliderRange.ionRangeSlider({
         skin: "round",
         type: "double",
         min: min,
         max: max,
         from: from,
         to: to,
         step: 1000,
         hide_min_max: true,
         hide_from_to: true,
         onStart: updateInputs,
         onFinish: updateInputs,
         onChange: updateInputs
      });

      instance = sliderRange.data("ionRangeSlider");

      // движение слайдера
      function updateInputs(data) {
         from = data.from;
         to = data.to;

         priceFrom.setAttribute('data-value', from);
         priceTo.setAttribute('data-value', to);
         priceFrom.value = from;
         priceTo.value = to;
      }

      // ввод значения от 
      priceFrom.addEventListener('input', () => {
         priceFrom.setAttribute('data-value', priceFrom.value);
         let valueFrom = priceFrom.getAttribute('data-value');

         // validate
         if (valueFrom < min) {
            valueFrom = min;
         } else if (valueFrom > to) {
            valueFrom = to;
         }

         if (valueFrom == '') {
            instance.update({
               from: max
            });
         } else {
            instance.update({
               from: valueFrom
            });
         }

         inputNumber(priceFrom);
      })

      // ввод значения до 
      priceTo.addEventListener('input', () => {
         priceTo.setAttribute('data-value', priceTo.value);
         let valueTo = priceTo.getAttribute('data-value');

         // validate
         if (valueTo < from) {
            valueTo = from;
         } else if (valueTo > max) {
            valueTo = max;
         }

         if (valueTo == '') {
            instance.update({
               to: min
            });
         } else {
            instance.update({
               to: valueTo
            });
         }

         inputNumber(priceTo);
      })
   }
   priceSlider();


   document.addEventListener('click', (event) => {
      let target = event.target

      // открытие фильтров на мобилке
      if (target.closest('.sorting__filter-btn')) {
         body.classList.add('lock')
         background.classList.add('fixed')
         filter.classList.add('fixed')
      }

      // закрытие фильтров на мобилке
      if (target === filterCloseBtn) {
         body.classList.remove('lock')
         background.classList.remove('fixed')
         filter.classList.remove('fixed')
      }

      if (target.closest('.title__block')) {
         // нажатие на предложенные категории
         if (target.tagName === 'BUTTON' && target.closest('.categories') && target !== categoriesShowMoreBtn) {
            target.classList.toggle('active')
         }

         // нажатие на кнопку показать еще
         if (target === categoriesShowMoreBtn) {
            if (categoriesShowMoreBlock.classList.contains('hide')) {
               categoriesShowMoreBlock.classList.remove('hide')
               categoriesShowMoreBtn.textContent = 'Свернуть'
            } else {
               categoriesShowMoreBlock.classList.add('hide')
               categoriesShowMoreBtn.textContent = 'Показать еще'
            }
         }
      }

      if (target.closest('.filter')) {
         // открытие и закрытие фильтров
         if (target.closest('.filter__block-header')) {
            target.closest('.filter__block').classList.toggle('active')
         }
      }

      if (target.closest('.products-block')) {
         if (target.tagName === 'BUTTON' && target.closest('.item')) {
            event.preventDefault()
         }
      }
   })
})