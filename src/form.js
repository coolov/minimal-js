import { Component, h } from './preact.esm.js';

class Form extends Component {
  onChange(e) {
    e.preventDefault();
    this.setState({ token: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onClick(this.state);
  }

  render() {
    return (
      h('form', { onSubmit: this.onSubmit.bind(this) },
        h('input', { type: 'text', style: { width: 300 }, onChange: this.onChange.bind(this) }),
        h('input', { type: 'submit', value: 'Sign In' })
      )
    )
  }
}

export default Form;
