$(document).ready(function() {
    var controller = new ScrollMagic.Controller();
    
    //example1
    function checkDistance() {
        //show distance covered in 3 d.p. 
        var distanceCovered = this.progress().toFixed(3);
        if (distanceCovered >= 0.968) {
            return false;
        } else {
            distanceLeft.textContent = distanceCovered;
            $('#difference').text(Number(1 - distanceCovered).toFixed(3));
        }
    };

    //example1
    $('#distanceSVG').hide();
    $('#example1-description').show();
    configSVG($('path#arrow'));

    var scaleTween = new TimelineMax();
    scaleTween.add(TweenMax.staggerFromTo('#lim-example-1 h4', 0.5, {scale: 1}, {
        scale: 0.7,
        transformOrigin: 'top middle',
        ease: Back.easeOut.config(1.7)
    }, 0.3));

    var tween1 = new TimelineMax();
    tween1  
        .add(TweenMax.staggerFromTo('#lim-example-1 h4', 1, {opacity: 0, scale: 0}, {
            opacity: 1, 
            scale: 1, 
            ease: Bounce.easeOut
        }, 0.5, function(){
            scaleTween.play(0);
            if (!$('#distanceSVG').is(':visible')) {
                $('#distanceSVG').delay(1000).show('fade', 'slow');
            }
        }))
        .add('end', 3)
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
            svgOrigin: '235 40',
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.distance', 4, {
            x: 220,
            ease: Linear.easeOut,
            onUpdate: checkDistance,
            onComplete: function(){
                $('#arrow-ex').attr('y', $('#distanceSVG').height());
                $('#arrow-ex').attr('x', 100);
            }
        }, 0, 'end')
        .to('path#arrow', 0.5, {
            strokeDashoffset: 0,
            scale: 0.2,
            svgOrigin: "240 0",
            ease: Linear.easeOut
        })
        .fromTo('#arrow-ex', 1, {opacity: 0}, {opacity: 1, scale: 1, ease: Linear.easeOut});
    
    var scene1 = new ScrollMagic.Scene({triggerElement: '#lim-example-1', duration: '400%'})
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
    $('#sequenceSVG').hide();
    $('#example2-params').hide();
    
    var fractionMultiplier = 1;
    var fractionDenominator = 2;
    var oldTermCovered = 0;

    $('#nthTerm').on("change", function(){
        var nthTermNumber = Number.parseInt($(this).val());
        var tweenProgress = nthTermNumber*5/(nthTermNumber+1) + 1.45;
        $('#sequenceRect').width(240*nthTermNumber/(nthTermNumber+1));
        var nthTerm = `${nthTermNumber}/${++nthTermNumber}`;
        $('#sequenceEquals').text(nthTerm);
        $('#term').text(nthTerm);
        $('#sequenceTerm').text(`1/${nthTermNumber}`);
        tween2.resume(tweenProgress);
    });

    function checkTerm() {
        var termCovered = this.progress().toFixed(3);
        if (termCovered >= 0.968) {
            return false;
        }
        if (oldTermCovered > termCovered) {
            //check for 0/1 fraction and display nothing
            if (fractionMultiplier == 1) {
                term.textContent = "";
                $('#sequenceTerm').text("");
                $('#sequenceRect').width(0);
                return;
            }
            //it is going backwards
            if (termCovered < fractionMultiplier/fractionDenominator) {
                term.textContent = `${fractionMultiplier}/${fractionDenominator}`;
                $('#sequenceTerm').text(`${fractionDenominator - fractionMultiplier}/${fractionDenominator}`);
                $('#sequenceRect').width(225*fractionMultiplier/fractionDenominator);
                fractionMultiplier--;
                fractionDenominator--;
            }
        } else {
            //going forward
            if (termCovered > fractionMultiplier/fractionDenominator) {
                term.textContent = `${fractionMultiplier}/${fractionDenominator}`;
                $('#sequenceTerm').text(`${fractionDenominator - fractionMultiplier}/${fractionDenominator}`);
                $('#sequenceRect').width(225*fractionMultiplier/fractionDenominator);
                fractionMultiplier++;
                fractionDenominator++;
            }
        }
        oldTermCovered = termCovered;
    }

    var tween2 = new TimelineMax();
    tween2
        .to('rect#example2-frame', 1, {strokeDashoffset: 0}, 0)
        .to('#example2', 0.5, {
                scale: 0.7,
                transformOrigin: 'top middle',
                onComplete: function(){
                    if (!$('#sequenceSVG').is(':visible')) {
                        $('#example2-params').show('pulsate');
                        $('#sequenceSVG').show('pulsate', 'slow');
                    }
                    
                }
            }, 1)
        .add('end', 2)
        .to('#sequenceLine', 4, {
            scaleX: 0.025,
            transformOrigin: '100% top', 
            ease: Linear.easeNone
        }, 'end')
        .staggerTo('.termDistance', 4, {
            x: 220,
            ease: Linear.easeOut,
            onUpdate: checkTerm
        }, 0, 'end');
        
    var scene2 = new ScrollMagic.Scene({triggerElement: '#lim-example-2', duration: '400%'})
        .setTween(tween2)
        .setPin('#lim-example-2', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

    //example3
    var tween3 = new TimelineMax()
        .fromTo('#example3', 1, {opacity: 0, scale: 0.2}, {opacity: 1, scale: 1.3, y: '-100px', rotation: 360, ease: Linear.easeOut})
        .add(TweenMax.staggerFromTo('.lim-stagger', 4, {opacity: 0, scale: 3}, {opacity: 1, scale: 1, ease: Power4.easeOut}, 0.5,
            // on completeAll function
            function(){
                var tween3_1 = new TimelineMax();
                tween3_1.add(TweenMax.staggerTo('.lim-stagger', 1, {
                    y: '-80px',
                    transformOrigin: "top middle",
                    ease: Bounce.easeOut
                }, 0.3, 0));
                tween3_1.play();
            }
        ))
        .add(TweenMax.staggerFromTo('h4.property', 2, {
            scale: 0.3, 
            opacity: 0,
            x: '80%'
        }, {
            scale: 1, 
            opacity: 1,
            x: '0%',
            ease: Back.easeOut.config(1.7)
        }, 4));

    var scene3 = new ScrollMagic.Scene({triggerElement: '#lim-example-3', duration: '400%'})
        .setTween(tween3)
        .setPin('#lim-example-3', {pushFollowers: true})
        .triggerHook('onLeave')
        .addTo(controller);

});