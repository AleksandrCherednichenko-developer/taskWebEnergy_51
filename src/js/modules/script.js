document.addEventListener("DOMContentLoaded", () => {
   let categoriesShowMoreBlock = document.querySelector('.categories .categories__more')
   let categoriesShowMoreBtn = document.querySelector('.categories .show__more')

   let filter = document.querySelector('.filter')



   document.addEventListener('click', (event) => {
      let target = event.target

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