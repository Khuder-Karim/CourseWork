$(document).ready(function() {

    $('form[name="searchForm"]').submit(function(e) {
        var form = $(this);
        var searchField = $('input[name="searchField"]').val();
        $.ajax({
            method: 'GET',
            url: '/',
            data: form.serialize()
        })
            .done(function() {
                window.location.href = '/?searchField=' + searchField;
            })
    });

    $('.logout-btn').click(function() {
        $.post('/logout')
            .done(function() {
                window.location.href = "/";
            })
        ;
    });

    $('form[name="LoginForm"]').submit(function(e) {
        e.preventDefault();
        var form = $(this);

        $.post('/login', form.serialize())
            .done(function() {
                window.location.href = "/";
            })
            .fail(function(jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.errorResponse').html(error.message);
            })
        ;
    });

    $('form[name="RegisterForm"]').submit(function(e) {
        e.preventDefault();
        var form = $(this);

        var phone = $('input[name="phone"]').val();

        if(phone && (phone.length != 10 || !$.isNumeric(phone) || phone[0] != 0)) {
            $('.errorResponse').html("Введите валидный номер телефона <br> (Пример: 0548542354)");
            return;
        }

        $.post('/user', form.serialize())
            .done(function(response) {
                if(!response)
                    window.location.href = "/";
                else
                    $('.errorResponse').html(JSON.parse(response.responseText).message);

            })
            .fail(function(jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                $('.errorResponse').html(error.message);
            })
    })

});
