$(document).ready(function() {
    $(window).resize(() => false);
    $(document).resize(() => false);

    $('<div id="nav-blob"></div>').css({
        width: 0,
        height: $("#navigation ").height(),
        backgroundColor: "orange",
        position: "absolute",
        zIndex: -1
    }).prependTo("#navigation");

    $('#navigation a').hover(function(){
        //Mouseover
        $('#nav-blob').animate({
            width: $(this).width() + 10,
            left: $(this).position().left,
            opacity: 1
        }, {
            duration: "slow",
            easing: "easeOutBounce",
            queue: false
        });
    }, function(){
        //Mouseout
        $('#nav-blob').animate({
            left: $('#navigation li:first a').position().left,
            opacity: 0
        }, "fast");

    });

    $('.page-scroll').click(function(e){
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 800, 'easeOutBounce');
    });

});