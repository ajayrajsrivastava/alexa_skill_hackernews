'use strict';
var Alexa      = require('alexa-sdk');
var cheerio    = require('cheerio');
var request    = require('request');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID           = undefined;

var SKILL_NAME       = "Hacker News";
var GET_FACT_MESSAGE = "";
var HELP_MESSAGE     = "You can say open hacker news, or, you can say exit... What can I help you with?";
var HELP_REPROMPT    = "What can I help you with?";
var STOP_MESSAGE     = "Goodbye!";

var url = 'https://news.ycombinator.com'
var html;
var done = false;

request({
 
    url: url,
    }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        
        html = body;
        done = true;

    }

})


require('deasync').loopWhile(function(){return !done;});


var data = [];

const $ = cheerio.load(html)


$('.storylink').each(function(i, elem) {

    data[i] = $(this).text();
})


//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {

        var factArr      = data;
        var factIndex    = Math.floor(Math.random() * factArr.length);
        var randomFact   = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)

    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};

