import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Divider, List, Checkbox, Button, Confirm } from 'semantic-ui-react';

import { openModal } from 'ducks/modals';
import { getTranslation } from 'api/i18n';
import UserVariantModal from './UserVariantModal';

/** Properties view of the corpus markup modal dialog */
class PropertiesView extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      elemToDelete: null
    };

    this.onToggleVariant = this.onToggleVariant.bind(this);
    this.onVariantsChanged = this.onVariantsChanged.bind(this);
    this.deleteVariant = this.deleteVariant.bind(this);
  }

  onToggleVariant(variant, checked) {
    const { selection, setDirty } = this.props;
    const { result } = variant;
    const selectedElem = document.getElementById(selection);

    document.getElementById(result.id).classList.toggle('approved');
    if (checked) {
      selectedElem.classList.remove('unverified');
      selectedElem.classList.add('verified');
    }
    else {
      if (!selectedElem.getElementsByClassName('result approved').length) {
        selectedElem.classList.remove('verified');
        selectedElem.classList.add('unverified');
      }
    }
    setDirty();
  }

  onVariantsChanged() {
    const { setDirty } = this.props;
    setDirty();
    this.forceUpdate();
  }

  deleteVariant() {
    const { elemToDelete } = this.state;
    const { selection, setDirty } = this.props;
    const selectedElem = document.getElementById(selection);

    document.getElementById(elemToDelete).remove();
    if (!selectedElem.getElementsByClassName('result approved').length) {
      selectedElem.classList.remove('verified');
      selectedElem.classList.add('unverified');
    }
    this.setState({ elemToDelete: null });
    setDirty();
  }

  render() {
    const { selection, openModal } = this.props;
    const { elemToDelete } = this.state;
    const isEdit = this.props.mode === 'edit';
    let results = selection !== null ? Array.from(document.getElementById(selection).getElementsByClassName('result')) : [];
    if (selection && !isEdit && document.getElementById(selection).classList.contains('verified')) {
      results = results.filter(result => result.classList.contains('approved'));
    }
    const variants = results.map(result => Object.assign( { result }, JSON.parse(result.innerText)));

    return (
      <div style={{ flex: '0 0 20%', padding: '10px', borderRight: '1px solid rgba(34, 36, 38, 0.15)' }}>
        <Header size="small">
          {selection !== null ? getTranslation('Proposed variants') : getTranslation('Please select an element')}
        </Header>
        { variants.length !== 0 &&
          <div>
            <Divider/>
            <List divided relaxed>
              { variants.map((variant, index) =>
                <List.Item key={index}>
                  <List.Content>
                    <List.Header style={{ display: 'flex', flexDirection: 'row', color: 'blue', fontWeight: 'bold' }}>
                      <Checkbox
                        key={variant.result.id}
                        defaultChecked={variant.result.classList.contains('approved')}
                        disabled={!isEdit}
                        onChange={(_e, data) => this.onToggleVariant(variant, data.checked)}
                        style={{ marginRight: '10px' }}
                      />
                      <span>
                        {variant.lex}
                      </span>
                      { isEdit && variant.result.classList.contains('user') &&
                        <div style={{ marginLeft: 'auto' }}>
                          <Button
                            icon="edit"
                            size="mini"
                            color="violet"
                            onClick={() => openModal(UserVariantModal, { variant, onSubmit: this.onVariantsChanged})}
                          />
                          <Button icon="delete" size="mini" color="red" onClick={() => this.setState({ elemToDelete: variant.result.id })}/>
                        </div>
                      }
                    </List.Header>
                    <List.Description style={{ display: 'flex', flexDirection: 'column', marginTop: 5, color: 'black' }}>
                      <span style={{ fontStyle: 'italic' }}>{variant.parts}</span>
                      <div style={{ margin: '5px 0' }}>
                        <span style={{ fontWeight: 'bold' }}>gloss: </span>
                        {variant.gloss}
                      </div>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>gr: </span>
                        {variant.gr}
                      </div>
                      <div style={{ marginTop: 5 }}>
                        <span style={{ fontWeight: 'bold' }}>trans_ru: </span>
                        {variant.trans_ru}
                      </div>
                    </List.Description>
                  </List.Content>
                </List.Item>
              )}
              { isEdit &&
                <List.Item key="add">
                  <Button
                    primary
                    fluid
                    icon="plus"
                    content={getTranslation('Add variant')}
                    onClick={() => openModal(UserVariantModal, { parent: variants[0].result.parentElement, onSubmit: this.onVariantsChanged})}
                  />
                </List.Item>
              }
            </List>
          </div>
        }
        <Confirm
          open={elemToDelete !== null}
          header={getTranslation('Confirmation')}
          content={getTranslation('Are you sure you want to delete this variant?' )}
          onConfirm={this.deleteVariant}
          onCancel={() => this.setState({ elemToDelete: null })}
        />
      </div>
    );
  }

}

PropertiesView.propTypes = {
  selection: PropTypes.string,
  mode: PropTypes.string.isRequired,
  setDirty: PropTypes.func.isRequired
};

export default connect(null, dispatch => bindActionCreators({ openModal }, dispatch))(PropertiesView);