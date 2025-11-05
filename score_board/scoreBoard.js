  const SCORE = "score";
  const BOWLER_NAME = 'bowlerNames';
  const BOWLER_SCORE = 'bowlerScores';
  const BATSMAN_NAME = 'batsmanNames';
  const BATSMAN_SCORE = 'batsmanScores';
  const BOWLER_WICKET = 'bowlerWickets';
  const OVERS = 'overs';

  const playersDetails = [
    BATSMAN_NAME, ["rohit", "sachin", "virat"],
    BOWLER_NAME, ["Mitchell Starc", "Archer", "Kapil dev", "Bhuvneswar"],
    BOWLER_SCORE, [0, 0, 0, 0, 0],
    BOWLER_WICKET, [0, 0, 0, 0, 0],
    BATSMAN_SCORE, [0, 0, 0],
    SCORE, [0],
    OVERS, []
  ];

function playersData(dataName, dataId, isScoreNeedsTochange = false, changeTo) {
  if (isScoreNeedsTochange) {
    for (let index = 4; index <= playersDetails.length - 2; index++) {
      if (playersDetails[index] === dataName) {
        playersDetails[index + 1][dataId] = playersDetails[index + 1][dataId] + changeTo;
      }
    }
  }

  for (let index = 0; index <= playersDetails.length - 2; index++) {
    if (playersDetails[index] === dataName) {
      return playersDetails[index + 1][dataId];
    }
  }


}

function oversBowled() {
  let overs = [];

  return overs;
}

function isStrikerNeedsToChange(runGet) {
  return runGet === 1 || runGet === 3;
}

function displayScore(strikerId, nonStrikerId, bowelerId, score) {
  const strikerName = playersData(BATSMAN_NAME, strikerId);
  const nonStrikerName = playersData(BATSMAN_NAME, nonStrikerId);
  const bowlerName = playersData(BOWLER_NAME, bowelerId);
  const strikerScore = playersData(BATSMAN_SCORE, strikerId);
  const nonStrikerScore = playersData(BATSMAN_SCORE, nonStrikerId);
  const bowlerScore = playersData(BOWLER_SCORE, bowelerId);
  const bowlerWicket = playersData(BOWLER_WICKET, bowelerId);

  console.log(`\nTotal-Score - ${score} \n`);
  console.log(`Striker      | ${strikerName}     ${strikerScore}`);
  console.log(`Non-Striker  | ${nonStrikerName}  ${nonStrikerScore}\n`);
  console.log(`Bowler       | ${bowlerName}  ${bowlerScore}/${bowlerWicket}`);
  console.log(`\n `);
}

function scoreBoard(score, strikerId, nonStrikerId, bowlerId) {
  displayScore(strikerId, nonStrikerId, bowlerId, score);
  
  const run = parseInt(prompt(`\nInput :`));

  if (run === 5) {
    score += run;
    playersData(BOWLER_SCORE, bowlerId, true, run);
  }

  if (run > -1 && run < 7 && run !== 5) {
    playersData(BATSMAN_SCORE, strikerId, true, run);
    playersData(BOWLER_SCORE, bowlerId, true, run);
    score += run;
  } else {
    console.log("\nWIDE BALL + 4 runs");
  }

  if (isStrikerNeedsToChange(run)) {
    console.log("\n-----Strike Change-----");

    strikerId = strikerId + nonStrikerId;
    nonStrikerId = strikerId - nonStrikerId;
    strikerId = strikerId - nonStrikerId;
  }

  return scoreBoard(score, strikerId, nonStrikerId, bowlerId);
}

scoreBoard(0, 0, 1, 0);
