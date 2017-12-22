import Preact from "preact";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Map} from "immutable";
import {races, abilityRanks} from "../data";
import {Input} from "./form.js";
import {setPageSize} from "../store/actions.js";

function Labeled(props) {
  const {label, children: text, underlined = true, className = "", ...pass} = props;
  return (
    <div {...pass} className={`labeled ${underlined ? "underlined" : ""} ${className}`}>
      <p className="label">{label}</p>
      <p className="text">{text}</p>
    </div>
  );
}

function Block({label, children: text}) {
  return (
    <div className="block">
      <p className="label">{label}</p>
      {text !== undefined && <p className="text">{text}</p>}
    </div>
  );
}

function Attribute({label, value}) {
  return (
    <div className="attribute">
      <p className="value">{value}</p>
      <p className="label">{label}</p>
    </div>
  );
}

function Info({character}) {
  return (
    <div className="info">
      <div className="left-block">
        <Labeled label="Player">{character.get("player")}</Labeled>
        <Labeled label="Name">{character.get("name")}</Labeled>
        <Labeled label="Race">{races[character.get("race")]}</Labeled>
        <Labeled label="Occupation">{character.get("occupation")}</Labeled>
      </div>
      <div className="center-block">
        <Block label="Maximum Toughness">{Math.max(character.get("strong"), 10)}</Block>
        <Block label="Current"></Block>
        <Block label="Pain Threshold">{Math.ceil(character.get("strong") / 2)}</Block>
        <Block label="Corruption Threshold">{Math.ceil(character.get("resolute") / 2)}</Block>
        <Block label="Permanent">{character.get("permanentCorruption")}</Block>
        <Block label="Temporary">{character.get("temporaryCorruption")}</Block>
      </div>
      <div className="right-block">
        <Labeled label="Shadow" className="shadow">{character.get("shadow")}</Labeled>
        <div className="xp">
          <Labeled label="Total XP">{character.get("totalXP")}</Labeled>
          <Labeled label="Unspent XP">{character.get("unspentXP")}</Labeled>
        </div>
        <Labeled label="Quote">{character.get("quote")}</Labeled>
      </div>
    </div>
  );
}

function Attributes({character}) {
  return (
    <div className="attributes">
      <Attribute label="Accurate" value={character.get("accurate")} />
      <Attribute label="Cunning" value={character.get("cunning")} />
      <Attribute label="Discreet" value={character.get("discreet")} />
      <Attribute label="Persuasive" value={character.get("persuasive")} />
      <Attribute label="Quick" value={character.get("quick")} />
      <Attribute label="Resolute" value={character.get("resolute")} />
      <Attribute label="Strong" value={character.get("strong")} />
      <Attribute label="Vigilant" value={character.get("vigilant")} />
    </div>
  );
}

function Ability({ability}) { 
  return (
    <div className="ability">
      <Labeled label="name" underlined={false} className="name">{ability.get("name")}</Labeled>
      <Labeled label="effect" underlined={false} className="effect">{ability.get("effect")}</Labeled>
      <div className="type-rank">
        <Labeled label="type" underlined={false}>{ability.get("type")}</Labeled>
        <Labeled label="rank" underlined={false}>{abilityRanks[ability.get("rank")]}</Labeled>
      </div>
    </div>
  );
}

function listPad(list, n, e = Map()) {
  if (list.size < n) {
    return listPad(list.push(e), n, e);
  } else if (list.size > n) {
    return list.slice(0, n);
  }
  return list;
}

function Abilities({character}) {
  const abilities = listPad(character.get("abilities"), 12)
    .map((e, i) => <Ability key={i} ability={e} />).toJSON();
  return (
    <div className="abilities-container container">
      <h2>Abilities &amp; Powers</h2>
      <div className="abilities">
        {abilities}
      </div>
    </div>
  );
}

function Weapon({weapon}) {
  return (
    <div className="weapon">
      <Labeled className="name" label="weapon">{weapon.get("name")}</Labeled>
      <Labeled className="damage" label="damage">{weapon.get("damage")}</Labeled>
      <Labeled className="quality" label="quality">{weapon.get("quality")}</Labeled>
      <Labeled className="attribute" label="attribute">{weapon.get("attribute")}</Labeled>
    </div>
  );
}

function Armor({armor}) {
  return (
    <div className="armor">
      <Labeled label="armor" underlined={false}>{armor.get("name")}</Labeled>
      <Labeled label="protection" underlined={false}>{armor.get("protection")}</Labeled>
      <Labeled label="quality" underlined={false}>{armor.get("quality")}</Labeled>
      <div className="defense">
        <Labeled label="defense" underlined={false}>{armor.get("defense")}</Labeled>
      </div>
    </div>
  );
}

function Equipment({character}) {
  const weapons = listPad(character.get("weapons"), 4)
    .map((e, i) => <Weapon key={i} weapon={e} />);
  const armor = listPad(character.get("armor"), 2)
    .map((e, i) => <Armor key={i} armor={e} />);
  return (
    <div className="equipment-container container">
      <h2>Weapons &amp; Armor</h2>
      <div className="equipment">
        <div className="weapons">
          {weapons}
        </div>
        <div className="armors">
          {armor}
        </div>
      </div>
    </div>
  );
}

function Lore({character}) {
  return (
    <div className="lore-container container">
      <h2>Lore</h2>
      <div className="lore">
        <div className="details">
          <Labeled label="age">{character.get("age")}</Labeled>
          <Labeled label="height">{character.get("height")}</Labeled>
          <Labeled label="weight">{character.get("weight")}</Labeled>
        </div>
        <Labeled label="appearance">{character.get("appearance")}</Labeled>
        <Labeled label="background">{character.get("background")}</Labeled>
        <Labeled label="personal goal">{character.get("personalGoal")}</Labeled>
      </div>
    </div>
  );
}

function Member({member}) {
  return (
    <div className="member">
      <Labeled label="name">{member.get("name")}</Labeled>
      <Labeled label="race">{member.get("race")}</Labeled>
      <Labeled label="occupation">{member.get("occupation")}</Labeled>
      <Labeled label="player">{member.get("player")}</Labeled>
    </div>
  );
}

function Group({group}) {
  const members = listPad(group.get("members"), 5).map((e, i) => <Member key={i} member={e} />);
  return (
    <div className="group-container container">
      <h2>Group</h2>
      <div className="group">
        {members}
        <Labeled label="group name">{group.get("name")}</Labeled>
        <Labeled label="group goal">{group.get("goal")}</Labeled>
      </div>
    </div>
  );
}

function Artifact({artifact}) {
  return (
    <div className="artifact">
      <Labeled label="name">{artifact.get("name")}</Labeled>
      <Labeled label="power" className="power">{artifact.get("power")}</Labeled>
      <Labeled label="corruption">{artifact.get("corruption")}</Labeled>
    </div>
  );
}

function Artifacts({artifacts}) {
  const elements = listPad(artifacts, 4)
    .map((e, i) => <Artifact key={i} artifact={e} />);
  return (
    <div className="artifact-container container">
      <h2>Artifacts &amp; Mystical Treasures</h2>
      <div className="artifacts">
        {elements}
      </div>
    </div>
  );
}

function Item({item}) {
  return (
    <div className="item">
      <Labeled label="name">{item.get("name")}</Labeled>
      <Labeled label="description">{item.get("description")}</Labeled>
    </div>
  );
}

function Inventory({inventory, money, assets}) {
  const items = listPad(inventory, 12)
    .map((e, i) => <Item key={i} item={e} />);
  return (
    <div className="inventory-container container">
      <h2>Inventory</h2>
      <div className="inventory">
        {items}
        <Labeled label="money" className="money">{money}</Labeled>
        <Labeled label="assets" className="assets">{assets}</Labeled>
      </div>
    </div>
  );
}

function mapState(state, {match}) {
  return {
    character: state.get("characters").get(match.params.id),
    pageSize: state.get("pageSize", "letter")
  };
}

function PrintSheetView({character, setPageSize, pageSize, match}) {
  return (
    <div className="print">
      <div className="header-container">
        <div className="header">
          <p className="notice">This header will not be printed.</p>
          <div className="print-controls">
            <p className="page-size">Page Size</p>
            <Input reverse={true} type="radio" name="page-size" value="letter" checked={pageSize === "letter"} onChange={() => setPageSize("letter")} label="Letter" />
            <Input reverse={true} type="radio" name="page-size" value="a4" checked={pageSize === "a4"} onChange={() => setPageSize("a4")} label="A4" />
          </div>
          <button className="print" onClick={() => window.print()}>Open Print Dialog</button>
          <Link to={`/character/${match.params.id}`} className="button leave">Return to Character</Link>
        </div>
      </div>
      <div className={`page ${pageSize}`}>
        <Info character={character} />
        <Attributes character={character} />
        <Abilities character={character} />
        <Equipment character={character} />
      </div>
      <div className={`page ${pageSize}`}>
        <Lore character={character} />
        <Group group={character.get("group")} />
        <Artifacts artifacts={character.get("artifacts")} />
        <Inventory inventory={character.get("inventory")} money={character.get("money")} assets={character.get("assets")} />
      </div>
    </div>
  );
}

export const PrintSheet = connect(mapState, {setPageSize})(PrintSheetView);
