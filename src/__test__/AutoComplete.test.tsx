import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutoComplete from '../components/AutoComplete';

test('renders learn react link', () => {
  const [value, setValue] = useState('');
  const options = [{value: 'hello', id: 1}]
  const { getByText } = render(
    <AutoComplete value={value} onChange={value => setValue(value)} />
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
