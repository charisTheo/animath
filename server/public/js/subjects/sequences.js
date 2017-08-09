var idleTime = 0;
$(document).ready(()=>{
    /* Idle time for no scroll */
    $('#scrollReminder').hide();
    var idleInterval = setInterval(idleCheck, 500);

    function idleCheck(){
        idleTime++;
        if (idleTime > 8 && $('body').scrollTop() < 50) {
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

    $('.description').hide();
    //#intro
    $('#intro-description').delay(1000).toggle('fold');

    //#example
    //#example1
    var controller = new ScrollMagic.Controller();
    var tween = new TimelineMax();
    tween.add(TweenMax.to('#example1', 1, {
        rotation: 360, 
        scale: 1.5,
        opacity: 1,
        ease: Linear.easeNone
    }));
    tween.add(TweenMax.to('#example1-hr', 0.3, {
        width: '80%', 
        duration: 300,
        ease: Linear.easeNone,
        onComplete: function(){$("#example1-description").toggle('bounce', {times: 3}, "slow")}
    }));

    var scene = new ScrollMagic.Scene({triggerElement: '#seq-example-1', duration: 300})
        .setTween(tween)
        .triggerHook('onLeave')
        .setPin('#seq-example-1', {pushFollowers: true})
        .addTo(controller);

    //#example2
    var tween2 = new TimelineMax();
    tween2.add(TweenMax.staggerFromTo('.box', 0.7, {left: '100%'}, {left: 0, scale: 1.5, ease: Back.easeOut}, 0.25));
    tween2.add(TweenMax.to('#example2-hr', 0.3, {
        width: '80%',
        duration: 300,
        ease: Linear.easeNone,
        onComplete: function(){$("#example2-description").toggle("bounce", {times: 3}, "slow")}
    }));
    var scene2 = new ScrollMagic.Scene({triggerElement: '#seq-example-2', duration: 400, offset: 200})
        .setTween(tween2)
        .setPin('#seq-example-2', {pushFollowers: true})
        .triggerHook('onCenter')
        .addTo(controller);

    var $path = $('path#line')
    var lineLength = $path[0].getTotalLength();
    $path.css('stroke-dasharray', lineLength);
    $path.css("stroke-dashoffset", lineLength);

    //#example3
    var tween3 = new TimelineMax();
    tween3.add(
        TweenMax.to($path, 1.5, {strokeDashoffset: 0, ease:Linear.easeNone, onComplete: function(){
            $('#example3').slideDown('slow');
        }})
    );
    tween3.add(
        TweenMax.to($path, 0.1, {strokeDasharray: '11, 22', ease:Linear.easeNone})
    );
    var scene3 = new ScrollMagic.Scene({triggerElement: '#svg-line-section', duration: 300})
        .setTween(tween3)
        .triggerHook('onLeave')
        .addTo(controller);

    //#example4        
    var tween3_4 = TweenMax.fromTo('#eight', 2, {scale: 0}, {scale: 2, opacity: 0, repeat: 4, yoyo: true, duration: 1000, onComplete: function(){
        $('#example4').hide().toggle('pulsate', {times: 3});
    }});
    var scene3_4 = new ScrollMagic.Scene({triggerElement: '#seq-example-3', duration: 500})
        .setTween(tween3_4)
        .setPin('#eight', {pushFollowers: true})
        .triggerHook('onLeave')        
        .addTo(controller);

    var tween4 = TweenMax.to('#example4-hr', 0.3, {
        width: '80%',
        duration: 300,
        ease: Linear.easeNone,
        onComplete: function(){$('#example4-description').hide().toggle('bounce', {times: 3})}
    });
    var scene4 = new ScrollMagic.Scene({triggerElement: '#seq-example-4', duration: 400})
        .setTween(tween4)
        .setPin('#seq-example-4', {pushFollowers: true})
        .triggerHook('onCenter')
        .addTo(controller);

    

});