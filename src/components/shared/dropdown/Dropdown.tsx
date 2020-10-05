import { LocaleNavLink, Svg } from '@components/shared';
import { useClickAway, useEventListener, useSize } from 'ahooks';
import classNames from 'classnames';
import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Dropdown.scss';

type IDropdown = {
  className?: string;
  items?: {
    icon: string;
    path?: string;
    title: string;
    onclick?: (e?: any) => any;
  }[];
  children?: React.ReactNode;
  isOpen?: boolean;
  noArrow?: boolean;
  itemHeight?: number;
  height?: number | 'auto';
  width?: number;
  offsetY?: number;
  offsetX?: number;
  parentRef: React.RefObject<any>;
  position?: 'left' | 'right' | 'center';
  alignToParentLeft?: boolean;
  isOpenDispatcher: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropDown = memo<IDropdown>(function DropDown({
  isOpen = false,
  height = 'auto',
  width = 200,
  offsetY = 16,
  itemHeight = 50,
  position = 'center',
  alignToParentLeft = false,
  className = '',
  noArrow = false,
  ...props
}) {
  const [initialHeight, setInitialHeight] = React.useState<number | string>(0);
  const [parentBCR, setParentBCR] = useState<DOMRect | null>(null);
  const { width: viewportWidth } = useSize(document.body);
  const dropdownRef = React.createRef<HTMLDivElement>();
  const ARROW_HORIZONTAL_OFFSET = 38;
  const ARROW_VERTICAL_OFFSET = 14;
  const _height = props.items ? (isOpen ? props.items.length * itemHeight + offsetY : 0) : isOpen ? height : 0;

  useEffect(() => {
    setInitialHeight(props.items ? props.items.length * itemHeight + offsetY : height);
  }, []);

  useEventListener('scroll', () => {
    if (isOpen) props.isOpenDispatcher(false);
  });

  useClickAway(() => {
    if (isOpen) props.isOpenDispatcher(false);
  }, [props.parentRef, dropdownRef]);

  useEffect(() => {
    if (props.parentRef && isOpen) {
      setParentBCR(props.parentRef.current?.getBoundingClientRect());
    }
  }, [props.parentRef, viewportWidth]);

  return ReactDOM.createPortal(
    <div
      className={classNames('common-dropdown', className, position, isOpen && 'open', noArrow && 'noArrow')}
      style={{
        width: typeof width === 'number' ? width : width,
        height: _height,
        left: parentBCR
          ? position === 'center'
            ? parentBCR.left + (alignToParentLeft ? 0 : (parentBCR.width - width) / 2)
            : position === 'left'
            ? parentBCR.left + (alignToParentLeft ? 0 : parentBCR.width / 2 - 46) // 46 = ARROW_HORIZONTAL_OFFSET + 8(arrow size)
            : position === 'right'
            ? parentBCR.left + (alignToParentLeft ? 0 : parentBCR.width / 2 - width + 46)
            : -10000
          : -10000,
        top: parentBCR ? parentBCR.top + parentBCR.height + (noArrow ? 2 : ARROW_VERTICAL_OFFSET) : 0,
      }}
      ref={dropdownRef}
    >
      <div className="common-dropdown-wrapper">
        <div className="common-dropdown-context" style={{ height: initialHeight }}>
          {props.items &&
            props.items.map((child, c) => (
              <div key={c} className="item">
                {child.onclick ? (
                  <a
                    className="px-7"
                    onClick={(e) => {
                      props.isOpenDispatcher(false);
                      child.onclick?.(e);
                    }}
                  >
                    {child.icon?.length && <Svg href={child.icon} className="mr-4" />}
                    {child.title}
                  </a>
                ) : child.path ? (
                  <LocaleNavLink exact to={child.path} className="px-7">
                    {child.icon?.length && <Svg href={child.icon} className="mr-4" />}
                    {child.title}
                  </LocaleNavLink>
                ) : (
                  <div className="px-7">
                    {child.icon?.length && <Svg href={child.icon} className="mr-4" />}
                    {child.title}
                  </div>
                )}
              </div>
            ))}
          {props.children}
        </div>
      </div>
    </div>,
    document.body,
  );
});
