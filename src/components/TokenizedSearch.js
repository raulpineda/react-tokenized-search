require('normalize.css/normalize.css');
require('styles/TokenizedSearch.css');

import React from 'react';
import SearchResult from './SearchResult';

function normalize(values, key, label) {
  return values.map(v => {
    return {
      key: v[key],
      label: v[label]
    };
  });
}

class TokenizedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matching: {}
    };
    // Helper Functions
    this.performSearch = (q) => {
      if (q.length >= this.props.searchThreshold) {
        const r = new RegExp(q, 'i');
        let matching = JSON.parse(JSON.stringify(this.state.matching));
        this.props.sources.map(s => {
          const fs = this.state[s.id].filter(i => r.test(i.label.trim()));
          matching[s.id] = fs;
        });
        this.setState({
          matching: matching
        });
      } else {
        this.setState({
          matching: {}
        });
      }
    };
    // Event Handlers
    this.handleInputChange = (e) => {
      const query = e.target.value;
      this.performSearch(query);
    };
    // Partial Renderers
    this.renderSearchResults = () => {
      let entries = Object.entries(this.state.matching);
      let results = [];
      const totalEntries = entries.reduce((a, e) => {
        return a + e[1].length
      }, 0);

      let counter = 0;
      while (results.length < this.props.resultsAmount && results.length < totalEntries) {
        entries.map(e => {
          const key = e[0];
          const values = e[1];
          const source = this.props.sources.find(s => s.id === key);
          const result = values[counter];
          if (result) {
            results.push(
              <SearchResult
                key={`${source.id}-${result.key}`}
                result={result}
                action={source.action}
                iconPath={source.iconPath}
                targetString={source.targetString}
                action={source.action}
              />
            );
          }
        });
        counter++;
      }
      let displayClass = results.length > 0
        ? null
        : 'tokenized-search__results--hidden';
      return (
        <div className="tokenized-search__results" className={displayClass}>
          {results}
        </div>
      );
    }
  }
  componentDidMount() {
    this.props.sources.map(item => {
      // TODO: Add fetch polyfill
      fetch(item.source)
        .then(res => {
          // TODO: Switch to handle different data types
          return res.json();
        })
        .then(values => {
          const normalizedValues = normalize(values, item.uniqueKey, item.labelKey);
          this.setState({
            [item.id]: normalizedValues
          });
        });
    })
  }
  render() {
    return (
      <div className="tokenized-search">
        <input className="tokenized-search__input" onChange={this.handleInputChange} />
        {this.renderSearchResults()}
      </div>
    );
  }
}

TokenizedSearch.defaultProps = {
  resultsAmount: 10,
  searchThreshold: 3
};

export default TokenizedSearch;
