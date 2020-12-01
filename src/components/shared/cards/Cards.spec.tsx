// import '../../../i18n';
// import React from 'react';
// import { Cards } from './Cards';
// import { render } from '@testing-library/react';

// type ComponentProps = React.ComponentProps<typeof Cards>;

// function renderCards(props: Partial<ComponentProps> = {}) {
//   const defaultProps: ComponentProps = {
//     id: 'testCards',
//   };
//   return render(<Cards {...defaultProps} {...props} />);
// }

// describe('Cards Component', () => {
//   const cards = [
//     { header: 0, content: 'test 1', uid: 1 },
//     { header: 1, content: 'test 2', uid: 2 },
//   ];

//   it('should render with the default props', async () => {
//     const { queryByTestId } = renderCards();
//     expect(queryByTestId('test-cards')).toBeTruthy();
//     expect(queryByTestId('navigation')).toBeTruthy();
//   });

//   it('should render cards provided', () => {
//     const { queryAllByTestId } = renderCards({ cards });
//     expect(queryAllByTestId('card')).toHaveLength(2);
//   });

//   it('should render children provided', () => {
//     const { queryAllByTestId } = renderCards({
//       children: <div data-testid="test-children">Component 1</div>,
//     });
//     expect(queryAllByTestId('test-children')).toHaveLength(1);
//   });
// });
