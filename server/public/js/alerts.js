function createAlert(text, type, timeout) {
    var alertElem = document.createElement('div');
    alertElem.innerHTML = `<div class='alert alert-${type} alert-dismissible' role='alert'>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span style="font-family: sans-serif;" aria-hidden="true">&times;</span>
        </button>${text}</div>`;
    $('body').append(alertElem);

    $('button.close').click(function(e) {
        e.preventDefault();
        $('.alert').slideUp('slow').fadeOut('slow');
    });
    if (timeout) {
        setTimeout(() => {
            var s = alertElem.style;
            s.opacity =1;
            (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,30)})();
        }, timeout);
    }

};

function notification(text) {
    $('<div class="notification"></div>')
        .text(text)
        .appendTo('body')
        .show()
        .delay(2000)
        .slideUp('slow')
        .fadeOut();
};