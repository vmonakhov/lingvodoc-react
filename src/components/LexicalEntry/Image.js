import React, { useContext } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Image as Img, Modal, Popup } from "semantic-ui-react";
import { find, isEqual } from "lodash";
import PropTypes from "prop-types";
import { onlyUpdateForKeys } from "recompose";
import { bindActionCreators } from "redux";

import { openModal as openConfirmModal } from "ducks/confirm";
import TranslationContext from "Layout/TranslationContext";

import Entities from "./index";
import { content } from "./Sound";

const ImageEntityContent = onlyUpdateForKeys(["entity", "mode"])(
  ({ entity, mode, publish, accept, remove, actions }) => {
    const getTranslation = useContext(TranslationContext);

    const standardFragment = (
      <>
        <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
          as="a" 
          href={entity.content}
          download
        />
        <Popup 
          trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />} 
          content={entity.content} 
          hideOnScroll={true} 
          className="lingvo-popup-break"
        />
        <Modal basic trigger={<Button icon={<i className="lingvo-icon lingvo-icon_image" />} />} style={{ width: "95%" }}>
          <Modal.Content>
            <Img src={entity.content} style={{ display: "block", margin: "auto" }} />
          </Modal.Content>
        </Modal>
      </>
    );

    switch (mode) {
      case "edit":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            {standardFragment}
            <Button icon={<i className="lingvo-icon lingvo-icon_delete2" />} 
              onClick={() => actions.openConfirmModal(`${getTranslation("Delete image file")}?`, () => remove(entity))}
            />
          </Button.Group>
        );

      case "publish":
        return (
          <div className="lingvo-entry-text">
            <Button.Group basic icon className="lingvo-buttons-group">
              {standardFragment}
            </Button.Group>
            <Checkbox
              size="tiny"
              checked={entity.published}
              onChange={(e, { checked }) => publish(entity, checked)}
              className="lingvo-checkbox lingvo-entry-text__checkbox"
            />
          </div>
        );

      case "view":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            {standardFragment}
          </Button.Group>
        );

      case "contributions":
        return (
          <Button.Group basic icon className="lingvo-buttons-group">
            <Button icon={<i className="lingvo-icon lingvo-icon_download" />}
              as="a" 
              href={entity.content}
              download
            />
            <Popup
              trigger={<Button content={content(entity.content)} className="lingvo-buttons-group__text" />}
              content={entity.content}
              hideOnScroll={true}
              className="lingvo-popup-break"
            />
            <Modal basic trigger={<Button icon={<i className="lingvo-icon lingvo-icon_image" />} />} style={{ width: "95%" }}>
              <Modal.Content>
                <Img src={entity.content} style={{ display: "block", margin: "auto" }} />
              </Modal.Content>
            </Modal>
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

const Image = props => {
  const {
    perspectiveId,
    column,
    columns,
    entity,
    entry,
    allEntriesGenerator,
    mode,
    entitiesMode,
    as: Component = "li",
    className = "",
    publish,
    accept,
    remove,
    actions
  } = props;
  const subColumn = find(columns, c => isEqual(c.self_id, column.column_id));
  const { content } = entity;

  const getTranslation = useContext(TranslationContext);

  return (
    <Component className={className}>
      <ImageEntityContent
        entity={entity}
        mode={mode}
        publish={publish}
        accept={accept}
        remove={remove}
        actions={actions}
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
          parentEntity={entity}
        />
      )}
    </Component>
  );
};

Image.propTypes = {
  perspectiveId: PropTypes.array.isRequired,
  column: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  entry: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  entitiesMode: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string
};

Image.defaultProps = {
  as: "li",
  className: ""
};

Image.Edit = ({ onSave }) => <input type="file" onChange={e => onSave(e.target.files[0])} className="lingvo-input-file" />;

Image.Edit.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

Image.Edit.defaultProps = {
  onSave: () => {},
  onCancel: () => {}
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ openConfirmModal }, dispatch)
});

export default connect(state => state, mapDispatchToProps)(Image);
