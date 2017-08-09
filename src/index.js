import {
  Component,
  h,
  render
} from './preact.esm.js';

import request from './request.js';
import Form from './form.js';
import { Dashboard, dashboardFragments } from './dashboard.js';

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');

    this.state = {
      variables: {
        owner: 'nytm',
        name: 'wf-project-vi'
      },
      fetching: !!token,
      token: null
    };

    if (token) {
      this.fetch(token);
    }
  }

  async fetch(token) {
    this.setState({ fetching: true });
    try {
      const data = await request(`
        ${dashboardFragments.prFields}
        query prs ($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            ...prFields
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

  onSignIn({ token }) {
    if (token) {
      this.fetch(token);
    }
  }

	render(props, state) {
    if (state.fetching) {
      return h('div', {}, 'Loading...');
    }
    if (state.signedIn) {
      return h(Dashboard, this.state.data.repository );
    }
    // Show sign-in form
    return (
			h('div', {id:'app'},
        h(Form, { onSignIn: this.onSignIn.bind(this) })
				//h('h1', null, 'App'),
			)
		);
	}
}

render(h(App), document.body);
