/*-----------------------------------------------------------------------------
A simple "Hello World" bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify  = require('restify');
var builder  = require('botbuilder');
var route 	 = require('./route.json');


//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8888, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
       appId: 'cc4c2816-902d-41af-86c8-f9e3fa26ccd5',
    appPassword: 'QG3nqCFWbzgBN68eKcdTLEq'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var answerMap = new Map();

//=========================================================
// Functions for set Questions
//=========================================================

// метода printQuestion() выводит на экран вопрос с вариантами ответов
function printQuestion(url,textQuestion,choiceAnswerQuestion, choiceRoute ){
	return [function (session) {
		session.send((createQuestionWithButtons(session, url, choiceAnswerQuestion,textQuestion,choiceRoute ) ));
	},
	function (session, results){
			answerMap.set(url,{
			text : textQuestion,
			choiceAnswer : choiceAnswerQuestion,
			answerUser : results.response.entity
				});
	}
	]
}
//herocard
function createQuestionWithButtons(session, url, choiceAnswerQuestion,textQuestion, choiceRoute) {
    var buttons = [];
    for (var i = 0; i < choiceAnswerQuestion.length; i++) {
	console.log(choiceRoute[i])
          buttons.push( builder.CardAction.dialogAction(session, choiceRoute[i] ,JSON.stringify(choiceAnswerQuestion[i]),choiceAnswerQuestion[i] ));
    }

    var card = [
        new builder.HeroCard(session)
            .text(textQuestion)
            .buttons(buttons)
    ];

    var msg = new builder.Message()
		.textFormat(builder.TextFormat.xml)
        .attachments(card);

    return msg;
}
// добавл¤ет диалог с вопросом
function setDialog(q){
bot.beginDialogAction(q.url, q.url);
bot.dialog(q.url, 
printQuestion(
			q.url,
			q.text,
			q.choiceAnswer,
			q.choiceRouting
			)		
)
}

//=========================================================
// Bots Dialogs
//=========================================================
bot.dialog('/', [
    function (session) {
        session.beginDialog('/start')
    },
]);

bot.dialog('/inprogress', 
function (session) {
	var dataResultPoll =''; 
		if(answerMap.size==0){
			dataResultPoll='Этот раздел находитс¤ в разработке';
		}
		else{
			for (var val of answerMap.values()) {
			dataResultPoll = dataResultPoll+ '\n\n\n\n' + 'Ќа вопрос: '+ val.text + '\n\n'+ ' ¬ы ответили: ' + val.answerUser  ;	
			}
		}	
    session.send(dataResultPoll);
	answerMap.clear();
    }
);
bot.dialog('/start', [
    function (session) {
		answerMap.clear();
        session.beginDialog('/ready')
    },
]);
bot.dialog('/menu', [
    function (session) {
		answerMap.clear();
        session.beginDialog('/ready')
    },
]);

bot.beginDialogAction('start', '/start', {matches: /^\/?start/i});
bot.beginDialogAction('menu', '/menu', {matches: /^\/?menu/i});
bot.beginDialogAction('/inprogress', '/inprogress', {matches: /^\/?inprogress/i});

setDialog(route.ready);
setDialog(route.AreYouInAnyPain);
setDialog(route.AreYouInAnyPain_Wo);
setDialog(route.AreYouInAnyPain_Wo_bottomStomachhow);
setDialog(route.AreYouInAnyPain_Wo_bottomStomach_how_oftenurine);
setDialog(route.AreYouInAnyPain_Wo_bottomStomach_howoften_urine_difficulturine);
setDialog(route.AreYouInAnyPain_Wo_bottomStomach_how_go);
setDialog(route.AreYouInAnyPain_Wo_bottomStomach_how_oftenurine_difficulturine_all);
setDialog(route.AreYouInAnyPain_Wo_bottomStomach_how_bloodurine);
setDialog(route.AreYouInAnyPain_Wo_another_itch);
setDialog(route.AreYouInAnyPain_Wo_another_burn);
setDialog(route.AreYouInAnyPain_Wo_another_discomfort);
setDialog(route.AreYouInAnyPain_Wo_another_penispain);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_in_excreta);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_all_erection);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_in_excreta_color);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_all);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_red);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_rush);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_peeling);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_warts);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_smell);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_out_openhead_head_deform);
setDialog(route.AreYouInAnyPain_Wo_another_penispain_all_erection_deform);
setDialog(route.DoYouHaveAviolationOfUrination);
setDialog(route.DoYouHaveAviolationOfUrination_any_oft);
setDialog(route.DoYouHaveAviolationOfUrination_any_pain);
setDialog(route.DoYouHaveAviolationOfUrination_any_sluggishstream);
setDialog(route.DoYouHaveAviolationOfUrination_any_difficulty);
setDialog(route.DoYouHaveAviolationOfUrination_any_newsnine);
setDialog(route.YouHaveChangedTheColorOfTheUrine);




