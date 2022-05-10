const pipeLandNodes = {
  pipe1: {
    x: 400,
    y: 96,
    isLevel: false,
    right: "level1"
  },
  level1: {
    x: 432,
    y: 96,
    isLevel: true,
    up: "coin1",
    left: "pipe1",
    background: "/assets/images/world1.gif",
    passed: false,
    level: 1
  },
  coin1: {
    x: 432,
    y: 64,
    isLevel: false,
    up: "level2",
    down: "level1"
  },
  level2: {
    x: 432,
    y: 32,
    isLevel: true,
    left: "coin2",
    down: "coin1",
    background: "/assets/images/world2.gif",
    passed: false,
    level: 2
  },
  coin2: {
    x: 400,
    y: 32,
    isLevel: false,
    left: "level3",
    right: "level2",
    down: "hongo1"
  },
  hongo1: {
    x: 400,
    y: 64,
    isLevel: false,
    up: "coin2"
  },
  level3: {
    x: 368,
    y: 32,
    isLevel: true,
    right: "coin2",
    left: "coin3",
    background: "/assets/images/world3.png",
    passed: false,
    level: 3
  },
  coin3: {
    x: 336,
    y: 32,
    isLevel: false,
    left: "coin4",
    right: "level3"
  },
  coin4: {
    x: 304,
    y: 32,
    isLevel: false,
    right: "coin3",
    down: "coin5"
  },
  coin5: {
    x: 304,
    y: 64,
    isLevel: false,
    up: "coin4",
    down: "level4"
  },
  level4: {
    x: 304,
    y: 96,
    isLevel: true,
    up: "coin5",
    background: "/assets/images/world4.gif",
    passed: false,
    level: 4
  }
};

const getNodesWithId = (nodes) => {
  for (let key in nodes) {
    if (nodes.hasOwnProperty(key)) {
      nodes[key].id = key;
    }
  }
  return nodes;
};

export const maps = {
  pipeland: {
    src: "/assets/images/map-1.gif",
    size: {
      width: 480,
      heigth: 152
    },
    stuff: [
      { x: 432, y: 32, type: "level", name: 2 },
      { x: 368, y: 32, type: "level", name: 3 },
      { x: 304, y: 96, type: "level", name: 4 },
      { x: 176, y: 96, type: "level", name: 5 },
      { x: 176, y: 32, type: "level", name: 6 },
      { x: 176, y: 64, type: "tile", name: "rock" },
      { x: 208, y: 32, type: "tile", name: "rock" },
      { x: 144, y: 64, type: "tile", name: "rock" }
    ],
    nodes: getNodesWithId(pipeLandNodes)
  }
};

export const sprites = {
  sm: {
    size: {
      width: 16,
      heigth: 16
    }
  }
};

export const characters = {
  inMap: {
    initCoordenates: {
      x: 1,
      y: 1
    }, //332px 446px
    size: {
      width: 58,
      heigth: 52
    },
    names: [
      "mario",
      "luigi",
      "daisy",
      "monita",
      "wario",
      "waluigi",
      "yoshi",
      "boo",
      "hongo",
      "bowserjr"
    ]
  }
};

export const mapTiles = {
  inMap: {
    initCoordenates: {
      x: 1,
      y: 1
    }, //332px 446px
    size: {
      width: 16,
      heigth: 16
    },
    names: ["rock", "castle", "castleDestroyed", "help"]
  }
};

export const worldStageSprite = (
  levelNumber,
  baseSize,
  mapSize,
  containerSize,
  spriteNumber = 10
) => {
  const newWidth = (containerSize.width * baseSize.width) / mapSize.width;
  const backgroundPosition = newWidth * (-levelNumber + 1);
  const backgroundSize = newWidth * spriteNumber;
  return {
    relation: newWidth,
    style: {
      width: newWidth,
      height: newWidth,
      backgroundPosition: `${backgroundPosition}px 0%`,
      backgroundSize: `${backgroundSize}px`
    }
  };
};
