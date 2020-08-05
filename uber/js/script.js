window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
    
});

$(document).ready(function(){
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow')
    }); 
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeToggle()
    });

    function validateForms(form) {
        $(form).validate({
          rules: {
            name: {
              required: true,
             
            },
            tel: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
              required: "Ваше имя",
             
            },
            tel: {
              required: "Ваш номер телефона",
              phone: "Не веный формат"
            },
            email: {
              required: "Введите вашу почту",
              email: "Не верный формат"
            }
          }
        });
      };
    
      validateForms('#consultation form');
    
    
    $('input[name=phone]').mask("+7 (999) 99-99-999");
    
    $('form').submit(function(e) { //когда происходит отправка формы
        e.preventDefault(); //чтобы не перезагружалась страница после отправки формы
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset'); //по окончанию сброс формы
        });
        return false;
    });
});
