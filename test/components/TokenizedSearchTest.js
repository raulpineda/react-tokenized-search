/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import TokenizedSearch from 'components/TokenizedSearch';

describe('TokenizedSearchComponent', function () {

  beforeEach(function () {
    this.TokenizedSearchComponent = createComponent(TokenizedSearch);
  });

  it('should have its component name as default className', function () {
    expect(this.TokenizedSearchComponent.props.className).to.equal('tokenized-search');
  });
});
