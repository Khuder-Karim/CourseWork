/**
 * Created by Karim on 10.04.2016.
 */
'use strict';

angular.module('courseApp', ['ui.router', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl: 'views/header.html'
                    },
                    'content': {
                        templateUrl: 'views/home.html'
                    },
                    'footer': {
                        templateUrl: 'views/footer.html'
                    }
                }
            })

            .state('app.login', {
                url: '/login',
                views: {
                    'content@': {
                        templateUrl: 'views/login.html'
                    }
                }
            })

        ;

        $urlRouterProvider.otherwise('/');
    })
    .run(['SessionFactory', function(SessionFactory) {
        SessionFactory.getSession();
    }])
;