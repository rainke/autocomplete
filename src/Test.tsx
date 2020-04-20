import React, {useState, memo} from 'react';

const Test2 =  memo(function() {
  console.log('render');
  return <div>hello</div>
})

function Test() {
  const [state, setState] = useState(false)
  return <div>
    <button onClick={() => setState(state => !state)}>click</button>
    <Test2 />
  </div>
}

export default Test;
