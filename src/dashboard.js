import { Component, h } from './preact.esm.js';
import { Card, cardFragments } from './card.js';

const screenRatio = 1.6; // w / h

const style = {
  display: 'grid',
  gridAutoFlow: 'row',
  alignItems: 'stretch',
  alignContent: 'center',
  justifyContent: 'center',
  gridGap: '5px',
  height: '100vh',
  width: '100vw',
}

const Dashboard = ({pullRequests}) => {
  const { length } = pullRequests.edges;
  const cols = Math.floor(Math.sqrt(length) * 1.6);
  const rows = Math.ceil(length/cols);
  const vw = Math.floor(100/cols);

  style.gridTemplateColumns = `repeat(${cols}, ${vw}vw)`;
  style.gridTemplateRows = `repeat(${rows}, ${vw}vw)`;

  return h('div', { style },
    pullRequests.edges.map(e => h(Card, e.node))
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
