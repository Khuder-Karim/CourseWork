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

        $scope.registerData = {
            username: '',
            password: '',
            email: '',
            phoneNumber: ''
        };
        $scope.SellerCheckBox = false;

        $scope.errorMessage = '';

        $scope.register = function() {

        };

        $scope.logout = function() {
            UserFactory.logout().save(
                function() {
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    $scope.errorMessage = err.message;
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
                function(err) {
                    console.log(err.data);
                    $scope.errorMessage = err.data.message;
                }
            );
        };

        $scope.register = function() {
            UserFactory.register().save($scope.registerData,
                function() {
                    console.log("Hello " + $scope.userObject.username);
                    SessionFactory.getSession();
                    $state.go('app');
                },
                function(err) {
                    console.log(err.statusText);
                }
            );
        }

    }])
;