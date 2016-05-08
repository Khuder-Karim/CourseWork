/**
 * Created by Karim on 10.04.2016.
 */
'use strict';

angular.module('courseApp', ['ui.router', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/',
                cache: false,
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

            .state('app.register', {
                url: 'register',
                views: {
                    'content@': {
                        templateUrl: 'views/register.html'
                    }
                }
            })

            .state('app.adEdit', {
                url: 'adEdit',
                views: {
                    'content@': {
                        templateUrl: 'views/adEdit.html'
                    }
                }
            })

            .state('app.adDetails', {
                url: 'ad/:id',
                views: {
                    'content@': {
                        templateUrl: 'views/adDetail.html'
                    }
                }
            })

            .state('app.profile', {
                url: 'profile',
                views: {
                    'content@': {
                        templateUrl: 'views/profile.html'
                    }
                }
            })

        ;

        $urlRouterProvider.otherwise('/');
    })
    .run(['SessionFactory', '$rootScope', function(SessionFactory, $rootScope) {
        SessionFactory.getSession();
        $rootScope.previousState;
        $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
        });
    }])

    .constant('baseURL', "http://localhost:3000/")
    //.constant('baseURL', "https://coursework-app.herokuapp.com/") // реальный сервер!
;