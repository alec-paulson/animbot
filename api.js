var bodyParser = require('body-parser');
var fileName = './data/questions.json';
var data = require(fileName);
var fs = require('fs');

module.exports = {
    getNextQuestion: getQuestion,
    resetQuestion: resetQuestion,
    processAnswer : function(body){
        var nextQuestion = getQuestion();
        return nextQuestion;
    }
};

function getQuestion(){
    var nextQuestion = data.questions[data.currentQuestion];
    var totalQuestions = Object.keys(data.questions).length;
    data.currentQuestion= data.currentQuestion + 1 == totalQuestions ? 0 : data.currentQuestion + 1;
    fs.writeFile(fileName, JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log(err);
    });

    return nextQuestion;
}

function resetQuestion(){
    data.currentQuestion = 0;
    fs.writeFile(fileName, JSON.stringify(data, null, 2), function (err) {
        if (err) return console.log(err);
    });
}




