// main.js
angular.module('todoController', [])
	.controller('mainController', function ($scope, $http, Todos) {
		$scope.formData = {};

		// when landing on the page, get and show all todos
		Todos.get('/api/todos')
			.success(function (data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log('ERROR: ' + data);
			});

		// create todo and show them
		$scope.createTodo = function () {
			if(!$.isEmptyObject($scope.formData)) {
				Todos.create($scope.formData)
					.success(function (data) {
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		// delete todo
		$scope.deleteTodo = function (id) {
			Todos.delete(id)
				.success(function (data) {
					$scope.todos = data;
				});
		};
	});