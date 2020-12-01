// import React, { createRef, ReactNode } from 'react';
// import { fireEvent, getByRole, getByText, render } from '@testing-library/react';
// import { DropDown } from './Dropdown';
// import configureStore from 'redux-mock-store';
// import { Provider } from 'react-redux';
// import { Middleware } from 'redux';

// const middlewares: Middleware[] = [];
// const store = configureStore(middlewares);

// type ComponentProps = React.ComponentProps<typeof DropDown>;

// type WrapperProps = {
//   children?: ReactNode;
// };

// const dropdownItems = [
//   {
//     icon: 'eur',
//     title: 'item 1',
//   },
//   {
//     icon: 'gbp',
//     title: 'item 2',
//   },
// ];

// function wrappingElement({ children }: WrapperProps) {
//   return (
//     <div data-testid="main-wrapper">
//       <span data-testid="test-span">TEEEEST</span>
//       {children}
//     </div>
//   );
// }

// function renderDropdown(props: Partial<ComponentProps> = {}, initialRoute?: string) {
//   const dropdownParent = createRef<HTMLDivElement>();
//   <div ref={dropdownParent}></div>;

//   const setDropdownMenuOpen = jest.fn();
//   const initialState = {
//     app: {
//       route: initialRoute || '',
//     },
//   };
//   const mockStore = store(initialState);
//   const defaultProps: ComponentProps = {
//     parentRef: dropdownParent,
//     isOpenDispatcher: setDropdownMenuOpen,
//   };
//   return {
//     ...render(
//       <Provider store={mockStore}>
//         <DropDown {...defaultProps} {...props} />
//       </Provider>,
//       { wrapper: wrappingElement },
//     ),
//     setDropdownMenuOpen,
//   };
// }

// describe('Dropdown Component', () => {
//   const { getByTestId, queryByTestId } = renderDropdown({});

//   it('should render with the default props', () => {
//     expect(queryByTestId('test-dropdown')).toBeTruthy();
//     expect(getByTestId('test-dropdown').classList).not.toContain('open');
//   });

//   it('should render items', () => {
//     const { getByTestId, queryByTestId } = renderDropdown({ items: dropdownItems });

//     expect(queryByTestId('test-dropdown')).toBeTruthy();
//     expect(getByTestId('test-dropdown').classList).not.toContain('open');
//   });

//   it('should close if route changes', () => {
//     const { getByTestId, setDropdownMenuOpen } = renderDropdown({ isOpen: true });
//     expect(getByTestId('test-dropdown').classList).toContain('open');
//     // fireEvent.mouseDown(getByText('TEEEEST'));
//     expect(setDropdownMenuOpen).toHaveBeenCalledTimes(1);
//     expect(setDropdownMenuOpen).toHaveBeenLastCalledWith(false);
//     // expect(getByTestId('test-dropdown').classList).not.toContain('open');
//   });
// });
