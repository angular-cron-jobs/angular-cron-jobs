(function(angular){
    "use strict";

    angular.module("angular-cron-jobs")
        .service("i18nRetriever", function() {

            var translation = {
                EN: {
                    TEMPLATE_KEYS: {
                        EVERY: "Every",
                        ON: "on",
                        ON_THE: "on the",
                        OF: "of",
                        AT: "at",
                        PAST_THE_HOUR: "past the hour"
                    },
                    FREQUENCIES: [
                        { value: 1, label: "Minute"},
                        { value: 2, label: "Hour"},
                        { value: 3, label: "Day"},
                        { value: 4, label: "Week"},
                        { value: 5, label: "Month"},
                        { value: 6, label: "Year"}
                    ],
                    NUMERALS: {
                        1: "1st",
                        2: "2nd",
                        3: "3rd",
                        21: "21st",
                        22: "22nd",
                        23: "23rd",
                        31: "31st"
                    },
                    UNTREATED_NUMERAL_INFO: "th",
                    MONTHS: {
                        1: "January",
                        2: "February",
                        3: "March",
                        4: "April",
                        5: "May",
                        6: "June",
                        7: "July",
                        8: "August",
                        9: "September",
                        10: "October",
                        11: "November",
                        12: "December"
                    },
                    DAYS: {
                        0: "Sunday",
                        1: "Monday",
                        2: "Tuesday",
                        3: "Wednesday",
                        4: "Thursday",
                        5: "Friday",
                        6: "Saturday"
                    }
                },
                PT_BR: {
                    TEMPLATE_KEYS: {
                        EVERY: "Todo(a)",
                        ON: "no(a)",
                        ON_THE: "em",
                        OF: "de",
                        AT: "às",
                        PAST_THE_HOUR: "passado(a) da hora"
                    },
                    FREQUENCIES: [
                        { value: 1, label: "Minuto"},
                        { value: 2, label: "Hora"},
                        { value: 3, label: "Dia"},
                        { value: 4, label: "Semana"},
                        { value: 5, label: "Mês"},
                        { value: 6, label: "Ano"}
                    ],
                    NUMERALS: {
                        1: "1",
                        2: "2",
                        3: "3",
                        21: "21",
                        22: "22",
                        23: "23",
                        31: "31"
                    },
                    UNTREATED_NUMERAL_INFO: "",
                    MONTHS: {
                        1: "Janeiro",
                        2: "Fevereiro",
                        3: "Março",
                        4: "Abril",
                        5: "Maio",
                        6: "Junho",
                        7: "Julho",
                        8: "Agosto",
                        9: "Setembro",
                        10: "Outubro",
                        11: "Novembro",
                        12: "Dezembro"
                    },
                    DAYS: {
                        0: "Domingo",
                        1: "Segunda-feira",
                        2: "Terça-feira",
                        3: "Quarta-feira",
                        4: "Quinta-feira",
                        5: "Sexta-feira",
                        6: "Sábado"
                    }
                }
            };

            var actualInfo = translation["EN"];

            return {
                initialize: function(i18n){
                    actualInfo = translation[i18n.toUpperCase()];
                },
                getTemplateKeys: function(){
                    return actualInfo.TEMPLATE_KEYS;
                },
                getFrequencies: function(){
                    return actualInfo.FREQUENCIES;
                },
                getNumeral: function(input){
                    if (typeof(actualInfo.NUMERALS[input]) === "undefined"){
                        return input + actualInfo.UNTREATED_NUMERAL_INFO;
                    }
                    return actualInfo.NUMERALS[input];
                },
                getMonths: function(){
                    return actualInfo.MONTHS;
                },
                getDays: function(){
                    return actualInfo.DAYS;
                }
            };

        });

}(angular));