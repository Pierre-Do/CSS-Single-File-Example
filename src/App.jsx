import React from 'react';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      module: null,
    };

    import(/* webpackChunkName: 'MyComponent' */ './MyComponent/MyComponent').then(
      module => {
        this.setState({ module });
      }
    );
  }

  render() {
    const { module } = this.state;
    return (
      <main className="App">
        {module ? React.createElement(module.default) : null}
      </main>
    );
  }
}

export default App;
