var app = angular.module('Register', []);

app.controller('RegisterController', ['$scope', '$http',
    function($scope,$http) {

 $scope.todos = [
       {name: "ADHD"},
       {name: "Asperger's Syndrome"},
       {name: "Autism"},
        {name:"Cerebral Palsy"},
       {name: "Down Syndrome"},
      {name:  "PDD"},
        {name:"Parkinson's Disease"},
        {name:"Stroke"},{name:"Traumatic Brain Injury"}
        
    ]
    
    $scope.records = [
    {name:"Private Pay"},
    {name:"Private Insurance (Non-State Funded)"},
    {name:"ESA Account"},
    {name:"ALTCS/MercyCare"},
    {name:"ALTCS/MercyCare"},
    {name:"ALTCS/United Health Care"}
        
    ]
    
    
        var init = function() {
            
            $scope.selectedValues = [];
            $scope.temp=[];
        }
        
        $scope.onchangeCheck = function(record) {
        	if(record.isChecked){
        		$scope.selectedValues.push(record.name);
        	} else {
        		var toDel = $scope.selectedValues.indexOf(record);
        		$scope.selectedValues.splice(toDel);
        	}
        	console.log($scope.selectedValues);
        }
        
         $scope.onCheck = function(todo) {
        	if(todo.isChecked){
        		$scope.temp.push(todo.name);
        	} else {
        		var toDel = $scope.temp.indexOf(todo);
        		$scope.temp.splice(toDel);
        	}
        	console.log($scope.temp);
        }
        

        init();
        
         $scope.onClick1=function()
         {

// var url='http://nmtsa.herokuapp.com/registerUser'
//          var xsrf = $.param({username:$scope.uName,
//          password:$scope.pwd,
//          first_name:$scope.fName,
//          last_name:$scope.lName,
//          dob:$scope.date,
//          diagnosis:$scope.temp,
//          phone_number:$scope.phone,
//          parent_first_name:$scope.pFirstName,
//          parent_last_name:$scope.pLastName,
//          email:$scope.email,
//          address:$scope.address,
//          refferal_reason:$scope.reason,
//          funding:$scope.selectedValues});
// $http({
//     method: 'POST',
//     url: url,
//     data: xsrf,
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// }).success(function(data)
// {
//   console.log("Success");
// });
        // console.log("asf");
         $http.post('http://nmtsa.herokuapp.com/registerUser',{username:$scope.uName,
         password:$scope.pwd,
         first_name:$scope.fName,
         last_name:$scope.lName,
         dob:$scope.date,
         diagnosis:$scope.temp,
         phone_number:$scope.phone,
         parent_first_name:$scope.pFirstName,
         parent_last_name:$scope.pLastName,
         email:$scope.email,
         address:$scope.address,
         refferal_reason:$scope.reason,
         funding:$scope.selectedValues}).success(function(data)
           {
           console.log("Success");
           console.log(data);
           }).error(function(err){
           		console.log(err);
           });
         }
    }
]);

