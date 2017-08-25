$(document).ready(function() {
    var controller = new ScrollMagic.Controller();
    
    //example1
    $('#example1-description').show(); //bug fix
    var tween1 = new TimelineMax();
    tween1  
        .add(TweenMax.fromTo('#example1', 1, {opacity: 0}, {opacity: 1, scale: 1.3, ease: Bounce.easeOut}))
        .add(TweenMax.fromTo('#example1-description', 0.7, {scale: 0}, {scale: 1, opacity: 1, ease: Bounce.easeOut}));
    var scene1 = new ScrollMagic.Scene({triggerElement: '#lim-example-1', duration: '100%'})
        .setTween(tween1)
        .setPin('#lim-example-1', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);


    //example2
    var $frame = $('rect#example2-frame')
        frameWidth = $('#example2').innerWidth()
        frameHeight = $('#example2').innerHeight();
    $frame.css({
        width: `${frameWidth}px`,
        height: `${frameHeight}px` 
    });
    configSVG($frame);
    $('#distanceSVG')
        .width('100%')
        .css('padding', '20%')
        .hide();
    function checkDistance() {
        //show distance covered in 2 d.p. 
        sequenceTerm.textContent = this.progress().toFixed(2);
    };
    function scaleDistance() {
        tween2.add(TweenMax.to('#distanceSVG', 1, {scale: 3, ease: Linear.easeOut}));
        tween2.removePause();
    }

    var tween2 = new TimelineMax();
    tween2
        .to('rect#example2-frame', 1, {strokeDashoffset: 0}, 0)
        .to('#example2', 0.5, {
                scale: 0.7,
                top: '-20vh',
                onComplete: function(){
                    if (!$('#distanceSVG').is(':visible')) {
                        $('#distanceSVG').show('pulsate', 'slow');
                    }
                }
            }, 1)
        .add('end', 2)
        .to('#distanceRect', 3, {width: 237, left: '10vw', ease: Linear.easeNone}, 'end')
        .staggerTo('.distance', 3, {x: 235, ease: Linear.easeNone, onUpdate: checkDistance}, 0, 'end')
        .addPause(5, scaleDistance)

    var scene2 = new ScrollMagic.Scene({triggerElement: '#lim-example-2', duration: '300%'})
        .setTween(tween2)
        .setPin('#lim-example-2', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

});