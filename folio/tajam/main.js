$(document).ready(() => {
//---------------------------------------------------------------------

  //анимаця меню навигации для смартфонов и планшетов

  $(".menubutton").on('click', ()=>{
    $(".hide_drop").slideToggle();
  })

//----------------------------------------------------------------------

  // скролл до блока при клике/тапе

  var sections = [$('#navbar'),
                  $('.about'),
                  $('.expertise'),
                  $('.team'),
                  $('.our_works'),
                  $('.testimonials'),
                  $('.clients')
                ].reverse()

  $('.scrollto').on('click', event => {
      var section = $(event.currentTarget).index()
      if ($(event.currentTarget).hasClass('nav')) section -= 2
      sections[section].get(0).scrollIntoView({behavior:'smooth', block:'center'})
  })

//--------------------------------------------------------------------

  //кликабельность выбора первого блока текста
  //(верх страницы)

  const texts = ['.p_top_text.a1',
                 '.p_top_text.a2',
                 '.p_top_text.a3',
                 '.p_top_text.a4']


  $(texts[0]).fadeIn(1000); // текст по умолчанию в блоке

  function cleanup(){
    // селекторы с низким specificity, которые применяют действие для _любой_ кнопоки
    // и любого параграфа

    $('.p_top_text').hide(); //очищаем блок под текст
    $('#nbuttons td').css('background-color', 'transparent '); //сбрасываем оформление всех кнопок
    $('#nbuttons td').css('border', '1px solid white'); // восстанавливаем границу элемента
  }

  $('#nbuttons td').on('click', event=> {
    var currentIndex=$(event.currentTarget).index();
    cleanup();
    $(texts[currentIndex]).fadeIn(1000);
    $(event.currentTarget).css( {backgroundColor:'#41e8e6', border:'none'} )
  })


//---------------------------------------------------------------------------
  //видео

  const $vcont = $('.vid_container span');
  const $vplay = $('.vid_container video');

  // убираем "оверлей" с плеера по клику
  $vplay.on('mousedown touchstart', ()=> {
    $vcont.fadeOut(500);

    // не мое. проверка на наличие тачскрина
    var touchDevice = 'ontouchstart' in window

    // старт видео по клику на моб. девайсах
    if (touchDevice) $('.vid_container video').get(0).play()

  })

//----------------------------------------------------------------------------

  //примитивная сампописная галерея

  //базовый путь до изобразжений
  const basePath = 'src/gallery/'
  const $gal = $('.gallery ul')


  function behavior(){
    //функция определяющая поведение элементов галереи

    $('.gal_ele').on('click', function() {

      var curImgPath = $(this).css('background-image')
      $('.gallery-modal').removeClass('hidden');
      $('.fullsize-container').css('background-image', curImgPath);
    })

      //-----------закрытие окна по клику---
    $('.close-fullsize').on('click', ()=> {
      $('.gallery-modal').addClass('hidden')
    })
      //-----------закрытие окна по кнопке escape---
    $(document).keyup(function(e) {
      if (e.keyCode == 27) $('.gallery-modal').addClass('hidden')
    })

  } //конец behavior

  behavior();

  const $loadMore = $('.load_button');
  const $galleryList = $('.gallery ul');
  const $collapse = $('.collapse-button');


  //допустим, что имена файлов уже известны
  //и содержатся в массиве
  const imgs = Array(24).fill(null).map((e,i)=> i+1)

  //подгрузка с индекса 4, т.к.
  //первые 4 подгружаются по дефолту
  var idx = 4
  var galleryFull = false;

  //подгрузка изображений по клику
  $loadMore.on('click', ()=> {

    //проверяем, были ли изображения галереи
    //уже загружены ранее в полной мере
    //если были, то просто раскрываем их снова
    if (galleryFull) {
      $('.gallery ul li').each( function(){
        if ($(this).hasClass('added')) {
          $(this).removeClass('hidden');

          //плавное появление через класс с opacity
          setTimeout( ()=> {$(this).removeClass('hidden-two')}, 500);
        }
      })
    }
    if (idx < imgs.length) {
      for (var j of imgs.slice(idx, idx+4)) {
        // добавление с классом hidden-two для последующего плавного появления
        // через opacity
        // добавляется + ряд из 4 изображений
        $galleryList.append(`<li class="gal_ele added hidden-two" style="background-image: url('${basePath}${j}.jpg');"></li>`)
        behavior();
      }
      idx+=4
      // плавное появление загруженного ряда изображений
      $('.gallery ul li').each( function(){
        setTimeout( ()=> { $(this).removeClass('hidden-two') } , 300);
      })
    }
    if (idx==imgs.length) {
      //если все изображения галереии подгружены
      //то заменяем кнопку подгрузки на кнопку свёртывания галереи
      $loadMore.addClass('hidden');
      $collapse.removeClass('hidden');
      galleryFull = true;
    }
  })

  //свертка галереи по клику
  $collapse.on('click', function(){
    $('.gallery ul li').each( function(){
      if ($(this).hasClass('added')) {

        //делаем через класс с opacity для плавной свёртки
        $(this).addClass('hidden-two');

        //задержка исчезновения элемента галереи для плавного перехода
        setTimeout(()=>{$(this).addClass('hidden')}, 500)
      }
    })
    //заменяем кнопку свёртки на кнопку подгрузки
    $loadMore.removeClass('hidden');
    $collapse.addClass('hidden');

    $('.our_works').get(0).scrollIntoView({behavior: 'smooth'})
  })




//--------------------------------------------------------------------------------------

  //раздел testimonials

  $('.photos img').on('mouseover', event => {
    $(event.currentTarget).addClass('img-active');
  })

  $('.photos img').on('mouseout', event => {
    $(event.currentTarget).removeClass('img-active');
  })




});
