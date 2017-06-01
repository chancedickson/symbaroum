import React from "react";
import {Map} from "immutable";
import classNames from "classnames";
import {SimpleBlockList} from "../block_list.js";
import {Input, TextArea} from "../form.js";

const defaultArtifact = Map({
  name: "",
  powers: "",
  corruption: ""
});

function Artifact({className, value, onChange}) {
  return (
    <div className={classNames("artifact", className)}>
      <Input label="Name" value={value.get("name")}
        onChange={(v) => onChange(value.set("name", v))} />
      <Input label="Corruption" value={value.get("corruption")}
        onChange={(v) => onChange(value.set("corruption", v))} />
      <TextArea label="Powers" value={value.get("powers")}
        onChange={(v) => onChange(value.set("powers", v))} />
    </div>
  );
}

const ArtifactList = SimpleBlockList(Artifact, defaultArtifact, {
  addLabel: "Add Artifact",
  className: "artifact-list",
  limit: 4
});

export {ArtifactList, Artifact};
