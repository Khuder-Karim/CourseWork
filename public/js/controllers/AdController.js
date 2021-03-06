$(document).ready(function() {

    $('form[name="AdForm"]').submit(function(e) {
        e.preventDefault();

        if(!$.isNumeric($('input[name="price"]').val())) {
            $('.errorResponse').html('Введите валидну цену');
            return;
        }

        $.ajax({
            url: '/ad',
            type: 'POST',
            data: new FormData( this ),
            processData: false,
            contentType: false
        })
            .done(function() {
                window.location.href = "/myaccount";
            })
            .fail(function(jqXHR) {
                var error = JSON.parse(jqXHR);
                $('.errorResponse').html(error.message);
            })
        ;
    });

    $('.deleteAd-btn').click(function(e) {
        var target = $(e.target);
        if(!target.attr('data-id'))
            target = target.parent();
        $.ajax({
            url: '/ad/' + target.attr('data-id'),
            type: 'DELETE'
        })
            .done(function() {
                location.reload();
            })
        ;
    });

    $('.subscription-btn').click(function(e) {
        var target = $(e.target);
        if(!target.attr('data-id'))
            target = target.parent();
        $.post('/ad/' + target.attr('data-id') + '/subscribe')
            .done(function() {
                location.reload();
            })
        ;
    });

    $('.unSubscription-btn').click(function(e) {
        var target = $(e.target);
        if(!target.attr('data-id'))
            target = target.parent();
        $.post('/ad/' + target.attr('data-id') + '/unsubscribe')
            .done(function() {
                location.reload();
            })
        ;
    });
});
