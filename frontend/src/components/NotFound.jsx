import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import img404 from '../styles/images/not-found-page.png';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-fill justify-content-center align-items-center pt-2 pb-3">
      <div className="col-11 col-md-6 col-lg-4 text-center">
        <img className="img-fluid" src={img404} alt="not found page" />
        <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
        <p className="text-muted">
          {t('notFoundPage.text')}
          <Link to="/">{t('notFoundPage.linkText')}</Link>
        </p>
      </div>
    </div>
  );
};

export default NoMatch;
