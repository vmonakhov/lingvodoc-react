import React, { useContext } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Popup } from "semantic-ui-react";
import { find, isEqual } from "lodash";
import PropTypes from "prop-types";
import { onlyUpdateForKeys } from "recompose";
import { bindActionCreators } from "redux";

import { openModal as openConfirmModal } from "ducks/confirm";
import { openViewer } from "ducks/markup";
import { openModal } from "ducks/modals";
import TranslationContext from "Layout/TranslationContext";

import Entities from "./index";
import ParserResults from "./ParserResults";
import RunParserModal from "./RunParserModal";
import { content } from "./Sound";

const MarkupEntityContent = onlyUpdateForKeys(["entity", "mode"])(
  ({ entity, parentEntity, mode, publish, accept, remove, actions, columns, allEntriesGenerator }) => {
    const forParse = entity.is_subject_for_parsing;
    const getTranslation = useContext(TranslationContext);

    switch (mode) {
      case "edit":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
              as="a" 
              href={entity.content}
            />
            <Popup 
              trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />} 
              content={entity.content} 
              hideOnScroll={true}
              className="lingvo-popup-break"
            />
            <Button
              icon={forParse ? <i className="lingvo-icon lingvo-icon_power" /> : <i className="lingvo-icon lingvo-icon_table2" />} 
              onClick={() =>
                forParse
                  ? actions.openModal(RunParserModal, { entityId: entity.id })
                  : actions.openViewer(parentEntity, entity, columns, allEntriesGenerator)
              }
            />
            <Button icon={<i className="lingvo-icon lingvo-icon_delete2" />} 
              onClick={() => actions.openConfirmModal(`${getTranslation("Delete markup file")}?`, () => remove(entity))}
            />
          </Button.Group>
        );

      case "publish":
        return (
          <div className="lingvo-entry-text">
            <Button.Group basic icon className="lingvo-buttons-group">
              <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
                as="a" 
                href={entity.content}
              />
              <Popup 
                trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />} 
                content={entity.content} 
                hideOnScroll={true}
                className="lingvo-popup-break"
              />
              {!forParse && (
                <Button
                  icon={<i className="lingvo-icon lingvo-icon_table2" />}
                  onClick={() => actions.openViewer(parentEntity, entity, columns, allEntriesGenerator)}
                />
              )}
            </Button.Group>
            <Checkbox
              size="tiny"
              checked={entity.published}
              onChange={(_e, { checked }) => publish(entity, checked)}
              className="lingvo-checkbox lingvo-entry-text__checkbox"
            />
          </div>
        );

      case "view":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
              as="a" 
              href={entity.content}
            />
            <Popup 
              trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />} 
              content={entity.content} 
              hideOnScroll={true}
              className="lingvo-popup-break"
            />
            {!forParse && (
              <Button
                icon={<i className="lingvo-icon lingvo-icon_table2" />}
                onClick={() => actions.openViewer(parentEntity, entity, columns, allEntriesGenerator)}
              />
            )}
          </Button.Group>
        );

      case "contributions":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
              as="a" 
              href={entity.content}
            />
            <Popup
              trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />}
              content={entity.content} 
              hideOnScroll={true}
              className="lingvo-popup-break"
            />
            {!forParse && (
              <Button
                icon={<i className="lingvo-icon lingvo-icon_table2" />}
                onClick={() => actions.openViewer(parentEntity, entity, columns, allEntriesGenerator)}
              />
            )}
            {!entity.accepted && 
              <Button 
                icon={<i className="lingvo-icon lingvo-icon_check2" />} 
                onClick={() => accept(entity, true)}
              />
            }
          </Button.Group>
        );

      default:
        return null;
    }
  }
);

const Markup = props => {
  const {
    column,
    columns,
    entity,
    parentEntity,
    entry,
    allEntriesGenerator,
    mode,
    as: Component = "li",
    className = "",
    publish,
    accept,
    remove,
    actions
  } = props;
  const subColumn = find(columns, c => isEqual(c.self_id, column.column_id));

  return (
    <Component className={className}>
      <MarkupEntityContent
        entity={entity}
        parentEntity={parentEntity}
        columns={columns}
        allEntriesGenerator={allEntriesGenerator}
        mode={mode}
        publish={publish}
        accept={accept}
        remove={remove}
        actions={actions}
      />
      {subColumn && (
        <Entities
          column={subColumn}
          columns={columns}
          entry={entry}
          allEntriesGenerator={allEntriesGenerator}
          parentEntity={entity}
          parentColumn={column}
          mode={mode}
        />
      )}
      {!subColumn && entity.is_subject_for_parsing && <ParserResults entityId={entity.id} mode={mode} />}
    </Component>
  );
};

Markup.propTypes = {
  column: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  entry: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  parentEntity: PropTypes.object,
  mode: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  publish: PropTypes.func,
  accept: PropTypes.func,
  remove: PropTypes.func,
  actions: PropTypes.object.isRequired
};

Markup.defaultProps = {
  parentEntity: null,
  as: "li",
  className: ""
};

Markup.Edit = ({ onSave }) => <input type="file" onChange={e => onSave(e.target.files[0])} className="lingvo-input-file" />;

Markup.Edit.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

Markup.Edit.defaultProps = {
  onSave: () => {},
  onCancel: () => {}
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ openViewer, openModal, openConfirmModal }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Markup);
