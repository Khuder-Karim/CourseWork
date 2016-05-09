/**
 * Created by Karim on 13.04.2016.
 */

$(document).ready(function() {
    $('.commentAd').click(function(e) {
        e.preventDefault();

        var ad_id = $(e.target).attr('data-id');
        $.post('/ad/' + ad_id + '/comment', $('form[name="commentForm"]').serialize())
            .done(function() {
                location.reload();
            })
        ;
    })
});