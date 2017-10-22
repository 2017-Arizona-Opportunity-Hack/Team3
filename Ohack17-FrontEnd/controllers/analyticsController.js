var app = angular.module('analytics', []);

app.controller('analyticsController', ['$scope', '$location', 'utilsService',
function($scope, $location, utilsService) {


    var bLineChart = {};
    $scope.Clientdata = [{
        name: "ben",
        time: [{
            sessionTime: 5,
            date: "10/09/2017"
        }, {
            sessionTime: 6,
            date: "10/20/2017"
        }, {
            sessionTime: 7,
            date: "09/18/2017"
        }, {
            sessionTime: 8,
            date: "08/16/2017"
        }]

    }, {
        name: "alice",
        time: [{
            sessionTime: 15,
            date: "10/09/2017"
        }, {
            sessionTime: 2,
            date: "10/20/2017"
        }, {
            sessionTime: 27,
            date: "09/18/2017"
        }, {
            sessionTime: 12,
            date: "08/16/2017"
        }]
    }];

    $scope.therapistData = [{
        name: "Kevin",
        time: [{
            num: 51,
            date: "10/09/2017"
        }, {
            num: 36,
            date: "10/20/2017"
        }, {
            num: 39,
            date: "09/18/2017"
        }, {
            num: 8,
            date: "08/16/2017"
        }]

    }, {
        name: "Kane",
        time: [{
            num: 15,
            date: "10/09/2017"
        }, {
            num: 21,
            date: "10/20/2017"
        }, {
            num: 2,
            date: "09/18/2017"
        }, {
            num: 14,
            date: "08/16/2017"
        }]
    }];



var init = function() {


    var aChart = document.getElementById('aChart').getContext('2d');
    var aLineChart = new Chart(aChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Clients',
                data: [],
                backgroundColor: [
                    'blue'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Therapists'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Clients'
                    }
                }]
            }
        }
    });



    aLineChart.data.datasets[0].data = [5, 6, 7, 1, 2, 10];
    aLineChart.data.labels = ["A", "B", "C", "D", "E", "F"];
    aLineChart.update();




    var bChart = document.getElementById('bChart').getContext('2d');
    bLineChart = new Chart(bChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Clients',
                data: [],
                backgroundColor: [
                    'green'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Length of Session in hrs'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Meeting Date'
                    }
                }]
            }
        }
    });

    var cChart = document.getElementById('cChart').getContext('2d');
    cLineChart = new Chart(cChart, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Clients',
                data: [],
                backgroundColor: [
                    'green'
                ],
                fill: false,
                borderColor: 'black'
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Chart'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Meeting Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Clients'
                    }
                }]
            }
        }
    });


}


$scope.$watch('clientName', function(newVal) {
    if (newVal) {
        bLineChart.data.datasets[0].data = [];
        bLineChart.data.labels = [];
        console.log("in watch of client name", newVal);
        var result = $scope.Clientdata.filter(function(obj) {
            if (obj.name == newVal) {
                return obj;
            }
        });
        console.log(result);
        for (var i = 0; i < result[0].time.length; i++) {
            bLineChart.data.datasets[0].data.push(result[0].time[i].sessionTime);
            bLineChart.data.labels.push(result[0].time[i].date);
        }

        bLineChart.update();
    }

});


$scope.$watch('therapistName', function(newVal) {
    if (newVal) {
        cLineChart.data.datasets[0].data = [];
        cLineChart.data.labels = [];
        console.log("in watch of client name", newVal);
        var result = $scope.therapistData.filter(function(obj) {
            if (obj.name == newVal) {
                return obj;
            }
        });
        console.log(result);
        for (var i = 0; i < result[0].time.length; i++) {
            cLineChart.data.datasets[0].data.push(result[0].time[i].num);
            cLineChart.data.labels.push(result[0].time[i].date);
        }

        cLineChart.update();
    }

});


$scope.register = function() {
    console.log("in submit fn");
    $location.path('register');
}

init();
}]);