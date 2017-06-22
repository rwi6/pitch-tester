// Constant array of all possible chord questions.
  const possibleTriadQuestions = {
    majorTrebleRoot: ["cmajor_treble", "dfmajor_treble", "dmajor_treble", "efmajor_treble",
            "emajor_treble", "fmajor_treble", "fsmajor_treble", "gmajor_treble", "afmajor_treble",
            "amajor_treble", "bfmajor_treble", "bmajor_treble"],
    minorTrebleRoot: ["cminor_treble", "csminor_treble",
            "dminor_treble", "efminor_treble", "eminor_treble", "fminor_treble", "fsminor_treble",
            "gminor_treble", "gsminor_treble", "aminor_treble", "bfminor_treble", "bminor_treble"],
    majorTrebleFirst: ["cmajor_treble_1", "dfmajor_treble_1", "dmajor_treble_1", "efmajor_treble_1",
            "emajor_treble_1", "fmajor_treble_1", "fsmajor_treble_1", "gmajor_treble_1",
            "afmajor_treble_1", "amajor_treble_1", "bfmajor_treble_1", "bmajor_treble_1"],
    minorTrebleFirst: ["cminor_treble_1", "csminor_treble_1", "dminor_treble_1", "efminor_treble_1",
            "eminor_treble_1", "fminor_treble_1", "fsminor_treble_1", "gminor_treble_1",
            "gsminor_treble_1", "aminor_treble_1", "bfminor_treble_1", "bminor_treble_1"],
    majorTrebleSec: ["cmajor_treble_2", "dfmajor_treble_2", "dmajor_treble_2", "efmajor_treble_2",
            "emajor_treble_2", "fmajor_treble_2", "fsmajor_treble_2", "gmajor_treble_2",
            "afmajor_treble_2", "amajor_treble_2", "bfmajor_treble_2", "bmajor_treble_2"],
    minorTrebleSec: ["cminor_treble_2", "csminor_treble_2", "dminor_treble_2", "efminor_treble_2",
            "eminor_treble_2", "fminor_treble_2", "fsminor_treble_2", "gminor_treble_2",
            "gsminor_treble_2", "aminor_treble_2", "bfminor_treble_2", "bminor_treble_2"],
    majorBassRoot: ["cmajor_bass", "dfmajor_bass", "dmajor_bass", "efmajor_bass",
            "emajor_bass", "fmajor_bass", "fsmajor_bass", "gmajor_bass", "afmajor_bass",
            "amajor_bass", "bfmajor_bass", "bmajor_bass"],
    minorBassRoot: ["cminor_bass", "csminor_bass",
            "dminor_bass", "efminor_bass", "eminor_bass", "fminor_bass", "fsminor_bass",
            "gminor_bass", "gsminor_bass", "aminor_bass", "bfminor_bass", "bminor_bass"],
    majorBassFirst: ["cmajor_bass_1", "dfmajor_bass_1", "dmajor_bass_1", "efmajor_bass_1",
            "emajor_bass_1", "fmajor_bass_1", "fsmajor_bass_1", "gmajor_bass_1",
            "afmajor_bass_1", "amajor_bass_1", "bfmajor_bass_1", "bmajor_bass_1"],
    minorBassFirst: ["cminor_bass_1", "csminor_bass_1", "dminor_bass_1", "efminor_bass_1",
            "eminor_bass_1", "fminor_bass_1", "fsminor_bass_1", "gminor_bass_1",
            "gsminor_bass_1", "aminor_bass_1", "bfminor_bass_1", "bminor_bass_1"],
    majorBassSec: ["cmajor_bass_2", "dfmajor_bass_2", "dmajor_bass_2", "efmajor_bass_2",
            "emajor_bass_2", "fmajor_bass_2", "fsmajor_bass_2", "gmajor_bass_2",
            "afmajor_bass_2", "amajor_bass_2", "bfmajor_bass_2", "bmajor_bass_2"],
    minorBassSec: ["cminor_bass_2", "csminor_bass_2", "dminor_bass_2", "efminor_bass_2",
            "eminor_bass_2", "fminor_bass_2", "fsminor_bass_2", "gminor_bass_2",
            "gsminor_bass_2", "aminor_bass_2", "bfminor_bass_2", "bminor_bass_2"]
  };

  const possibleTriadAnswers = {
    major: ["C major", "C# major", "D major", "E\u266D major", "E major", "F major", "F# major",
      "G major", "A\u266D major", "A major", "B\u266D major", "B major"],
    minor: ["C minor", "C# minor", "D minor", "E\u266D minor", "E minor", "F minor", "F# minor",
      "G minor", "G# minor", "A minor", "B\u266D minor", "B minor"]
  };

  const triadMatches = {};
  let triadAnswers = [];
  let triadQuestions = [];

  const category = "TRIAD";
  createTriadMatches();
  createTriadAnswersAndQuestion();
  console.log(triadAnswers);
  console.log(triadQuestions);
  console.log("crod");

  // Create the matches object for triad answers and questions.
  function createTriadMatches() {
    console.log("mot");
    for (let key in possibleTriadQuestions) {
      if (possibleTriadQuestions.hasOwnProperty(key)) {
        let answersArray = possibleTriadAnswers[key.substring(0, 5)];
        for (let x = 0; x < answersArray.length; x++) {
          triadMatches[possibleTriadQuestions[key][x]] = answersArray[x];
        }
      }
    }
  }

  function createTriadAnswersAndQuestion() {
    console.log("hie");
    for (let key in possibleTriadQuestions) {
      if (possibleTriadQuestions.hasOwnProperty(key)) {
        triadQuestions = triadQuestions.concat(possibleTriadQuestions[key]);
      }
    }
    console.log("help");
    for (let key in possibleTriadAnswers) {
      if (possibleTriadAnswers.hasOwnProperty(key)) {
        triadAnswers = triadAnswers.concat(possibleTriadAnswers[key]);
      }
    }
  }
