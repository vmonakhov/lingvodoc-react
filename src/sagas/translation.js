import { call, put, spawn, select } from 'redux-saga/effects';
import { gql } from 'react-apollo';
import { err } from 'ducks/snackbar';
import { selectors } from 'ducks/apolloClient';
import { putTranslations } from 'ducks/translations';

const translationsQuery = gql`
  query translations {
    translationgists {
      id
      type
      translationatoms {
        id
        content
        locale_id
      }
    }
  }
`;

export function* requestFlow() {
  const client = yield select(selectors.client);

  const getTranslations = async () => {
    try {
      const { data } = await client.query({
        query: translationsQuery,
        variables: {},
      });
      const { translationgists } = data;
      return translationgists.filter(g => g.type === 'Service');
    } catch (e) {
      // XXX: masking the exception is a bad idea
    }
  };

  const gists = yield call(getTranslations);

  if (gists) {
    yield put(putTranslations(gists));
  } else {
    yield put(err('Could not get translations'));
  }
}

export default function* translationsInit() {
  yield spawn(requestFlow);
}
