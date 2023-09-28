import React, { useContext } from "react";
import { Button, Checkbox, Dropdown, Grid, Icon, Popup } from "semantic-ui-react";
import { pure } from "recompose";

import TranslationContext from "Layout/TranslationContext";

function valueColor(value) {
  if (value === "base")
    return "green";
  else
    return "yellow";
}

function Columns({ blob, value, onUpdateColumn, onToggleColumn, onDelete }) {
  const getTranslation = useContext(TranslationContext);
  const name = (value === "base") ?  getTranslation("base sentence") :  getTranslation("sentence");

  onUpdateColumn("sentence", value, null);

  return (
    <div className="blob">
      <Button negative icon="trash" size="tiny" onClick={() => onDelete(blob.get("id"))} />
      <b className="blob-name">{blob.get("name")}</b>
      <div className="blob-columns">
        <Button size="tiny" className="column-button" color={valueColor(value)}>
          {name}
        </Button>
      </div>
      <Checkbox className="blob-checkbox" onClick={onToggleColumn} checked={blob.get("add")} />
    </div>
  );
}

function Linker({ blobs, state, onSelect, onDelete, onUpdateColumn, onToggleColumn }) {
  const getTranslation = useContext(TranslationContext);

  const stateOptions = blobs.reduce(
    (acc, blob) => [
      ...acc,
      {
        key: blob.get("id").join("/"),
        value: blob.get("id").join("/"),
        text: blob.get("name")
      }
    ],
    []
  );

  const first = state.first();
  const selected = first ? first.get("id").join("/") : null;

  function onChange(event, data) {
    onSelect(data.value.split("/").map(x => parseInt(x, 10)));
  }

  let i = 0;

  return (
    <div className="linker">
      <Dropdown
        className="main-select"
        search
        selection
        placeholder={getTranslation("Base blob")}
        options={stateOptions}
        value={selected}
        onChange={onChange}
      />
      {state
        .map((v, id) => (
          <Columns
            key={id.join("/")}
            blob={v}
            value={ (i++) ? "secondary" : "base" }
            onUpdateColumn={onUpdateColumn(id)}
            onToggleColumn={onToggleColumn(id)}
            onDelete={onDelete}
          />
        ))
        .toArray()}
    </div>
  );
}

export default pure(Linker);
