$( document ).ready(function() {
  // Map of the question to their answers;
  const matches = {1: "C", 2: "C#", 3: "D", 4: "E\u266D", 5: "E", 6: "F", 7: "F#", 8: "G",
                  9: "A\u266D", 10: "A", 11: "B\u266D", 12: "B", 13: "C", 14: "C#", 15: "D",
                  16: "E\u266D", 17: "E", 18: "F", 19: "F#", 20: "G", 21: "A\u266D", 22: "A",
                  23: "B\u266D", 24: "B"};
  let questions;
  // Constant array of all possible questions.
  const questionsConst = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  // Constant array of the possible answers.
  const answerVals =
    ["C", "C#", "D", "E\u266D", "E", "F", "F#", "G", "A\u266D", "A", "B\u266D", "B"];
  // Array representing the choices for the current question.
  const choices = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3}
  ];
  // Whether the user can click on the choices.
  let canClick = true;
  // The current question.
  let currentQuestion = 0;
  setup();

  //Initial setup of the data.
  function setup() {
    questions = questionsConst.slice();
    shuffle(questions);
    nextQuestion();
  }

  //Create and display the next question.
  function nextQuestion() {
    shuffle(answerVals);
    let answerChoiceIndex = 0;
    let answerValsIndex = 0;
    if (questions.length === 0) {
      questions = questionsConst.slice();
      shuffle(questions);
    }
    currentQuestion = questions.shift();
    let answerOptions = [];
    answerOptions.push(matches[currentQuestion]);

    while (answerChoiceIndex < 3) {
      let answerVal = answerVals[answerValsIndex];
      if (answerVal !== matches[currentQuestion]) {
        answerOptions.push(answerVal);
        answerChoiceIndex++;
      }
      answerValsIndex++;
    }
    shuffle(answerOptions);
    answerOptions.forEach((answerOption, index) => {
      choices[index].value = answerOption;
      $("#"+choices[index].id).text(answerOption);
    });
    $(".audio").attr("src", "audio/" + currentQuestion + ".wav");
    //Auto play the tone.
    $(".audio")[0].play();
  }

  // Check whether the answer is correct or not.
  function verifyAnswer(id) {
    let selection = choices[id];
    if (selection.value === matches[currentQuestion]) {
      $("#"+id).addClass("correct");
    }
    else {
      $("#"+id).addClass("incorrect");
      let correctFound = false;
      let index = 0;
      while (!correctFound) {
        if (choices[index].value === matches[currentQuestion]) {
          correctFound = true;
          $("#"+index).addClass("correct");
        }
        index++;
      }
    }

    canClick = false;
    setTimeout(clear, 2000);
  }

  // Clear response styling and call the next question.
  function clear() {
    $(".answer").removeClass("incorrect");
    $(".answer").removeClass("correct");
    canClick = true;
    //next question
    nextQuestion();
  }

  // Shuffle the input array in place.
  function shuffle(array) {
    for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
  }

  // Answer click handler.
  $(".answer").click(function(e) {
    if (canClick) {
      verifyAnswer(e.target.id);
    }
  });
});