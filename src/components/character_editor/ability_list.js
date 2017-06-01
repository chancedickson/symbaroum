import React from "react";
import {Map} from "immutable";
import classNames from "classnames";
import {SimpleBlockList} from "../block_list.js";
import {Input, Select, TextArea} from "../form.js";
import {abilityRanks} from "../../data";

const defaultAbility = Map({
  name: "",
  type: "",
  rank: "",
  effect: ""
});

function Ability({className, value, onChange}) {
  return (
    <div className={classNames("ability", className)}>
      <Input label="Name" value={value.get("name")}
        onChange={(v) => onChange(value.set("name", v))} />
      <Input label="Type" value={value.get("type")}
        onChange={(v) => onChange(value.set("type", v))} />
      <Select label="Rank" value={value.get("rank")}
        options={abilityRanks}
        onChange={(v) => onChange(value.set("rank", v))} />
      <TextArea label="Effect" value={value.get("effect")}
        onChange={(v) => onChange(value.set("effect", v))} />
    </div>
  );
}

const AbilityList = SimpleBlockList(Ability, defaultAbility, {
  addLabel: "Add Ability",
  className: "ability-list",
  limit: 12
});

export {AbilityList, Ability};
