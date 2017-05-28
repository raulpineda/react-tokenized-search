'use strict';

import React from 'react';

require('styles/SearchResult.css');

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = (e) => {
      this.props.action(e.currentTarget.dataset.key);
    }
    this.renderIcon = () => {
      if (this.props.iconPath) {
        return (
          <figure className="search-result__icon" style={{ backgroundImage: `url(${this.props.iconPath})` }}>
          </figure>
        );
      }
    }
  }
  render() {
    return (
      <div className="search-result" onClick={this.handleClick} data-key={this.props.result.key}>
        {this.renderIcon()}
        <div className="search-result__content">
          <span className="search-result__content__headline">{this.props.result.label}</span>
          <span className="search-result__content__tagline">{this.props.targetString}</span>
        </div>
      </div>
    );
  }
}

SearchResult.displayName = 'SearchResultComponent';

// Uncomment properties you need
// SearchResultComponent.propTypes = {};
// SearchResultComponent.defaultProps = {};

export default SearchResult;
