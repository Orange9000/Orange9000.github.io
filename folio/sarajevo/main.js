$(document).ready(() => {
//------------------------------------------------------------------------------
  // не моё. проверка на наличие контейнера во вьюпорте
  $.fn.inView = function(){
    //Window Object
    var win = $(window);
    //Object to Check
    obj = $(this);
    //the top Scroll Position in the page
    var scrollPosition = win.scrollTop();
    //the end of the visible area in the page, starting from the scroll position
    var visibleArea = win.scrollTop() + win.height();
    //the end of the object to check
    var objEndPos = (obj.offset().top + obj.outerHeight());
    return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
  };


//------------------------------анимация зависимая от скролла--------------------

  //для лучшей производительности: проверка на скролл
  var scrolling = false;

  $(window).on('load scroll', function() {
    scrolling = true;
  });

  function animateNums(){
    //анимация цифр в разделе facts
    $('.facts-numbers').each( function() {
      const target = +$(this).data('num')
      const step = Math.ceil(target/50)
      var val = +$(this).text()

      if (val < target) $(this).text(val+=step)
    }) // end jquery each
  } //end animate


  setInterval( function() {
    // обёртка всех проверок на скролл
    // через serinterval в 250мс для лучшей производительности
    if (scrolling) {
      scrolling = false;
      //-------------------------features------
      if ( $('.features-ul li').inView() ) {
        $('.features-ul').css( {left:'0',position:'relative', opacity: '1'} );
      }
      //-------------------------facts-----------------
      if ($('.facts-numbers').inView()) {
        for (var i=0; i<100; i++) setTimeout(animateNums, i*50)
      }
    }
  }, 250)


//-----------------------кнопка скролла к самому верху страницы для малых экранов

  $('.up-button').on('click', ()=> {
    $('.home').get(0).scrollIntoView({behavior: 'smooth'});
  })

//-----------------------------поведение панели навигации для малых экранов-----

  const $nb = $('.nav-button')
  const $cb = $('.close-button')
  const $mn = $('.mobile-nav')

  function showNav() {
    $mn.removeClass('hide').animate({left:'0'}, 200)
    $nb.css('visibility', 'hidden')
  }

  function hideNav() {
    $mn.animate({left:'-100%'}, 200)
    $nb.css('visibility', 'visible')
  }


  $nb.on('click', ()=> showNav() )
  $cb.on('click', ()=> hideNav() )


  // закрытие меню мобильной навигации
  // в случае перехода из CSS малых экранов
  // в CSS десктопа (поворот экрана)
  $(window).resize(function (){
    if ($(window).width() >= 1024) {
      hideNav();
      $mn.addClass('hide')
    }
  })


//----------------------------поведение пунктов панели навигации----------------
  const sections = [
                    $('.features'),
                    $('.works'),
                    $('.team'),
                    $('.discuss'),
                    $('footer')
                    ]

  $('.navigation li').on('click', function() {
    var currentIndex = $(this).index() - 1
    sections[currentIndex].get(0).scrollIntoView({behavior:'smooth', block:'start'});
  })

//-------------------------home-------------------------------------------------

    // плавное появление при загрузке страницы
    $('.home-text-container').css('opacity', '1');


    // анимация для икнок соцсетей
    // при загрузке страницы
    for (var i=1; i<5; i++) {
      $('.social-home li').find('img').eq(i-1).animate({opacity: 1}).delay(i*500).animate({opacity: 0.3})
    }

    $('.social li img').hover(
      function () { $(this).css('opacity', '1') },
      function () { $(this).css('opacity', '0.3') }
    )
//------------------------------iphone------------------------------------------

  $('.iphone-ul li').on('mouseover', function() {
    var currentLi = $(this).data('pic')
    $('.iphone-screen').attr('src', `src/misc/iphone/screens/${currentLi}.png`)
  })


//--------------------------------галерея---------------------------------------

  //прелоад галереи при первом открытии страницы
  for (var i=0; i<8; i++) {
    $('.works-gallery').find('li').eq(i).css('background-image', `url('src/gallery/all/${i+1}.png')`)
  }
  $('.works-selection li:first-child').css({
    backgroundColor: '#4c76ff',
    borderRadius: '5px'
  })
  //-----------------------------------
  const basePath = 'src/gallery/'
  const works = ['all', 'branding', 'web', 'logo', 'photo'] //локальные папки


  // смена категории + подгрузка изображений по клику
  $('.works-selection li').on('click', function() {

    // сброс вида всех кнопок
    $('.works-selection li').each(function() {
      $(this).css('background-color', 'transparent')
    })

    var currentWork = $(this).index()
    var currentPath = `${basePath}${works[currentWork]}/`

    // текущая нажатая кнопка
    $(this).css({
      backgroundColor: '#4c76ff',
      borderRadius: '5px'
    })

    // загрузка изображений в галерею
    for (var i=0; i<8; i++) {
      $('.works-gallery').find('li').eq(i).css('background-image', `url(${currentPath}${i+1}.png)`)
    }

  })

  //------------фуллсайз по клику----
  $('.works-gallery li').on('click', function() {
    var curImgPath = $(this).css('background-image')
    $('.gallery-modal').removeClass('hide');
    $('.fullsize-container').css('background-image', curImgPath);
  })
  //-----------закрытие окна по клику---
  $('.close-fullsize').on('click', ()=> {
    $('.gallery-modal').addClass('hide')
  })
  //-----------закрытие окна по кнопке escape---
  $(document).keyup(function(e) {
    if (e.keyCode == 27) $('.gallery-modal').addClass('hide')
  })



//------------------------------team people-------------------------------------

  // смена цвета имени при ховере на фото
  $('.team-people li').hover(
    function () {
      $(this).find('.team-name').css('color', '#56cab3')
    },
    function () {
      $(this).find('.team-name').css('color', 'inherit')
    }
  )

});
