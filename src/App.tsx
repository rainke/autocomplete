import React, { useEffect, useRef, useState } from 'react';
import Complete from './components/AutoComplete';
import Test from './Test';

const mockVal = (str: string, repeat: number = 1) => {
  return {
    value: str.repeat(repeat),
    id: Math.random()
  };
};

function App() {
  const ref = useRef<any>(null);

  const [value, setValue] = useState('');
  const [options, setOptions] = useState<{ value: string; id: number }[]>([]);

  function onChange(v: string) {
    setValue(v);
  }

  function onSearch(v: string) {
    setOptions(v ? [mockVal(v), mockVal(v, 2), mockVal(v, 3)] : []);
  }

  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <div className="App">
      <Complete ref={ref} options={options} value={value} onChange={onChange} onSearch={onSearch} />

      <Test />
    </div>
  );
}

export default App;
