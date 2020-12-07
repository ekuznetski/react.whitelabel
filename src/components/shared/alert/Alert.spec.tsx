import '@i18n';
import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from './Alert';

describe('Alert Component', () => {
  const wrapper = shallow(<Alert type="success">Alert Test</Alert>);

  it('should render with the default props', () => {
    expect(wrapper.find('.block')).toHaveLength(1);
    expect(wrapper.text()).toEqual('Alert Test');
    expect(wrapper.find('[href="warning"]')).toHaveLength(1);
  });

  it('should not render an svg icon if showIcon is false', () => {
    wrapper.setProps({ showIcon: false });

    expect(wrapper.find('[href="warning"]')).toHaveLength(0);
  });

  it('should render an alert message if viewType is message', () => {
    wrapper.setProps({ viewType: 'message' });

    expect(wrapper.find('.message')).toHaveLength(1);
  });

  it('should render Col with different sizes', () => {
    wrapper.setProps({ sizes: { xs: 12, md: 9 } });

    expect(wrapper.find('[xs=12]')).toHaveLength(1);
    expect(wrapper.find('[md=9]')).toHaveLength(1);
  });

  it('should render Col with any added classNames', () => {
    wrapper.setProps({ className: 'test_class' });

    expect(wrapper.find('.test_class')).toHaveLength(1);
  });
});
