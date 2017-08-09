import { Component, h } from './preact.esm.js';

const style = {
  backgroundColor: '#CCC',
  padding: 10,
  fontSize: 25
}

const Card = ({ title }) => {
  return h('div', { style }, title);
}

const cardFragments = {
  pr: `
    fragment pr on PullRequest {
      id
      number
      headRefName
      createdAt
      updatedAt
      title
      state
      mergeable
      comments {
        totalCount
      }
      mergedAt
      author {
        ... on User {
          avatarUrl
          name
        }
      }
      commits(last:1) {
        edges {
          node {
            commit {
              committedDate
              status {
                contexts {
                  context
                  createdAt
                  state
                  targetUrl
                }
              }
            }
          }
        }
      }
    }
  `
};

export { Card, cardFragments };
