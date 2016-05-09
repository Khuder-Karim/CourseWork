/**
 * Created by Karim on 13.04.2016.
 */

$(document).ready(function() {
    $('form[name="commentForm"]').submit(function(e) {
        e.preventDefault();

        var ad_id = $(this).attr('data-id');
        $.post('/ad/' + ad_id + '/comment', $('form[name="commentForm"]').serialize())
            .done(function() {
                location.reload();
            })
        ;
    })
});