import backCard from "./assets/images/card-back.png";
import characters from "./assets/images/mario-characters.jpg";

const styles = (props) => {
  const { levelNumber } = props;
  const scale = levelNumber > 4 ? 0.5 : 1;
  return {
    scale: {
      transform: `scale(${scale})`
    },
    backCard: {
      backgroundImage: `url(${backCard})`,
      backgroundSize: "cover"
    },
    toad: {
      backgroundPosition: "-30px -2px"
    },
    didi: {
      backgroundPosition: "-240px -2px"
    },
    yoshi: {
      backgroundPosition: "-430px -2px"
    },
    kong: {
      backgroundPosition: "-602px -2px"
    },
    boo: {
      backgroundPosition: "-30px -204px"
    },
    mario: {
      backgroundPosition: "-230px -204px"
    },
    mario2: {
      backgroundPosition: "-430px -204px"
    },
    wario: {
      backgroundPosition: "-632px -204px"
    },
    birdo: {
      backgroundPosition: "-40px -402px"
    },
    kong2: {
      backgroundPosition: "-240px -402px"
    },
    luigi: {
      backgroundPosition: "-430px -402px"
    },
    shyguy: {
      backgroundPosition: "-632px -402px"
    },
    browser: {
      backgroundPosition: "-40px -602px"
    },
    red: {
      backgroundPosition: "-240px -602px"
    },
    dryBones: {
      backgroundPosition: "-430px -602px"
    },
    honeyQueen: {
      backgroundPosition: "-632px -602px"
    },
    toadette: {
      backgroundPosition: "-40px -802px"
    },
    dryBowser: {
      backgroundPosition: "-240px -802px"
    },
    peach: {
      backgroundPosition: "-430px -802px"
    },
    marioKart: {
      backgroundPosition: "-632px -802px"
    },
    browserJr: {
      backgroundPosition: "-30px -1002px"
    },
    green: {
      backgroundPosition: "-240px -1002px"
    },
    worm: {
      backgroundPosition: "-400px -1002px"
    },
    daisy: {
      backgroundPosition: "-632px -1002px"
    }
  };
};

export default styles;
