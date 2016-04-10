/**
 * Created by Karim on 10.04.2016.
 */

angular.module('courseApp')

    .controller('UserController', ['$scope', '$state', 'UserFactory', 'SessionFactory', function($scope, $state,
                                                                                                 UserFactory, SessionFactory) {

        $scope.userObject = {
            username: '',
            password: ''
        };

        $scope.logout = function() {
            UserFactory.logout().save(
                function() {
                    console.log("Good");
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function() {
                    console.log("Bad");
                }
            );
        };

        $scope.login = function() {
            UserFactory.login().save($scope.userObject,
                function() {
                    console.log("Hello " + $scope.userObject.username);
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(response) {
                    console.log(response.message);
                }
            );
        };

    }])
;