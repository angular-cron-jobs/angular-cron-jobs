angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "    <span>Every: </span>\n" +
    "    <div class=\"cron-select-wrap\">\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"select-options\">\n" +
    "        <span ng-show=\"myFrequency.base == 4\">on </span>\n" +
    "        <div ng-show=\"myFrequency.base == 4\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-if=\"allowMultiple\" multiple>\n" +
    "                <option ng-repeat=\"value in dayValue\" ng-selected=\"myFrequency.dayValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronDayName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-if=\"!allowMultiple\">\n" +
    "                <option ng-repeat=\"value in dayValue\" ng-selected=\"myFrequency.dayValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronDayName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 5\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-if=\"allowMultiple\" multiple>\n" +
    "                <option ng-repeat=\"value in dayOfMonthValue\" ng-selected=\"myFrequency.dayOfMonthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronNumeral}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "\n" +
    "            <select class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-if=\"!allowMultiple\">\n" +
    "                <option ng-repeat=\"value in dayOfMonthValue\" ng-selected=\"myFrequency.dayOfMonthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronNumeral}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "        <div ng-show=\"myFrequency.base == 6\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-if=\"allowMultiple\" multiple>\n" +
    "                <option ng-repeat=\"value in monthValue\" ng-selected=\"myFrequency.monthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronMonthName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "\n" +
    "            <select class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-if=\"!allowMultiple\">\n" +
    "                <option ng-repeat=\"value in monthValue\" ng-selected=\"myFrequency.monthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronMonthName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 3\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-if=\"allowMultiple\" multiple>\n" +
    "                <option ng-repeat=\"value in hourValue\" ng-selected=\"myFrequency.hourValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "\n" +
    "            <select class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-if=\"!allowMultiple\">\n" +
    "                <option ng-repeat=\"value in hourValue\" ng-selected=\"myFrequency.hourValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 2\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\"  ng-if=\"allowMultiple\" multiple>\n" +
    "                <option ng-repeat=\"value in minuteValue\" ng-selected=\"myFrequency.minuteValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "\n" +
    "            <select class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\"  ng-if=\"!allowMultiple\">\n" +
    "                <option ng-repeat=\"value in minuteValue\" ng-selected=\"myFrequency.minuteValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
