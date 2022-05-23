import { render } from '@testing-library/react';

import GridLayout from './grid-layout';

describe('GridLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GridLayout />);
    expect(baseElement).toBeTruthy();
  });
});
