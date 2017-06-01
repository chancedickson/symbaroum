import React from "react";
import {Map} from "immutable";
import classNames from "classnames";
import {SimpleBlockList} from "../block_list.js";
import {Input} from "../form.js";

const defaultWeapon = Map({
  name: "",
  quality: "",
  damage: "",
  attribute: ""
});

function Weapon({value, onChange, className}) {
  return (
    <div className={classNames("armor", className)}>
      <Input label="Name" value={value.get("name")}
        onChange={(v) => onChange(value.set("name", v))} />
      <Input label="Quality" value={value.get("quality")}
        onChange={(v) => onChange(value.set("quality", v))} />
      <Input label="Damage" value={value.get("damage")}
        onChange={(v) => onChange(value.set("damage", v))} />
      <Input label="Attribute" value={value.get("attribute")}
        onChange={(v) => onChange(value.set("attribute", v))} />
    </div>
  );
}

const WeaponList = SimpleBlockList(Weapon, defaultWeapon, {
  addLabel: "Add Weapon",
  className: "weapon-list",
  limit: 4
});

export {WeaponList, Weapon};
