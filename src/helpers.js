export const names = [
  "toad",
  "didi",
  "yoshi",
  "kong",
  "boo",
  "mario",
  "mario2",
  "wario",
  "birdo",
  "kong2",
  "luigi",
  "shyguy",
  "browser",
  "red",
  "dryBones",
  "honeyQueen",
  "toadette",
  "dryBowser",
  "peach",
  "marioKart",
  "browserJr",
  "green",
  "worm",
  "daisy"
];

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const calculateCoins = (level, time, coins) => {
  return (
    coins +
    100 +
    Math.round((level / 10) * ((100 + level) * 5) - (time / 80) * (level * 10))
  );
};

export const prepareLevel = (level) => {
  const levelResponse = {
    level,
    pairs: 4 + level,
    board: []
  };
  for (let x = 0; x < levelResponse.pairs; x++) {
    const card = {
      character: names[x],
      isOpen: false
    };
    levelResponse.board.push({
      ...card,
      id: Math.floor(Math.random() * 1000000)
    });
    levelResponse.board.push({
      ...card,
      id: Math.floor(Math.random() * 1000000)
    });
  }
  shuffleArray(levelResponse.board);
  return levelResponse;
};

export function clevertabConverter(...args) {
  return args.join("_").split(" ").join("-").toUpperCase();
}

export const time = {
  getSecondsFromExpiry: (expiry, shouldRound) => {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  },
  getSecondsFromPrevTime: (prevTime, shouldRound) => {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  },
  getTimeFromSeconds: (secs) => {
    const totalSeconds = Math.ceil(secs);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      seconds,
      minutes,
      hours,
      days
    };
  }
};
