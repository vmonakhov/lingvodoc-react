import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { compose, shouldUpdate } from 'recompose';
import Immutable from 'immutable';
import EditModal from 'components/EditLanguageModal';
import CreateModal from 'components/CreateLanguageModal';
import { openModalEdit, openModalCreate } from 'ducks/language';
import { languagesQuery, moveLanguageMutation, deleteLanguageMutation } from 'graphql/language';
import { buildLanguageTree } from 'pages/Search/treeBuilder';
import LanguagesTree from './LanguagesTree';

const Languages = (props) => {
  const { data, deleteLanguage, moveLanguage, actions, height, selected, onSelect } = props;
  const { error, loading } = data;
  if (error || loading) {
    return null;
  }

  const { language_tree: languages, is_authenticated: isAuthenticated } = data;
  const languagesTree = buildLanguageTree(Immutable.fromJS(languages));
  let heightStyle = height ? { height: height } : { height: '100%' };
  return (
    <div style={heightStyle}>
      <LanguagesTree
        languagesTree={languagesTree}
        edit={isAuthenticated}
        editLanguage={actions.openModalEdit}
        createLanguage={actions.openModalCreate}
        moveLanguage={moveLanguage}
        deleteLanguage={deleteLanguage}
        selected={selected}
        onSelect={onSelect}
      />
      <CreateModal />
      <EditModal />
    </div>
  );
};

Languages.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    language_tree: PropTypes.array,
  }).isRequired,
  actions: PropTypes.shape({
    openModalEdit: PropTypes.func,
    openModalCreate: PropTypes.func,
  }).isRequired,
  moveLanguage: PropTypes.func.isRequired,
  deleteLanguage: PropTypes.func.isRequired,
};

export default compose(
  graphql(languagesQuery),
  graphql(deleteLanguageMutation, { name: 'deleteLanguage' }),
  graphql(moveLanguageMutation, { name: 'moveLanguage' }),
  connect(
    state => state.language,
    dispatch => ({
      actions: bindActionCreators({ openModalEdit, openModalCreate }, dispatch),
    })
  ),
  shouldUpdate(() => true),
)(Languages);
