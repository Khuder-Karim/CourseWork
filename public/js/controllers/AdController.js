$(document).ready(function() {

    $('form[name="AdForm"]').submit(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/ad',
            type: 'POST',
            data: new FormData( this ),
            processData: false,
            contentType: false
        })
            .done(function() {
                window.location.href = "/";
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
                window.location.href = '/';
            })
        ;
    });

});
        //$scope.Submit = function() {
        //    if(parseInt($scope.adSchema.price)) {
        //        AdFactory.post($scope.adSchema);
        //    } else {
        //        $scope.errorMessage = "Enter correct price";
        //    }
        //};
        //
        //$scope.subscribe = function(adId) {
        //    SubscribeFactory.subscribe().save({id: adId}, {}, function() {
        //        console.log("subscribe");
        //        SessionFactory.getSession();
        //        $state.reload();
        //    });
        //};
        //
        //$scope.unsubscribe = function(adId) {
        //    SubscribeFactory.unsubscribe().save({id: adId}, {}, function() {
        //        console.log("unsubscribe");
        //        SessionFactory.getSession();
        //        $state.reload();
        //    });
        //};
        //
        //$scope.isSubscription = function(adId) {
        //    var res = false;
        //
        //    $rootScope.user.liked.forEach(function(like) {
        //        if(like == adId)
        //            res = true;
        //    });
        //    return res;
        //};
        //
        //$scope.deleteAd = function(adId) {
        //    AdFactory.getAds().remove({id: adId})
        //        .$promise.then(function() {
        //            $state.reload();
        //        })
        //    ;
        //};
