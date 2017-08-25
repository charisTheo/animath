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
        //show distance covered in 3 d.p. 
        if (this.progress().toFixed(3) > 0.973) {
            sequenceTerm.textContent = 0.999;
        } else {
            sequenceTerm.textContent = this.progress().toFixed(3);
        }
    };

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
        .add('scale', 4.4)
        .add('end', 2)
        .to('#distanceRect', 4, {
            width: 232, 
            left: '10vw', 
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.distance', 4, {
            x: 230,
            ease: Linear.easeNone,
            onUpdate: checkDistance
        }, 0, 'end')
        .to('#sequenceTerm', 0.5, {
            scale: 0.5,
            transformOrigin: '0 50%',
            ease: Linear.easeOut
        }, 'scale')
        .to('#distanceSVG', 0.5, {
            scale: 2.5,
            transformOrigin: '100% 50%',
            ease: Linear.easeOut
        }, 'scale'); 
        
    var scene2 = new ScrollMagic.Scene({triggerElement: '#lim-example-2', duration: '300%'})
        .setTween(tween2)
        .setPin('#lim-example-2', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

});