'use strict';

var userApp = angular.module('userApp', [ 'ngRoute', 'ngTable', 'ngStorage', 'toaster', 'angularUtils.directives.dirPagination' ]);

// configure our routes
userApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : '/about',
		controller : 'mainController'
	})

	// route for the about page
	.when('/about', {
		templateUrl : '/about',
		controller : 'mainController'
	})

	// route for the recommendation page
	.when('/recommendations', {
		templateUrl : '/recommendations',
		controller : 'recommendationController'
	})

	// route for the my recommendation page
		.when('/myRecommendation', {
		templateUrl : '/myrecommendation',
		controller : 'myRecommendationController'
	})
	
		// route for the top 10 page
		.when('/top10', {
		templateUrl : '/top10',
		controller : 'top10Controller'
	})
	
	// route for the log out page
		.when('/logout', {
		templateUrl : '/logout',
		controller : 'logoutController'
	});

});
//create the directive for star rating
userApp.directive('starRating', function($rootScope) {
			return {
				restrict : 'A',
				scope: true,
				template : '<ul class="rating">'
						 + '	<li class="fas fa-star" ng-repeat="star in stars" ng-class="star"'
						 +' ng-click="toggle($index)">'
						 + '</li>'
						 + '</ul>',
				scope : {
					ratingValue : '=',
					max : '=',
					dtId: '=',
					dtVotes: '=',
					dtTotal: '=',
					dtAverage: '=',
					onRatingSelected : '&'

				},
				link : function(scope, elem, attrs) {
					var updateStars = function() {
						scope.stars = [];
						for ( var i = 0; i < scope.max; i++) {
							scope.stars.push({
								filled : i < scope.ratingValue
							});
						}
					};
						var getId = function() { 
							$rootScope.id=scope.dtId;
						};
						var getVotes = function() { 
							scope.dtVotes++;
							$rootScope.votes=scope.dtVotes;
						};
						var getAverage = function() {
							scope.dtAverage = scope.dtTotal/scope.dtVotes;
							$rootScope.average=scope.dtAverage;
						};
						var getTotal = function() {
							scope.dtTotal+=scope.ratingValue;
							$rootScope.total=scope.dtTotal;
						};
						
					scope.toggle = function(index) {
						getId();
						getVotes();
						scope.ratingValue = index + 1;
						getTotal();
						getAverage();
						scope.onRatingSelected({
							rating : index + 1,
						});
					};
					updateStars();
					scope.$watch('ratingValue',
						function(newVal, oldVal) {
							if (newVal) {
								updateStars();
								
							}
						}
					);
				}
			};
		}
	);

// create the controller and inject Angular's $scope
userApp.controller('mainController', function($scope, $window, $timeout) {
	
	$scope.user_name = $window.sessionStorage.getItem("user_name");
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}  
});

userApp.controller('recommendationController', function($scope, $http, $rootScope, $timeout, toaster, $window) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
	
	$scope.recommendations =[];
	
	function getAllRecommendations(){
		var url = "/api/recommendations/display";
		
		$http.get(url).then( response => {
			$scope.getDivAvailable = true;
			$scope.recommendations = response.data;
			});
	}
	getAllRecommendations();
		
    	$scope.rateFunction = function(rating) {
        var recommendation_id=$rootScope.id;
		var url = '/api/recommendations/updateRating/'+recommendation_id;
	    var data = ({
			recommendation_rating: rating,
			votes: $rootScope.votes,
			rating_total: $rootScope.total,
			average_rating: $rootScope.average
		});

      $http.put(url, data).then(function (response) {
			$timeout(function(){
				toaster.pop('success', "Rated!");
			    });
		}, function (response) {
			$timeout(function(){
				toaster.pop('error', "Oops", "something went wrong");
			    });
		});
      		
    	};
    	
    	
});
	
userApp.controller('myRecommendationController', function($scope, $http, $window, $timeout, NgTableParams,  $localStorage, toaster) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
	
	function getAllRecommendations(){
	
	var user_email = $window.sessionStorage.getItem("user_email");
	var url = "/api/recommendations/display/"+user_email;
	
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
	
	 $scope.postData = function() {
		var user_email = $window.sessionStorage.getItem("user_email");
		var url = '/api/recommendations/add';
		var config='contenttype';
		var data= ({
			user_email: user_email,
			recommendation_title: $scope.recommendation_title,
			recommendation_text: $scope.recommendation_text,
			recommendation_location: $scope.recommendation_location,
			recommendation_category: $scope.recommendation_category,
			recommendation_link: $scope.recommendation_link,
			recommendation_pic: $scope.recommendation_pic
		});
		
		$http.post(url, data, config).then(function (response) {
			$timeout(function(){
				toaster.pop('success', "Success", "new recommendation added");		
			    });
			resetForm();
			getAllRecommendations();
		}, function (response) {
			$timeout(function(){
				toaster.pop('error', "Oops", "something went wrong");
			    });
			resetForm();
			getAllRecommendations();
		});
	};
	
	  $scope.updateData = function () {
		  var user_email = $window.sessionStorage.getItem("user_email");
		  var recommendation_id=$scope.selected_recommendation.recommendation_id;
		  var url = '/api/recommendations/update/'+recommendation_id;
          var data = ({
  			user_email: user_email,
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
  				toaster.pop('success', "Success", "recommendation updated");
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
      
      function resetForm(){
    	  	$scope.recommendation_title="";
			$scope.recommendation_text="";
			$scope.recommendation_location="";
			$scope.recommendation_category="";
			$scope.recommendation_link="";
			$scope.recommendation_pic="";
      }
});

userApp.controller('top10Controller', function($scope, $http, $window) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}
	
	$scope.top10 =[];
	
	function getTop10(){
		var url = "/api/recommendations/displayTop10";
		
		$http.get(url).then( response => {
			$scope.getDivAvailable = true;
			$scope.top10 = response.data;
			});
		console.log($scope.top10);
	}
	getTop10();
    	
});

userApp.controller('logoutController', function($scope, $window, $timeout) {
	
	if($window.sessionStorage.getItem("session_id")===null||$window.sessionStorage.getItem("session_id")===""){
		$window.location.href = 'http://localhost:8080/accessDenied';
	}

      	$window.sessionStorage.setItem("session_id","");
      	$window.sessionStorage.setItem("user_name","");
      	$timeout(function() { 
      		$window.location.href = 'http://localhost:8080/';	
      	}, 1500);
});
