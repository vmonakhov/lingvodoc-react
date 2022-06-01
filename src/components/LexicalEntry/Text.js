import React from "react";
import { Button, Checkbox, Input } from "semantic-ui-react";
import { find, isEqual } from "lodash";
import PropTypes from "prop-types";
import { onlyUpdateForKeys } from "recompose";

import Entities from "./index";

class TextEntityContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      content: props.entity.content
    };

    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    const { entity, update } = this.props;
    const { edit, content } = this.state;
    if (!edit) {
      this.setState({ edit: true });
    } else {
      update(entity, content);
      this.setState({ edit: false });
    }
  }

  render() {
    const {
      entity,
      mode,
      publish,
      column,
      accept,
      remove,
      is_being_removed,
      is_being_updated,
      checkEntries,
      checkedRow,
      resetCheckedRow,
      checkedColumn,
      resetCheckedColumn,
      checkedAll,
      resetCheckedAll
    } = this.props;

    if (checkEntries) {
      if (checkedAll) {
        if (checkedAll.checkedAll) {
          if (!entity.published) {
            publish(entity, true);
          }
        } else {
          if (entity.published) {
            publish(entity, false);
          }
        }
      }

      if (checkedRow) {
        if (JSON.stringify(checkedRow.id) === JSON.stringify(entity.parent_id)) {
          if (checkedRow.checkedRow) {
            if (!entity.published) {
              publish(entity, true);
            }
          } else {
            if (entity.published) {
              publish(entity, false);
            }
          }
        }
      }

      if (checkedColumn) {
        if (JSON.stringify(checkedColumn.id) === JSON.stringify(entity.field_id)) {
          if (checkedColumn.checkedColumn) {
            if (!entity.published) {
              publish(entity, true);
            }
          } else {
            if (entity.published) {
              publish(entity, false);
            }
          }
        }
      }
    }

    switch (mode) {
      case "edit":
        return (
          <div>
            {!(is_being_updated || this.state.edit) && this.state.content}
            {(is_being_updated || this.state.edit) && (
              <Input
                size="mini"
                onChange={(event, target) => this.setState({ content: target.value })}
                value={this.state.content}
              />
            )}
            <Button.Group basic icon size="mini">
              <Button
                icon={is_being_updated ? "spinner" : this.state.edit ? "save" : "edit"}
                onClick={this.onEdit}
                disabled={is_being_updated}
              />
              {is_being_removed ? (
                <Button icon="spinner" disabled />
              ) : (
                <Button icon="remove" onClick={() => remove(entity)} />
              )}
            </Button.Group>
          </div>
        );
      case "publish":
        return (
          <div className="lingvo-entry-text">
            {column.english_translation &&
            column.english_translation === "Number of the languages" &&
            entity.id &&
            entity.parent_id ? (
              <a
                href={`/dictionary/${entity.parent_id[0]}/${entity.parent_id[1]}/perspective/${entity.id[0]}/${entity.id[1]}/edit`}
                className="lingvo-languages-link"
              >
                {entity.content}
              </a>
            ) : (
              entity.content
            )}
            <Checkbox
              className="lingvo-checkbox lingvo-entry-text__checkbox" 
              checked={entity.published}
              onChange={(e, { checked }) => {
                publish(entity, checked);

                if (checkEntries) {
                  if (checkedRow) {
                    resetCheckedRow();
                  }
                  if (checkedColumn) {
                    resetCheckedColumn();
                  }
                  if (checkedAll) {
                    resetCheckedAll();
                  }
                }
              }}
            />
          </div>
        );

      case "view":
        return entity.content;
      case "contributions":
        return entity.accepted ? (
          entity.content
        ) : (
          <Button.Group icon size="small">
            <Button basic color="black" content={entity.content} />
            <Button basic color="black" icon="check" onClick={() => accept(entity, true)} />
          </Button.Group>
        );
      default:
        return null;
    }
  }
}

const Text = onlyUpdateForKeys([
  "entry",
  "entity",
  "mode",
  "is_being_removed",
  "is_being_updated",
  "checkedRow",
  "checkedColumn",
  "checkedAll"
])(props => {
  const {
    perspectiveId,
    column,
    columns,
    checkEntries,
    checkedRow,
    resetCheckedRow,
    checkedColumn,
    resetCheckedColumn,
    checkedAll,
    resetCheckedAll,
    entry,
    allEntriesGenerator,
    entity,
    mode,
    entitiesMode,
    as: Component,
    className,
    publish,
    accept,
    remove,
    update,
    is_being_removed,
    is_being_updated
  } = props;

  const subColumn = find(columns, c => isEqual(c.self_id, column.column_id));

  return (
    <Component className={className}>
      <TextEntityContent
        entity={entity}
        checkEntries={checkEntries}
        checkedRow={checkedRow}
        resetCheckedRow={resetCheckedRow}
        checkedColumn={checkedColumn}
        resetCheckedColumn={resetCheckedColumn}
        checkedAll={checkedAll}
        resetCheckedAll={resetCheckedAll}
        mode={mode}
        publish={publish}
        column={column}
        accept={accept}
        remove={remove}
        update={update}
        is_being_removed={is_being_removed}
        is_being_updated={is_being_updated}
      />
      {subColumn && (
        <Entities
          perspectiveId={perspectiveId}
          column={subColumn}
          columns={columns}
          entry={entry}
          allEntriesGenerator={allEntriesGenerator}
          mode={mode}
          entitiesMode={entitiesMode}
          publish={publish}
          remove={remove}
          accept={accept}
          update={update}
        />
      )}
    </Component>
  );
});

Text.propTypes = {
  perspectiveId: PropTypes.array.isRequired,
  column: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  checkEntries: PropTypes.bool,
  checkedRow: PropTypes.object,
  checkedColumn: PropTypes.object,
  checkedAll: PropTypes.object,
  entry: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  entitiesMode: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  publish: PropTypes.func,
  accept: PropTypes.func,
  remove: PropTypes.func,
  update: PropTypes.func,
  resetCheckedRow: PropTypes.func,
  resetCheckedColumn: PropTypes.func,
  resetCheckedAll: PropTypes.func
};

Text.defaultProps = {
  as: "li",
  className: ""
};

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event, target) {
    this.setState({ content: target.value });
  }

  onKeyPress(e) {
    const { onSave } = this.props;
    if (e.key === "Enter") {
      onSave(this.state.content);
    }
  }

  onKeyDown(e) {
    const { onCancel } = this.props;
    if (e.keyCode === 27) {
      onCancel();
    }
  }

  render() {
    const { onSave, onCancel, is_being_created } = this.props;
    return (
      <Input
        size="mini"
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onKeyDown={this.onKeyDown}
        onBlur={() => onSave(this.state.content)}
        action={
          <Button.Group basic size="mini">
            <Button icon={is_being_created ? "spinner" : "save"} disabled={is_being_created} />
            <Button icon="remove" onClick={onCancel} />
          </Button.Group>
        }
      />
    );
  }
}

Edit.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

Edit.defaultProps = {
  onSave: () => {},
  onCancel: () => {}
};

Text.Edit = Edit;

export default Text;
