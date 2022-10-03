import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import img404 from '../styles/images/not-found-page.png';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="col-11 col-md-6 col-lg-4 text-center">
      <img className="img-fluid" src={img404} alt="not found page" />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.text')}
        <Link to="/">{t('notFoundPage.linkText')}</Link>
      </p>
    </div>
  );
};

export default NoMatch;
