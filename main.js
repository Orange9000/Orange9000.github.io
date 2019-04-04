$(document).ready(() => {
//------------------------------------------------------------------------------

  // отображение эл.почты по клику
  $('.mail').on('click', ()=> {
    if (!$('.contacts ul li').last().hasClass('show')) {
      $('.contacts ul').append(`<li class='play-font bold f-color show' style="font-size: 15px;">rollingonlinoleumfarting@gmail.com</li>`);
    }
  })

//------------------------------------------------------------------------------

  // "прогресс"-бары блока со скиллами
  for (var i=0; i<100; i++) {
      $('.sk1').css('width', `${i*0.8}%`);
      $('.sk2').css('width', `${i*0.6}%`);
      $('.sk3').css('width', `${i*0.6}%`);
  }

//------------------------------------------------------------------------------
  $('main').css('opacity', '1'); // fadeIn для левого блока

  setTimeout( ()=> { $('aside').css('opacity', '1') }, 500) // fadeIn для правого блока с задержкой

//------------------------------------------------------------------------------

  $lang = $('.lang-switch')
  var engActive = false


  // появление блоков с текстом при переключении языка
  $lang.on('click', function(){
    if (!engActive){
      $('.rus').hide();
      $('.eng').fadeIn(500).css('display', 'block'); //для центрования текста футера
      engActive = true;
    }
    else if (engActive) {
      $('.eng').hide();
      $('.rus').fadeIn(500);
      engActive = false;
    }
  });

//------------------------------------------------------------------------------

  // мерцания блока с эмайлом при клике на кнопку 'contact me'
  $('.contact').on('click', ()=> {

    $('.mail').get(0).scrollIntoView({behavior:'smooth', block:'center'}); //для случаев, когда эмайла нет во вьюпорте

    $('.mail').css('color', '#cf2d2d') // в красный -> мерцание
              .fadeIn(600)
              .fadeOut(600)
              .fadeIn(600)
              .fadeOut(600)
              .fadeIn(800)

   setTimeout( ()=> {$('.mail').css('color', '#54ba4e')}, 2000) // возврат в прежний цвет
  })

//------------------------------------------------------------------------------

});
