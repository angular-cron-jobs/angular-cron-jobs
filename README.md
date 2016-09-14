[![Build Status](https://travis-ci.org/angular-cron-jobs/angular-cron-jobs.svg?branch=master)](https://travis-ci.org/angular-cron-jobs/angular-cron-jobs)  [![Coverage Status](https://coveralls.io/repos/github/angular-cron-jobs/angular-cron-jobs/badge.svg?branch=master)](https://coveralls.io/github/angular-cron-jobs/angular-cron-jobs?branch=master)  [![Codacy Badge](https://api.codacy.com/project/badge/Grade/31435876fa31464b8fb495de9b7f49c2)](https://www.codacy.com/app/jc_2/angular-cron-jobs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=angular-cron-jobs/angular-cron-jobs&amp;utm_campaign=Badge_Grade)  [![npm version](https://badge.fury.io/js/angular-cron-jobs.svg)](https://badge.fury.io/js/angular-cron-jobs)
# angular-cron-jobs
UI Component For Creating Cron Job Syntax To Send To Server

##[Demo](http://jacobscarter.github.io/angular-cron-jobs/#/)
##Installation

Install using bower:

`bower install angular-cron-jobs`

##Use:

Include the component in your application:

    angular.module('myApp', ['angular-cron-jobs']);

Insert the directive where you would like it to appear in your application:

    <cron-selection ng-model="myOutput"></cron-selection>

By setting the ng-model attribute equal to a value in your controller (i.e. `$scope.myOutput` in the example above) you have access to the cron syntax output.  

For example, a job selected to run every month on the 11th at 4:10 AM would output the follow:

    '10 4 11 * *'

as a string.

##Configuration:

The directive takes an optional attribute of `config`

    <cron-selection ng-model="myOutput" config="myConfig"></cron-selection>

This is an object in your controller you can use to remove options from the user.  For example if you would like the user to be able to set Minute, Hour, and Day but not Week, Month, and Year you would create the following object in your controller:

    $scope.myConfig = {
        options: {
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

You can also set whether or not you want to allow a user to select multiple calues for a cron:

    $scope.myConfig = {
        allowMultiple: true
    }

Setting allowMultiple to either true or false will toggle the ability.

A complete config object may look like the following:

    $scope.myConfig = {
        allowMultiple: true,
        options: {
            allowWeek : false,
            allowMonth : false,
            allowYear : false
        }
    }

##Custom Templates:

As noted by [TimotheeJeannin](https://github.com/TimotheeJeannin) you can use custom template by setting the template attribute on your cron DOM element:

    <cron-selection template="path/to/my/template.html"></cron-selection>

##Initializing UI with data from server

The directive takes an attribute of `ng-model` used for init and output data.

    <cron-selection ng-model="myOutput" config="myConfig"></cron-selection>

This is a string in your controller of cron syntax that was recieved from your server or any other source:

    $scope.myOutput = "30 2 4 * *"
    
Thew directive will properly build out the UI to reflect this data.

##Setting Cron after directive load

The `ng-model` attribute also works as a reset attribute

    <cron-selection ng-model="myOutput" config="myConfig"></cron-selection>

This is an expression paired with a value in your controller.  Whenever the value changes (or is set for the first time) and passed the `angular.isDefined()` method the cron will reset itself to match that value

    $timeout(function(){
       $scope.myOutput = "0 0 * * *"
    }, 3000);
    
The directive will properly build out the UI to reflect this data.

##Utilize Exposed $scope.myFrequency:

the `frequency` attribute grants you exposure to the `$scope.myFrequency` object inside the directive.  It is two way bound so you can manipulate it from outside the directive as well.

  <cron-selection ng-model="myOutput" config="myConfig" frequency="cronData"></cron-selection>

The type of `{number|Array.<number>}` depends on the following: number if `allowMultiple` is `false` and Array if `allowMultiple` is `true`

Properties you now have access to via `frequency` attribute include:

* **base** `{number}` 1-6 (minute thru year)
* **minuteValue** `{number|Array.<number>}` 0-55 (increments of 5)
* **hourValue** `{number|Array.<number>}` 1-23
* **dayOfMonthValue** `{number|Array.<number>}` 0-6 (Sunday thru Saturday)
* **monthValue** `{number|Array.<number>}` 1-12

###You can get away from using select inputs in your custom temple using the `frequency` attribute.

####[Demo Without Using Selects](http://jacobscarter.github.io/angular-cron-jobs/#/#noSelectSample)

##Contributors

[@wowo](https://github.com/wowo)

[@immertreu] (https://github.com/immertreu)

[@TSteele27] (https://github.com/TSteele27)

[@DmitryEfimenki] (https://github.com/DmitryEfimenko)


##Coming Soon:

The next big to-do's on my list include:

* Support generlized selections such as a one button click for "Every Five Minutes" or "Last Thursday of Every Month"
