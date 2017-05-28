import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import TokenizedSearch from './components/TokenizedSearch';

require('styles/application.css');

const defaultSearch = (query) => {
  window.location.href = `https://testing.vivino.com/search?q=${query}`;
}

const searchGrapes = (query) => {
  window.location.href = `https://testing.vivino.com/explore?grape_ids[]=${query}`;
}

const searchCountries = (query) => {
  window.location.href = `https://testing.vivino.com/explore?country_codes[]=${query}`;
}

const searchFoods = (query) => {
  window.location.href = `https://testing.vivino.com/explore?food_ids[]=${query}`;
}

const searchStyles = (query) => {
  window.location.href = `https://testing.vivino.com/explore?wine_style_ids[]=${query}`;
}

const sources = [
  {
    id: 'grapes',
    source: 'public/grapes.json',
    iconPath: 'images/grape.png',
    action: searchGrapes,
    targetString: 'Search grapes',
    uniqueKey: 'id',
    labelKey: 'name'
  },
  {
    id: 'countries',
    source: 'public/countries.json',
    iconPath: 'images/map.png',
    action: searchCountries,
    targetString: 'Search countries',
    uniqueKey: 'code',
    labelKey: 'name'
  },
  {
    id: 'foods',
    source: 'public/foods.json',
    iconPath: 'images/food.png',
    action: searchFoods,
    targetString: 'Search foodpairings',
    uniqueKey: 'id',
    labelKey: 'name'
  },
  {
    id: 'styles',
    source: 'public/styles.json',
    iconPath: 'images/style.png',
    action: searchStyles,
    targetString: 'Search styles',
    uniqueKey: 'id',
    labelKey: 'name'
  }
]

ReactDOM.render(
  <TokenizedSearch
    sources={sources}
    defaultSearch={defaultSearch} />,
  document.getElementById('app')
);
