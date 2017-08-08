import { Component, h } from './preact.esm.js';
import { Card, cardFragments } from './card.js';

const Dashboard = data => {
  return h('div', {},
    data.pullRequests.edges.map(e => h(Card, e.node))
  );
}

const dashboardFragments = {
  prFields: `
    ${cardFragments.pr}
    fragment prFields on Repository {
      pullRequests(first: 50, states: [OPEN], orderBy: {field: UPDATED_AT, direction: DESC}) {
        edges {
          node {
            ...pr
          }
        }
      }
    }
  `
}

export { Dashboard, dashboardFragments };
