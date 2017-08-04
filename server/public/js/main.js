$(document).ready(function() {
    $(window).resize(() => false);
    $(document).resize(() => false);

    $('<div id="nav-blob"></div>').css({
        width: 0,
        height: '2px',
        backgroundColor: "#FF8C00",
        position: "absolute",
        zIndex: -1,
        bottom: 0
    }).prependTo("nav ul");

    $('nav a').hover(function(){
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
            left: $('nav li:first a').position().left,
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