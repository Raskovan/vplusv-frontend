import React from "react";

function withLoading (MyComponent) {
  return props => {

    function timeout() {
      console.log('Hi');
      return ('...')
    }
    return (
      props.loading ? <span>Loading {timeout()}</span> :
      <MyComponent {...props}/>
    )
  }
}

export default withLoading
