/* eslint-disable no-unused-expressions */
/* eslint-disable linebreak-style */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const appTitle = 'Green Dragon International Logistics Corporation';

const MetaTags = ({ config }) => {
  if (config) {
    const title = config.find((value) => value.name === 'title');
    return (
      <Helmet defaultTitle={appTitle}>
        <title>{title ? title.content : '' }</title>
        {
          config.map((meta, index) => {
            if (meta.name) {
              return (
                <meta
                  key={index}
                  name={meta.name ? meta.name : meta.property}
                  content={meta.content}
                />
              );
            }
            return (
              <meta
                key={index}
                property={meta.property}
                content={meta.content}
              />
            );
          })}
      </Helmet>
    );
  }
  return (
    <Helmet defaultTitle={appTitle} />
  );
};

MetaTags.propTypes = {
  config: PropTypes.any,
};

export default MetaTags;
