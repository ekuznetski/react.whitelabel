import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { DropDown } from './Dropdown';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Middleware } from 'redux';

const middlewares: Middleware[] = [];
const store = configureStore(middlewares);

type ComponentProps = React.ComponentProps<typeof DropDown>;

function renderDropdown(props: Partial<ComponentProps> = {}, initialRoute?: string) {
  const dropdownParent = createRef<HTMLDivElement>();
  <div ref={dropdownParent}></div>;

  const setDropdownMenuOpen = jest.fn();
  const initialState = {
    app: {
      route: initialRoute || '',
    },
  };
  const mockStore = store(initialState);
  const defaultProps: ComponentProps = {
    parentRef: dropdownParent,
    isOpenDispatcher: setDropdownMenuOpen,
  };
  return {
    ...render(
      <Provider store={mockStore}>
        <DropDown {...defaultProps} {...props} />
      </Provider>,
    ),
    setDropdownMenuOpen,
  };
}

describe('Dropdown Component', () => {
  const { getByTestId, queryByTestId } = renderDropdown();

  it('should render with the default props', () => {
    expect(queryByTestId('test-dropdown')).toBeTruthy();
    expect(getByTestId('test-dropdown').classList).not.toContain('open');
  });
});
