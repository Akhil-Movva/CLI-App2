const chalk = require('chalk');
var readVariable= require('readline-sync');
var name = readVariable.question(chalk.yellow("May I know your name, please?\n"));
console.log(chalk.green("Hello",chalk.italic(name)+"!\n"));
if (readVariable.keyInYN(chalk.yellow('Do you want to play the quiz?\n')))//Condition to know whether the user is interested in playing the quiz, or not.
 {
   console.log(chalk.green("We are delighted you are playing the quiz!! Hope you have a great experience.\n\n"));
   console.log(chalk.green.italic.underline("About the quiz:\n"));
   console.log(chalk.yellow("This quiz is entirely based on recently concluded IPL-13. You will have 6 questions, each having 3 options to select from. There is only ONE right answer to each question. Options for the questions are preceded by alphabets, which serve as label. Answer each question by typing the label of the option that you believe is the correct answer.\n"));
   console.log(chalk.green.italic.underline("Scoring system:\n"));
   console.log(chalk.yellow("You are awarded ONE point for each right answer. No negative marks either for wrong answers or unanswered questions.\n"));
   console.log(chalk.underline.bgWhiteBright.bold.black
   ("\t\t\t\t\t\t\t\t\t\t\tWelcome to the Quiz - IPL 13\n"));
   /*The function dislays questions, one at a time, and also checks for the validity of the answer entered by the user.
   If the answer entered is correct, score is incremented by one. Otherwise, the score remains the same.*/
   function quiz(qs)
    {
      console.log(chalk.blue(qs.ques));
      console.log(chalk.gray(qs.op1));
      console.log(chalk.gray(qs.op2));
      console.log(chalk.gray(qs.op3));
      var response=readVariable.question('Type your answer: ', {
      limit: ['a','b','c'],
      limitMessage: 'Please only choose among a,b or c.'
      });
    
      if(response.toLowerCase()===qs.ans.toLowerCase())
       {
        score = score+1;
        console.log(chalk.greenBright("\nYour response is correct!!!\n"));
      }
      else
       {
         console.log(chalk.redBright("\nYou have answered incorrectly...\n"));
         console.log(chalk.greenBright("Correct answer:",qs.ans+"\n"));

       } 
    }
  var questionOne = {
  ques: "Who is the highest run scorer in this IPL?\n",
  op1: "a. Dhawan",
  op2: "b. KL Rahul",
  op3: "c. Warner",
  ans: "b"
  };
  var questionTwo = {
  ques: "Who has taken the highest number of wickets in this IPL?\n",
  op1: "a. Rabada",
  op2: "b. Rashid Khan",
  op3: "c. Bumrah",
  ans: "a"
  };
  var questionThree = {
   ques: "Which team was placed fourth at the end of the league stage?\n",
   op1: "a. Bengaluru",
   op2: "b. Kolkata",
   op3: "c. Hyderabad",
   ans: "a"
  };
  var questionFour = {
  ques: "Which city hosted the IPL 2020 final?\n",
  op1: "a. Abu Dhabi",
  op2: "b. Sharjah",
  op3: "c. Dubai",
  ans: "c"
  };
  var questionFive = {
  ques: "Which player scored 2 hundreds?\n",
  op1: "a. Stokes",
  op2: "b. Dhawan",
  op3: "c. Mayank Agarwal",
  ans: "b"
  };
  var questionSix = {
  ques: "Where did CSK finish in the points table?\n",
  op1: "a. 8th",
  op2: "b. 6th",
  op3: "c. 7th",
  ans: "c"
  };
  var questions = [questionOne,questionTwo,questionThree,questionFour,questionFive,questionSix];
  var score = 0;
  for(var i=0;i<questions.length;i++)// loop for calling the function for each question in the array above.
   { 
    console.log(`Question.${i+1}`)
    quiz(questions[i]);
   }  
  console.log("------------------------------------------End of the Quiz--------------------------------------------\n");
 const fs= require('fs');
 var text = fs.readFileSync("./output.txt","utf-8");// for reading the scores recorded previously from a file used for storing the scores of differnt users.
 var oa = text.split(",")// collecting the retreived scores into an array.
 for(var i=0;i<oa.length;i++)// used for removing spaces, if any or 0's from the array.
  {
    if(oa[i]==""||oa[i]=="0")
      {
        oa.splice(i,1);
        i=i-1;
      }
  }
var len = oa.length;
 if(len>3)//since, I just want to show only upto top 3 scores recorded so far, for the user.
  {
   len=3;
  }
 console.log(chalk.green("Your score is"),score,"\n");//Displaying the score to the user.
 console.log("***********************************");
if(len==0)//If no non-zero scores recorded previously.
 {
      console.log("No high scores have been recorded previously.\n");
      
       if(score>0)
        {
          console.log(chalk.green("\nHurray! This is the highest score recorded yet."));
          console.log("Please send the screenshot of your score.");
        }
 }
 else
   {
       oa.sort();
       oa.reverse();// To sort the array in decreasing order of scores.
       if(len==1||len==2)
        {
          if(len==1)//If only one non-zero score recorded so far.
            {
              console.log(chalk.bgWhite.black("Highest score recorded so far:"));
             } 
          else// If only two non-zero scores recorded so far.
             {
               console.log(chalk.bgWhite.black("Top 2 scores recorded so far:"));
             }
             for( var i=0;i<len;i++)
                {
                  console.log(Number(oa[i]));
                }
           if(score>0)//If the score of the user is a non-zero score.
             {
               if(score>Number(oa[0]))
                   {
                     console.log(chalk.green("\nHurray! You have broken the record for the highest score."));
                   }
               else if(score==Number(oa[0]))
                    {
                      console.log(chalk.blue("\nYay! You have equalled the record for the highest score."));
                    }
                else // If the user registered either the second or third highest score.
                    {
                       console.log(chalk.blue("\nCongrats, you have made it to the top 3."));
                    }
                console.log("Please send the screenshot of your score.");        
             }  
        }                  
                   
       else
        {
          console.log(chalk.bgWhite.black("Top 3 scores recorded so far:"));
          for(var i=0;i<len;i++)
              {
                console.log(Number(oa[i]));
              }
          if(score>=Number(oa[2]))// To check if the user was able to beat or equal the third highest score recorded so far.
              {
                 if(score>Number(oa[0]))
                   {
                     console.log(chalk.green("\nHurray! You have broken the record for the highest score."));
                   }
                 else if(score==Number(oa[0]))
                    {
                        console.log(chalk.blue("\nYay! You have equalled the record for the highest score."));
                    }
                  else // If the user registered either the second or third highest score.
                    {
                       console.log(chalk.blue("\nCongrats, you have made it to the top 3."));
                    }
                    console.log("Please send the screenshot of your score.");        
              }
        }        
    }
    var str = score.toString()+","; // To append the scores of the users seperated by commas in a file for recording the scores of different users.
    fs.appendFile('output.txt',str,function (err) {
    if (err) throw err;
    });
    if (readVariable.keyInYN(chalk.yellow('\nAny feedback you wish to give us?\n')))//To check whether user is interested in giving any feedback, or not.
      {
        var fb = name+": "+readVariable.question(chalk.green("Type your feedback: "))+"\n*************************\n"; //For storing the feedback of the user in a file used for collecting feedback from users.
        fs.appendFile('feedback.txt',fb,function (err) {
        if (err) throw err;
        });
       console.log(chalk.blue("\nWe thank you for spending a little of your precious time to play the quiz, and for providing valuable feedback...\n\n"));
      }
     else
      {
       console.log(chalk.green("\nWe thank you for spending a little of your precious time to play the quiz.\n\n"));
      }
     console.log("\t\t\t\t\t\t\t\t\t\t Cheers:) Have a nice day.")  
}
else 
 {
    console.log(chalk.blue("\nSorry to see you go..."));
 }

