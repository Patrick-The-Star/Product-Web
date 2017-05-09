(function(){
	'use strict';
	var url = 'http://ec2-52-57-235-167.eu-central-1.compute.amazonaws.com/API.php';
	angular.module('myApp', [])
	.service('CustomerSearchService', customerService)
	.controller('TableController',tableControl);




	// customerService.$inject=['http'];
	function customerService($http){

		var customService = this;

		customService.getCustomers=function(){
			
			
		}

		

	}

	tableControl.$inject=['$scope','CustomerSearchService','$http'];
	function tableControl($scope,CustomerSearchService,$http){
		// var response = CustomerSearchService.getCustomers();
		var table = this;
		var nCustomers=0;
		var nOrders=0;
		$http.get(url+'/customers').then(function(response){
				
			
			$scope.names = response.data;
			
		});

		$http.get(url+'/orders').then(function(response){

			$scope.products = response.data;
			
			
		});

		$scope.editOrder = function(){
			$http.put(url+'/orders/'+$scope.order.id,$scope.order).then(function(response){
				for(var i=0;i<$scope.products.length;i++){
					if($scope.products[i].id==$scope.order.id){
						var copiedObject = jQuery.extend(true, {}, $scope.order);
						$scope.products[i]=copiedObject;
					}
				}
			});
		}

		$scope.deleteOrder = function(){
			$http.delete(url+'/orders/'+$scope.order.id).then(function(response){
				var oid = $scope.order.id;
				for(var i=0;i<$scope.products.length;i++){
					if($scope.products[i].id==oid){
						$scope.products.splice(i,1);
						break;
					}
				}
				
				
				
			});
		}
		
		
		$scope.addOrder = function(){



			$http.post(url+'/orders/',$scope.order).then(function(response){
				console.log(response);
				var copiedObject = jQuery.extend(true, {}, $scope.order);
				$scope.products.push(copiedObject);
				function compare(a,b){
					if(parseFloat(a.id)<parseFloat(b.id)){
						return -1;
					}
					if(parseFloat(a.id)>parseFloat(b.id)){
						return 1;
					}
					return 0;
				}
				$scope.products.sort(compare);
			});
			// console.log(nOrders);
			// console.log(nCustomers);
		};

		$scope.editCustomer = function(){
			$http.put(url+'/customers/'+$scope.customer.id,$scope.customer).then(function(response){
				for(var i=0;i<$scope.names.length;i++){
					if($scope.names[i].id==$scope.customer.id){
						var copiedObject = jQuery.extend(true, {}, $scope.customer);
						$scope.names[i]=copiedObject;
						break;
					}
				}
				console.log(response);
			});
		}

		$scope.deleteCustomer = function(){
			$http.delete(url+'/customers/'+$scope.customer.id).then(function(response){
				
				var pid = $scope.customer.id;
				
				for(var i=0;i<$scope.names.length;i++){
					if($scope.names[i].id==pid){
						$scope.names.splice(i,1);
						break;
					}
				}
				
				
				
			});
		}
		
		
		$scope.addCustomer = function(){



			$http.post(url+'/customers/',$scope.customer).then(function(response){
				console.log(response);
				var copiedObject = jQuery.extend(true, {}, $scope.customer);
				$scope.names.push(copiedObject);
				function compare(a,b){
					if(parseFloat(a.id)<parseFloat(b.id)){
						return -1;
					}
					if(parseFloat(a.id)>parseFloat(b.id)){
						return 1;
					}

					return 0;
				}

				$scope.names.sort(compare);
			});
			// console.log(nOrders);
			// console.log(nCustomers);
		};
		
		
	}


})();