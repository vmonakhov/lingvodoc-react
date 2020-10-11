import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import imgTree from '../../images/tree.jpg';
import imgTools from '../../images/tools.jpg';
import imgDashboard from '../../images/dashboard.png';
import imgAuthors from '../../images/organization.jpg';
import imgSupport from '../../images/support.jpg';
import imageScholarship from '../../images/scholarship.png';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { getTranslation } from 'api/i18n';
import gql from 'graphql-tag';
import { compose } from 'recompose';
import {Container} from 'semantic-ui-react'

const IsAuthenticated = gql`
  query isAuthenticated {
    is_authenticated
  }
`;

const topSectionSelector = (props) => {
  let { data: { is_authenticated: isAuthenticated } } = props;
  return (
    <div className="top-section-selector">
      <div className="top-section-selector_icon">
        <div className="icon">
          <label className="label">{getTranslation('Languages databases')}</label>
          <Link to="/LanguagesDatabasesRoute">
            <img className="img-tree img" src={imgTree} />
          </Link>
        </div>
        <div className="icon">
          <label className="label">{getTranslation('Tools')}</label>
          <Link to="/toolsRoute">
            <img className="img-tools img" src={imgTools} />
          </Link>
        </div>
        <div className="icon">
          {isAuthenticated ? <label className="label">{getTranslation('Dashboard')}</label> : null}
          {isAuthenticated ? <Link to="/dashboardRoute">
            <img className="img-dashboard img" src={imgDashboard} />
          </Link> : null}
        </div>
        <div className="icon">
          <label className="label">{getTranslation('Grants')}</label>
          <Link to="/grantsRoute">
            <img className=" img" src={imageScholarship} />
          </Link>
        </div>
        <div className="icon">
          <label className="label">{getTranslation('Authors')}</label>
          <Link to="/authors_route">
            <img className=" img" src={imgAuthors} />
          </Link>
        </div>
        <div className="icon">
          <label className="label">{getTranslation('Support')}</label>
          <Link to="/supportRoute">
            <img className="img-support img" src={imgSupport} />
          </Link>
        </div>
      </div>
    </div>


  );
};

topSectionSelector.propTypes = {
  data: PropTypes.shape({
    is_authenticated: PropTypes.bool,
  }).isRequired,
};

export default compose(graphql(IsAuthenticated)(topSectionSelector));
