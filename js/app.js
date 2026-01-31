// const marquee = document.querySelector('.marquee-content');
// Остановка при наведении
// marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
// Запуск при уводе мыши
// marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 100,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Форма отправки на WhatsApp и почту
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const message = form.querySelector('[name="message"]').value;
    
    // Проверка заполнения полей
    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон');
      return;
    }
    
    // Номер WhatsApp
    const whatsappNumber = '+61493457675';
    const whatsappText = `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;
    
    // Создаём FormData для отправки на почту
    const formData = new FormData(form);
    formData.append('_captcha', 'false');
    formData.append('_next', window.location.href);
    
    // Отправка на почту через FormSubmit
    fetch('https://formsubmit.co/info@fixit-pro.com.au', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      const statusDiv = document.getElementById('formStatus');
      
      // Показываем сообщение с анимацией
      statusDiv.style.display = 'block';
      
      // Сбрасываем форму и открываем WhatsApp
      form.reset();
      window.open(whatsappUrl, '_blank');

      // Плавно скрываем через 5 секунд
      // setTimeout(() => {
      //   statusDiv.style.opacity = '0'; // Сначала делаем прозрачным
      //   setTimeout(() => {
      //       statusDiv.style.display = 'none'; // Затем полностью убираем
      //       statusDiv.style.opacity = '1';    // Возвращаем непрозрачность для следующего раза
      //   }, 500); 
      // }, 5000);
    })
  });
}

// Кнопка "Вверх"
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Показать больше карточек
const moreCardsBtn = document.getElementById('moreCardsBtn');

if (moreCardsBtn) {
  moreCardsBtn.addEventListener('click', function() {
    const hiddenCards = document.querySelectorAll('.explore__card--hidden');
    hiddenCards.forEach(card => {
      card.classList.remove('explore__card--hidden');
      card.classList.add('explore__card--show');
    });
    // Скрываем кнопку после клика
    moreCardsBtn.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-show');
            }
        });
    }, {
        threshold: 0.1 // Сработает, когда 10% карточки появится в поле зрения
    });

    const cards = document.querySelectorAll('.explore__card');
    cards.forEach(card => observer.observe(card));
});

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-scroll-to]')
  if (!trigger) return

  const target = document.getElementById(trigger.dataset.scrollTo)
  if (!target) return

  smoothScrollTo(target, 600)
})

function smoothScrollTo(target, duration = 800) {
  const startY = window.scrollY
  const targetY = target.getBoundingClientRect().top
  const delta = targetY
  const startTime = performance.now()

  function step(time) {
    const progress = Math.min((time - startTime) / duration, 1)

    // 🔥 ЛИНЕЙНО — без ватного старта
    window.scrollTo(0, startY + delta * progress)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)


}