'use strict';

var adminApp = angular.module('adminApp', [ 'ngRoute', 'ngTable', 'toaster', 'ngStorage', 'angularUtils.directives.dirPagination' ]);

// configure our routes
adminApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : '/main',
		controller : 'mainController'
	})
	
		// route for the home page
	.when('/main', {
		templateUrl : '/main',
		controller : 'mainController'
	})
	
	// route for the recommendation page
		.when('/recommendationsOverview', {
		templateUrl : '/recommendationsOverview',
		controller : 'recommendationOverviewController'
	})

	// route for the users page
	.when('/users', {
		templateUrl : '/users',
		controller : 'usersController'
	})
	
	// route for the log out page
	.when('/logout', {
	templateUrl : '/logout',
	controller : 'logoutController'
	});

});

// create the controller and inject Angular's $scope
adminApp.controller('mainController', function($scope, $window, $timeout) {
	
	$scope.user_name = $window.sessionStorage.getItem("user_name");
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
});

adminApp.controller('recommendationOverviewController', function($scope, $http, $window, $timeout, NgTableParams, toaster) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
	
	function getAllRecommendations(){
		var url = "api/recommendations/display";
		
		$http.get(url).then( response => {
			$scope.recommendations = response.data;
		      $scope.recommedationlist = new NgTableParams(
		    		  {
		            	  dataset: $scope.recommendations
		              });
		});
	}
		getAllRecommendations();
		
	
 $scope.openModal=function (obj) { 
	 $scope.selected_recommendation=obj; 
	 };

   $scope.approve = function () { 
	   var recommendation_id=$scope.selected_recommendation.recommendation_id; 
	   var url = '/api/recommendations/update/'+recommendation_id; 
	   var data = ({ 
		   user_email: $scope.selected_recommendation.user_email, 
		   recommendation_title: $scope.selected_recommendation.recommendation_title, 
		   recommendation_text: $scope.selected_recommendation.recommendation_text, 
		   recommendation_location: $scope.selected_recommendation.recommendation_location,
		   recommendation_category: $scope.selected_recommendation.recommendation_category, 
		   recommendation_link: $scope.selected_recommendation.recommendation_link, 
		   recommendation_pic: $scope.selected_recommendation.recommendation_pic,
		   recommendation_rating: $scope.selected_recommendation.recommendation_rating,
		   votes: $scope.selected_recommendation.votes,
		   rating_total: $scope.selected_recommendation.rating_total,
		   average_rating: $scope.selected_recommendation.average_rating,
		   is_approved: $scope.selected_recommendation.is_approved
		   });
  
	   $http.put(url, data).then(function (response) { 
		   $timeout(function(){
			   toaster.pop('success', "Success", "recommendation status changed");
			   }); 
		   getAllRecommendations();
		   }, function (response) { 
			   $timeout(function(){
				   toaster.pop('error', "Oops", "something went wrong"); 
				   });
			   getAllRecommendations();
			   }); 
	   };

	   $scope.deleteData = function () { 
		   var recommendation_id=$scope.selected_recommendation.recommendation_id; 
		   var url = '/api/recommendations/delete/'+recommendation_id; 
		   var data = ({ 
			   recommendation_title: $scope.selected_recommendation.recommendation_title
			   });
		   $http.delete(url, data).then(function (response) { 
			   $timeout(function(){
				   toaster.pop('success', "Success", $scope.selected_recommendation.recommendation_title+" deleted");
				   }); 
			   getAllRecommendations();
			   }, function (response) { 
				   $timeout(function(){
					   toaster.pop('error', "Oops", "something went wrong");
					   }); 
			   getAllRecommendations();
				   }); 
		   };
});

adminApp.controller('usersController', function($scope, $http, $window, $timeout, NgTableParams, toaster) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
	
	function getAllUsers(){
	var url = "api/users/display";
	
	$http.get(url).then( response => {
		$scope.users = response.data;
		$scope.userlist = new NgTableParams(
        { 
			dataset: $scope.users
       });
	});
	}
	getAllUsers();
	
	$scope.openModal=function (obj) {
		  $scope.selected_user=obj;
		  };
		  
			 $scope.addAdmin = function() {
					var url = '/api/users/add';
					var config='contenttype';
					var data= ({
						user_email: $scope.user_email,
						user_name: $scope.user_name_new
					});
					
					$http.post(url, data, config).then(function (response) {
						$timeout(function(){
							toaster.pop('success', "Success", "new admin created");		
						    });
						resetForm();
						getAllUsers();
					}, function (response) {
						$timeout(function(){
							toaster.pop('error', "Oops", "Something went wrong. Please check if email is in email format" +
									" and the name is valid. You can't add duplicate email!");
						    });
						resetForm();
						getAllUsers();
					});
				};
				  $scope.deleteUser = function () {
					  var user_email=$scope.selected_user.user_email;
					  var url = '/api/users/delete/'+user_email;

			          $http.delete(url).then(function (response) {
			  			$timeout(function(){
			  				toaster.pop('success', "Success", $scope.selected_user.user_email+" deleted");
						    });
			  			getAllUsers();
					}, function (response) {
						$timeout(function(){
							toaster.pop('error', "Oops", "something went wrong");
						    });
						getAllUsers();
					});
			      };
			      function resetForm(){
			    	  $scope.user_email="";
			    	  $scope.user_name_new="";
			      }
});

adminApp.controller('logoutController', function($scope, $window, $timeout) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}

  	$window.sessionStorage.setItem("session_id","");
  	$window.sessionStorage.setItem("user_name","");
  	$timeout(function() { 
  		$window.location.href = 'http://localhost:8080/';	
  	}, 1500);
});
