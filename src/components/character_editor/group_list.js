import React from "react";
import {Map} from "immutable";
import classNames from "classnames";
import {SimpleBlockList} from "../block_list.js";
import {Input, Select} from "../form.js";
import {races} from "../../data";

const defaultMember = Map({
  name: "",
  race: races[0],
  occupation: "",
  player: ""
});

function Member({className, value, onChange}) {
  return (
    <div className={classNames("item", className)}>
      <Input label="Name" value={value.get("name")}
        onChange={(v) => onChange(value.set("name", v))} />
      <Select label="Race" value={value.get("race")}
        options={races}
        onChange={(v) => onChange(value.set("race", v))} />
      <Input label="Occupation" value={value.get("occupation")}
        onChange={(v) => onChange(value.set("occupation", v))} />
      <Input label="Player" value={value.get("player")}
        onChange={(v) => onChange(value.set("player", v))} />
    </div>
  );
}

const GroupList = SimpleBlockList(Member, defaultMember, {
  addLabel: "Add Member",
  className: "member-list",
  limit: 6
});

export {Member, GroupList};
