var idleTime = 0;
$(document).ready(()=>{
    /* Idle time for no scroll */
    $('#scrollReminder').hide();
    var idleInterval = setInterval(idleCheck, 500);

    function idleCheck(){
        idleTime++;
        if (idleTime > 6 && $('body').scrollTop() < 50) {
            $('#scrollReminder')
                .css({
                    top: window.innerHeight - 80 + 'px'
                })
                .toggle('fade');
        } else if ($('body').scrollTop() > 50) {
            $('#scrollReminder').hide();
            clearInterval(idleInterval);
        }
    }

    //#intro
    $('.description').hide().delay(1000).toggle('fold');

    //#example
    //#example1
    var controller = new ScrollMagic.Controller();
    var tween = TweenMax.to('#example1', 1, {
        rotation: 360, 
        scale: 1.5,
        opacity: 1,
        ease: Linear.easeNone
    });
    var scene = new ScrollMagic.Scene({triggerElement: '#example-1', duration: 200})
        .setTween(tween)
        .triggerHook('onLeave')
        .setPin('#example-1', {pushFollowers: false})
        .addTo(controller);

    //example2
    var controller2 = new ScrollMagic.Controller();
    var tween2 = TweenMax.staggerFromTo('.box', 2, {left: '100%'}, {left: 0, ease: Back.easeOut}, 0.15);
    var scene2 = new ScrollMagic.Scene({triggerElement: '#example-2', duration: 500})
        .setTween(tween2)
        .addTo(controller2);
});