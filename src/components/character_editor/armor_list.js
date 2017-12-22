import Preact from "preact";
import {Map} from "immutable";
import classNames from "classnames";
import {SimpleBlockList} from "../block_list.js";
import {Input} from "../form.js";

const defaultArmor = Map({
  name: "",
  quality: "",
  protection: "",
  defense: ""
});

export function Armor({value, onChange, className}) {
  return (
    <div className={classNames("armor", className)}>
      <Input label="Name" value={value.get("name")}
        onChange={(v) => onChange(value.set("name", v))} />
      <Input label="Quality" value={value.get("quality")}
        onChange={(v) => onChange(value.set("quality", v))} />
      <Input label="Protection" value={value.get("protection")}
        onChange={(v) => onChange(value.set("protection", v))} />
      <Input label="Defense" value={value.get("defense")}
        onChange={(v) => onChange(value.set("defense", v))} />
    </div>
  );
}

export const ArmorList = SimpleBlockList(Armor, defaultArmor, {
  addLabel: "Add Armor",
  className: "armor-list",
  limit: 2
});
