'use strict';

import React from 'react';
import * as PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { Text } from 'react-native';

class LanguageProvider extends React.Component {
  render() {
    const { language } = this.context;
    const _language = !language || language === 'vi' ? 'vi' : 'en';
    const { messages, children } = this.props;

    return (
      <IntlProvider
        locale={_language}
        key={_language}
        onError={() => {}}
        messages={messages[_language]}
        textComponent={Text}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

LanguageProvider.contextTypes = {
  language: PropTypes.string,
};

export default LanguageProvider;
