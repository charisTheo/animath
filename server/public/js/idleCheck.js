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
});

function configSVG($el) {
    for (var i = 0; i < $el.length; i++) {
        var lineLength = $el[i].getTotalLength();
        i++;
    }
    $el.css('stroke-dashoffset', lineLength);
    $el.css('stroke-dasharray', lineLength);
}