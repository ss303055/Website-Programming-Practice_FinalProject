$(document).ready(function(){
   var currentQuiz=null;//目前題數
    $("#startButton").click(function()
    {
        if(currentQuiz==null)
        {
            currentQuiz=0;
            $("#question").text(questions[0].question);
            $("#options").empty();//clear answer text
            $("#options").append("<input type='radio' id='demo-priority-low' name='demo-priority' value=0>" + "<label for='demo-priority-low'>" + questions[0].answers[0][0] + "</label><br><br>");
            $("#options").append("<input type='radio' id='demo-priority-normal' name='demo-priority' value=1>" + "<label for='demo-priority-normal'>" + questions[0].answers[1][0] + "</label><br><br>");
            $("#options").append("<input type='radio' id='demo-priority-high' name='demo-priority' value=2>" + "<label for='demo-priority-high'>" + questions[0].answers[2][0] + "</label><br><br>");
            // for(var x=0; x<questions[0].answers.length; x++)
            // {
            //     $("#options").append("<input type='radio' id='demo-priority-normal' name='demo-priority' value=" +x+ ">" + "<label for='demo-priority-low'>" + questions[0].answers[x][0] + "</label><br><br>");
            // }
            $("#startButton").attr("value", "Next");
        }
        else
        {
            $.each($(":radio"), function(i,val){
                if(val.checked)
                {
                    //使用者所選的項目是否已產生最終結果
                    if(isNaN(questions[currentQuiz].answers[i][1]))
                    {
                        var finalResult = questions[currentQuiz].answers[i][1];
                        $("#question").text(finalAnswers[finalResult][0]);//顯示最終結果標題
                        $("#options").empty();
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                        currentQuiz=null;//final answer render
                        $("#startButton").attr("value", "重新開始");
                    }
                    else
                    {
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();//清空選項
                        $("#options").append("<input name='demo-priority' id='demo-priority-low' type='radio' value=0>" + "<label for='demo-priority-low'>" + questions[currentQuiz].answers[0][0] + "</label><br><br>");//next question text
                        $("#options").append("<input name='demo-priority' id='demo-priority-normal' type='radio' value=1>" + "<label for='demo-priority-normal'>" + questions[currentQuiz].answers[1][0] + "</label><br><br>");//next question text
                        $("#options").append("<input name='demo-priority' id='demo-priority-high' type='radio' value=2>" + "<label for='demo-priority-high'>" + questions[currentQuiz].answers[2][0] + "</label><br><br>");//next question text
                        
                        // for(var x=0; x<questions[currentQuiz].answers.length; x++)
                        // {
                        //     $("#options").append("<input name='options' type='radio' value=" +x+ ">" + "<label>" + questions[currentQuiz].answers[x][0] + "</label><br><br>");//next question text
                        // }
                    }
                    return false;
                }
            })
        }
    });
});
