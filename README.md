# angular-cron-jobs
UI Component For Creating Cron Job Syntax To Send To Server

##[DEMO](http://jacobscarter.github.io/angular-cron-jobs/#/)
##Installation

Install using bower:

`bower install angular-cron-jobs`

##Use:

Include the component in your application:

    angular.module('myApp', ['angular-cron-jobs']);

Insert the directive where you would like it to appear in your application:

    <cron-selection output="myOutput"></cron-selection>

By setting the output attribute equal to a value in your controller (i.e. `$scope.myOutput` in the example above) you have access to the cron syntax output.  

For example, a job selected to run every month on the 11th at 4:10 AM would output the follow:

    '10 4 11 * *'

as a string.

##Configuration:

The directive takes an optional attribute of `config`

    <cron-selection output="myOutput" config="myConfig"></cron-selection>

This is an object in your controller you can use to remove options from the user.  For example if you would like the user to be able to set Minute, Hour, and Day but not Week, Month, and Year you would create the following object in your controller:

    $scope.myConfig = {
        option: {
            allowWeek : false,
            allowMonth : false,
            allowYear : false
        }
    }

Currently the config object accepts an options property with an object of allowed selections.  These include:

* allowMinute
* allowHour
* allowDay
* allowWeek
* allowMonth
* allowYear

Setting the keys as booleans will turn the selection on and off.

##Coming Soon:

The next big to-do's on my list include:

* creating a customize button that will toggle a much more complicated UI to allow for very specific and unique cron jobs.
