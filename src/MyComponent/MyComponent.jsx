import React from 'react';

import './MyComponent.scss';

const MyComponent = () => {
  return (
    <React.Fragment>
      <h1>My Component</h1>
      <p className="MyComponent__content">
        This is a content
      </p>
    </React.Fragment>
  );
};

export default MyComponent;
