import Preact from "preact";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import classNames from "classnames";
import {AbilityList} from "./ability_list.js";
import {InventoryList} from "./inventory_list.js";
import {ArmorList} from "./armor_list.js";
import {WeaponList} from "./weapon_list.js";
import {GroupList} from "./group_list.js";
import {ArtifactList} from "./artifact_list.js";
import {Group, Input, Select, TextArea} from "../form.js";
import {updateCharacters, showModal} from "../../store/actions.js";
import {races} from "../../data";

const CharacterInformation = Group(({className}) => {
  return (
    <div className={classNames(className, "header")}>
      <h2>Character Information</h2>
      <Link to="/" className="button home">Main Menu</Link>
    </div>
  );
});

const Attributes = Group("Attributes");
const Abilities = Group("Abilities");
const Equipment = Group("Equipment");
const Inventory = Group("Inventory");
const Friends = Group("Group");
const Artifacts = Group("Artifacts and Mystical Treasures");

function CharacterEditorView({characters, character, updateCharacter, showModal, match, history}) {
  if (!character) {
    return <Redirect to="/" />;
  }
  return (
    <div className="character-editor">
      <CharacterInformation>
        <Input id="player" label="Player" value={character.get("player")}
          onChange={(v) => updateCharacter("player", v)} />
        <Input id="name" label="Name" value={character.get("name")}
          onChange={(v) => updateCharacter("name", v)} />
        <Select id="race" label="Race" value={character.get("race")}
          options={races}
          onChange={(v) => updateCharacter("race", v)} />
        <Input id="occupation" label="Occupation"
          value={character.get("occupation")}
          onChange={(v) => updateCharacter("occupation", v)} />
        <Input id="quote" label="Quote"
          value={character.get("quote")}
          onChange={(v) => updateCharacter("quote", v)} />
        <Input id="unspent-xp" label="Unspent XP" value={character.get("unspentXP")}
          type="number"
          onChange={(v) => updateCharacter("unspentXP", v)} />
        <Input id="total-xp" label="Total XP" value={character.get("totalXP")}
          type="number"
          onChange={(v) => updateCharacter("totalXP", v)} />
        <Input id="permanent-corruption" label="Permanent Corruption" value={character.get("permanentCorruption")}
          type="number"
          onChange={(v) => updateCharacter("permanentCorruption", v)} />
        <Input id="temporary-corruption" label="Temporary Corruption" value={character.get("temporaryCorruption")}
          type="number"
          onChange={(v) => updateCharacter("temporaryCorruption", v)} />
        <Input id="age" label="Age" value={character.get("age")}
          onChange={(v) => updateCharacter("age", v)} />
        <Input id="height" label="Height" value={character.get("height")}
          onChange={(v) => updateCharacter("height", v)} />
        <Input id="weight" label="Weight" value={character.get("weight")}
          onChange={(v) => updateCharacter("weight", v)} />
        <TextArea id="appearance" label="Appearance" value={character.get("appearance")}
          onChange={(v) => updateCharacter("appearance", v)} />
        <TextArea id="background" label="Background" value={character.get("background")}
          onChange={(v) => updateCharacter("background", v)} />
        <TextArea id="personal-goal" label="Personal Goal" value={character.get("personalGoal")}
          onChange={(v) => updateCharacter("personalGoal", v)} />
        <TextArea id="shadow" label="Shadow" value={character.get("shadow")}
          onChange={(v) => updateCharacter("shadow", v)} />
      </CharacterInformation>
      <Attributes className="attributes" columns={2}>
        <Input id="accurate" label="Accurate" value={character.get("accurate")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("accurate", v)} />
        <Input id="cunning" label="Cunning" value={character.get("cunning")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("cunning", v)} />
        <Input id="discreet" label="Discreet" value={character.get("discreet")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("discreet", v)} />
        <Input id="persuasive" label="Persuasive"
          type="number"
          min="0"
          value={character.get("persuasive")}
          onChange={(v) => updateCharacter("persuasive", v)} />
        <Input id="quick" label="Quick" value={character.get("quick")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("quick", v)} />
        <Input id="resolute" label="Resolute" value={character.get("resolute")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("resolute", v)} />
        <Input id="strong" label="Strong" value={character.get("strong")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("strong", v)} />
        <Input id="vigilant" label="Vigilant" value={character.get("vigilant")}
          type="number"
          min="0"
          onChange={(v) => updateCharacter("vigilant", v)} />
      </Attributes>
      <Abilities>
        <AbilityList list={character.get("abilities")}
          onChange={(v) => updateCharacter("abilities", v)} />
      </Abilities>
      <Equipment>
        <WeaponList list={character.get("weapons")}
          onChange={(v) => updateCharacter("weapons", v)} />
        <ArmorList list={character.get("armor")}
          onChange={(v) => updateCharacter("armor", v)} />
      </Equipment>
      <Inventory>
        <Input label="Money" value={character.get("money")}
          onChange={(v) => updateCharacter("money", v)} />
        <Input label="Assets" value={character.get("assets")}
          onChange={(v) => updateCharacter("assets", v)} />
        <InventoryList list={character.get("inventory")}
          onChange={(v) => updateCharacter("inventory", v)} />
      </Inventory>
      <Friends>
        <Input label="Group Name" value={character.getIn(["group", "name"])}
          onChange={(v) => updateCharacter(["group", "name"], v)} />
        <Input label="Group Goal" value={character.getIn(["group", "goal"])}
          onChange={(v) => updateCharacter(["group", "goal"], v)} />
        <GroupList list={character.getIn(["group", "members"])}
          onChange={(v) => updateCharacter(["group", "members"], v)} />
      </Friends>
      <Artifacts>
        <ArtifactList list={character.get("artifacts")}
          onChange={(v) => updateCharacter("artifacts", v)} />
      </Artifacts>
      <div className="footer">
        <Link to="/" className="button home">Main Menu</Link>
        <Link to={`/character/${match.params.id}/print`} className="button print">Print</Link>
        <a className="button download" role="button" href={`data:text/json;charset=utf-8,${JSON.stringify(character.toJS())}`} download={`${character.get("name") || "character"}.json`}>Download</a>
        <button className="delete" onClick={() =>
          showModal(`Are you sure you want to delete ${character.get("name") || "this character"}? `,
            updateCharacters([], characters.delete(match.params.id)),
            () => history.push("/"))}>Delete</button>
      </div>
    </div>
  );
}

function mapState(state, {match}) {
  return {
    characters: state.get("characters"),
    character: state.get("characters").get(match.params.id)
  };
}

function mapDispatch(dispatch, {match}) {
  return bindActionCreators({
    updateCharacter(k, v) {
      return updateCharacters([match.params.id].concat(k), v);
    },
    showModal
  }, dispatch);
}

export const CharacterEditor = withRouter(connect(mapState, mapDispatch)(CharacterEditorView));
