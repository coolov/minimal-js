import {
  Component,
  h,
  render
} from './preact.esm.js';

import request from './request.js';
import Form from './form.js';

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');

    if (token) {
      this.fetch(token);
    }

    this.state = {
      variables: {
        owner: 'nytm',
        name: 'wf-project-vi'
      },
      fetching: !!token,
      token: null
    };
  }

  async fetch(token) {
    this.setState({ fetching: true });
    try {
      const data = await request(
        `query latestRelease ($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            releases(last: 20) {
              edges {
                node {
                  tag {
                    name
                  }
                }
              }
            }
          }
        }`,
        this.state.variables,
        token
      );
      this.setState({ data, signedIn: true, fetching: false });
      window.localStorage.setItem('token', token);
    } catch(err) {
      this.setState({ fetching: false });
    }
  }

  onClick({ token }) {
    if (token) {
      this.fetch(token);
    }
  }

	render(props, state) {
    if (state.fetching) {
      return h('div', {}, 'Loading...');
    }
    if (state.signedIn) {
      return h('div', {}, 'You Are In!');
    }

    // Show sign-in form
    return (
			h('div', {id:'app'},
        h(Form, { onClick: this.onClick.bind(this) })
				//h('h1', null, 'App'),
			)
		);
	}
}

render(h(App), document.body);
