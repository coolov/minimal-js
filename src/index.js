import {
  Component,
  h,
  render
} from './preact.esm.js';

class App extends Component {
	render(props, state) {
		return (
			h('div', {id:'app'},
				h('h1', null, 'App'),
			)
		);
	}
}

render(h(App), document.body);
