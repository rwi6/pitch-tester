$( document ).ready(function() {

  const categoryMap = {
    PITCH: {
      audio_folder: "audio",
      image_folder: "image"
    },
    TRIAD: {
      audio_folder: "triad",
      image_folder: "triad"
    }
  }
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
  // Number of questions answered correctly in a row.
  let streakCount = 0;
  let matches = {};
  setup();

  //Initial setup of the data.
  function setup() {
    if (category === "PITCH") {
      matches = pitchMatches;
    }
    else {
      matches = triadMatches;
    }
    getQuestions();
    nextQuestion();
  }

  //Get the correct set of questions.
  function getQuestions() {
    if (category === "PITCH") {
      if (currentQuestionChoice === "AUDIO") {
       questions = pitchAudioQuestions.slice();
      }
      else {
        questions = pitchImgQuestions.slice();
      }
    }
    else {
      questions = triadQuestions.slice();
    }

    shuffle(questions);
  }

  //Create and display the next question.
  function nextQuestion() {
    let answerVals = [];
    if (category === "PITCH") {
      answerVals = (currentQuestionChoice === "AUDIO") ? answerAllVals : answerWhiteVals;
    }
    else {
      answerVals = triadAnswers;
    }
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
      $(".question-audio").attr("src",
         categoryMap[category].audio_folder + "/" + currentQuestion + ".wav");
      //Auto play the tone.
      $(".question-audio")[0].play();
    }
    else {
      $(".question-image").attr("src",
        categoryMap[category].image_folder + "/" + currentQuestion + ".png");
    }
  }

  // Check whether the answer is correct or not.
  function verifyAnswer(id) {
    let selection = choices[id];
    if (selection.value === matches[currentQuestion]) {
      $("#"+id).addClass("correct");
      streakCount++;
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
      streakCount = 0;
    }

    canClick = false;
    $(".streak-count").text(streakCount);
    $(".answer").addClass("remove-hover");
    setTimeout(clear, 2000);
  }

  // Clear response styling and call the next question.
  function clear() {
    $(".answer").removeClass("incorrect");
    $(".answer").removeClass("correct");
    $(".answer").removeClass("remove-hover");
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
