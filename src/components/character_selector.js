import Preact from "preact";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Map, List} from "immutable";
import {updateCharacters} from "../store/actions.js";
import {BlockList} from "./block_list.js";
import {races} from "../data";

function Name({name}) {
  if (name) {
    return <h2>{name}</h2>;
  }
  return <h2 className="no-name">No Name</h2>;
}

function Character({className, value, onClick}) {
  return (
    <div className={className} onClick={onClick}>
      <Name name={value.get("name")} />
      <p>{races[value.get("race")]} {value.get("occupation")} &mdash; {value.get("xp")} XP</p>
    </div>
  );
}

const defaultCharacter = Map({
  player: "",
  name: "",
  race: Object.keys(races)[0],
  occupation: "",
  quote: "",
  unspentXP: 0,
  totalXP: 0,
  permanentCorruption: 0,
  temporaryCorruption: 0,
  age: "",
  height: "",
  weight: "",
  appearance: "",
  background: "",
  personalGoal: "",
  shadow: "",
  accurate: 0,
  cunning: 0,
  discreet: 0,
  persuasive: 0,
  quick: 0,
  resolute: 0,
  strong: 0,
  vigilant: 0,
  abilities: List(),
  armor: List(),
  weapons: List(),
  money: "",
  assets: "",
  inventory: List(),
  group: Map({ members: List(), name: "", goal: "" }),
  artifacts: List()
});

const CharacterList = BlockList(Character, {
  addLabel: "New Character"
});

function mapState(state) {
  return {
    characters: state.get("characters")
  };
}

export function CharacterSelectorView({characters, updateCharacters, history}) {
  return (
    <CharacterList className="character-list" list={characters}
      onClickItem={(i) => history.push(`/character/${i}`)}
      onClickNew={() => {
        updateCharacters([], characters.push(defaultCharacter));
        history.push(`/character/${characters.size}`);
      }} />
  );
}

export const CharacterSelector = withRouter(connect(mapState, {updateCharacters})(CharacterSelectorView));
