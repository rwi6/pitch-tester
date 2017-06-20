$( document ).ready(function() {
  // Map of the question to their answers;
  const matches = {1: "C", 2: "C#", 3: "D", 4: "E\u266D", 5: "E", 6: "F", 7: "F#", 8: "G",
                  9: "A\u266D", 10: "A", 11: "B\u266D", 12: "B", 13: "C", 14: "C#", 15: "D",
                  16: "E\u266D", 17: "E", 18: "F", 19: "F#", 20: "G", 21: "A\u266D", 22: "A",
                  23: "B\u266D", 24: "B",
                  e_2: "E", f_2: "F", g_2: "G", a_2: "A", b_2: "B", c_3: "C", d_3: "D", e_3: "E",
                  f_3: "F", g_3: "G", a_3: "A", b_3: "B", c_4: "C", c_4_1: "C", d_4: "D", e_4: "E",
                  f_4: "F", g_4: "G", a_4: "A", b_4: "B", c_5: "C", d_5: "D", e_5: "E",
                  f_5: "F", g_5: "G", a_5: "A"};

  // Constant array of all possible image questions.
  const imgQuestionsConst = ["e_2", "f_2", "g_2", "a_2", "b_2", "c_3", "d_3", "e_3", "f_3",
                            "g_3", "a_3", "b_3", "c_4", "c_4_1", "d_4", "e_4", "f_4", "g_4",
                            "a_4", "b_4", "c_5", "d_5", "e_5", "f_5", "g_5", "a_5"];
  // Constant array of all possible audio questions.
  const questionsConst = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
  // Constant array of the possible notes.
  const answerAllVals =
    ["C", "C#", "D", "E\u266D", "E", "F", "F#", "G", "A\u266D", "A", "B\u266D", "B"];
  // Constant array of the possible white notes.
  const answerWhiteVals = ["C", "D", "E", "F", "G", "A", "B"];

  // Array representing the choices for the current question.
  const choices = [
    {id: 0},
    {id: 1},
    {id: 2},
    {id: 3}
  ];
  let currentQuestionChoice = "AUDIO";
  let questions;
  // Whether the user can click on the choices.
  let canClick = true;
  // The current question.
  let currentQuestion = 0;
  setup();

  //Initial setup of the data.
  function setup() {
    getQuestions();
    nextQuestion();
  }

  //Get the correct set of questions.
  function getQuestions() {
    if (currentQuestionChoice === "AUDIO") {
      questions = questionsConst.slice();
    }
    else {
      questions = imgQuestionsConst.slice();
    }
    shuffle(questions);
  }

  //Create and display the next question.
  function nextQuestion() {
    let answerVals = (currentQuestionChoice === "AUDIO") ? answerAllVals : answerWhiteVals;
    shuffle(answerVals);

    let answerChoiceIndex = 0;
    let answerValsIndex = 0;
    if (questions.length === 0) {
      getQuestions();
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

    if (currentQuestionChoice === "AUDIO") {
      $(".question-audio").attr("src", "audio/" + currentQuestion + ".wav");
      //Auto play the tone.
      $(".question-audio")[0].play();
    }
    else {
      $(".question-image").attr("src", "image/" + currentQuestion + ".png");
    }
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

  // Audio choice handler.
  $(".choice-1").click(function(e) {
    if (currentQuestionChoice === "IMAGE") {
      $(".choice-1").addClass("selected-choice");
      $(".choice-2").removeClass("selected-choice");
      currentQuestionChoice = "AUDIO";
      $(".audio-instructions").removeClass("hidden");
      $(".question-audio").removeClass("hidden");
      $(".image-instructions").addClass("hidden");
      $(".question-image").addClass("hidden");
      setup();
    }
  });

  // Image choice handler.
  $(".choice-2").click(function(e) {
    if (currentQuestionChoice === "AUDIO") {
      $(".choice-2").addClass("selected-choice");
      $(".choice-1").removeClass("selected-choice");
      currentQuestionChoice = "IMAGE";
      $(".audio-instructions").addClass("hidden");
      $(".question-audio").addClass("hidden");
      $(".image-instructions").removeClass("hidden");
      $(".question-image").removeClass("hidden");
      setup();
    }
  });
});
