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
        $arrow = $('path.arrow')
        frameWidth = $('#example2').innerWidth()
        frameHeight = $('#example2').innerHeight();
    $frame.css({
        width: `${frameWidth}px`,
        height: `${frameHeight}px` 
    });
    configSVG($arrow);
    configSVG($frame);
    $('#distanceSVG').hide();
    $('#arrowSVG').hide();
    $('#example2-arrow-ex').hide();

    function checkDistance() {
        //show distance covered in 3 d.p. 
        var distanceCovered = this.progress().toFixed(3);
        if (distanceCovered >= 0.968) {
            return false;
        } else {
            sequenceTerm.textContent = distanceCovered;
            $('#difference').text(Number(1 - distanceCovered).toFixed(3));
        }
    };

    var tween2 = new TimelineMax();
    tween2
        .to('rect#example2-frame', 1, {strokeDashoffset: 0}, 0)
        .to('#example2', 0.5, {
                scale: 0.7,
                top: '-10vh',
                onComplete: function(){
                    if (!$('#distanceSVG').is(':visible')) {
                        $('#distanceSVG').show('pulsate', 'slow');
                    }
                }
            }, 1)
        .add('scale', 4.4)
        .add('end', 2)
        .to('#distanceRect', 4, {
            width: 222, 
            left: '10vw', 
            ease: Linear.easeNone,
            onUpdate: function(){
                if (this.progress() >= 0.968) false;
            },
        }, 'end')
        .to('#differenceLine', 4, {
            scaleX: 0.025,
            transformOrigin: '100% top', 
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.distance', 4, {
            x: 220,
            ease: Linear.easeOut,
            onUpdate: checkDistance,
            onComplete: function(){
                $('#arrowSVG').show('fade');
            }
        }, 0, 'end')
        .to('#sequenceTerm', 0.5, {
            scale: 0.5,
            transformOrigin: '0 50%',
            ease: Linear.easeOut
        }, 'scale')
        .to('#distanceSVG', 0.5, {
            scale: 2.5,
            transformOrigin: '80% 50%',
            ease: Linear.easeOut
        }, 'scale')
        .staggerTo('path.arrow', 1, {
            strokeDashoffset: 0, 
            ease: Linear.easeOut,
            onComplete: function(){
                if (!$('#example2-arrow-ex').is(':visible')) {
                    $('#example2-arrow-ex').show('fade', 'slow');
                }
            }
        }, 0.5, 'end+=2');
        
    var scene2 = new ScrollMagic.Scene({triggerElement: '#lim-example-2', duration: '400%'})
        .setTween(tween2)
        .setPin('#lim-example-2', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);
});