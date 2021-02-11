import { AnyFunction } from '@domain/interfaces';
import { IAppStore, IStore } from '@store';
import { useClickAway, useEventListener, useSize } from 'ahooks';
import classNames from 'classnames';
import { Pathname } from 'history';
import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { LinkProps } from 'react-router-dom';
import { LocaleNavLink } from '../localeNavLink/LocaleNavLink';
import { Svg } from '../svg/Svg';
import './Dropdown.scss';

export interface IDropdownItem {
  id?: string;
  icon?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  path?: LinkProps['to'];
  externalLink?: string;
  state?: any;
  title: string;
  onclick?: AnyFunction;
}
type IDropdown = {
  className?: string;
  items?: IDropdownItem[];
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
  if(window.isSSR) return null;

  const { route } = useSelector<IStore, Partial<IAppStore>>((state) => ({
    route: state.app.route,
  }));
  const [initialHeight, setInitialHeight] = React.useState<number | string>(0);
  const [parentBCR, setParentBCR] = useState<DOMRect | null>(null);
  const { width: viewportWidth } = useSize(document.body);
  const dropdownRef = React.createRef<HTMLDivElement>();
  const TARGET_CONTAINER = document.getElementById('dynamic-portals') || document.body;
  const ARROW_HORIZONTAL_OFFSET = 38;
  const ARROW_VERTICAL_OFFSET = 14;
  const _height = props.items
    ? isOpen
      ? props.items.length * itemHeight + offsetY + (noArrow ? 0 : ARROW_VERTICAL_OFFSET)
      : 0
    : isOpen
    ? height
    : 0;

  useEffect(() => {
    setInitialHeight(
      props.items ? props.items.length * itemHeight + offsetY + (noArrow ? 0 : ARROW_VERTICAL_OFFSET) : height,
    );
  }, []);

  useEffect(() => {
    if (isOpen) props.isOpenDispatcher(false);
  }, [route?.path]);

  useEffect(() => {
    if (props.parentRef && isOpen) {
      setParentBCR(props.parentRef.current?.getBoundingClientRect());
    }
  }, [props.parentRef, viewportWidth]);

  useEventListener('scroll', () => {
    if (isOpen) props.isOpenDispatcher(false);
  });

  useClickAway(() => {
    if (isOpen) props.isOpenDispatcher(false);
  }, [props.parentRef, dropdownRef]);
  let topPosition = parentBCR ? parentBCR.bottom + (noArrow ? 2 : 0) : 0;
  // if (typeof _height === 'number' && parentBCR?.bottom && window.innerHeight > parentBCR?.bottom + _height) {
  //   topPosition = parentBCR.top - _height - (noArrow ? 2 : 0);
  // }
  return (
    TARGET_CONTAINER &&
    ReactDOM.createPortal(
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
          top: topPosition,
        }}
        ref={dropdownRef}
      >
        <div className="common-dropdown-wrapper">
          <div className="common-dropdown-context" style={{ top: offsetY - 1 }}>
            {props.items &&
              props.items.map((child, c) => {
                const attrs = {
                  onClick: (e: any) => {
                    props.isOpenDispatcher(false);
                    child.onclick?.(e);
                  },
                  className: 'px-7',
                };
                function Children() {
                  return (
                    <>
                      {child.icon?.length && <Svg href={child.icon} className="mr-4" width="27" height="20" />}
                      {child.title}
                    </>
                  );
                }
                return (
                  <div key={child.id || c} className="item">
                    {child.path ? (
                      <LocaleNavLink
                        {...attrs}
                        exact
                        to={{
                          pathname: child.path as Pathname,
                          state: child.state,
                        }}
                      >
                        <Children />
                      </LocaleNavLink>
                    ) : child.externalLink ? (
                      <a href={child.externalLink} target={child.target} {...attrs}>
                        <Children />
                      </a>
                    ) : (
                      <div {...attrs}>
                        <Children />
                      </div>
                    )}
                  </div>
                );
              })}
            {props.children}
          </div>
        </div>
      </div>,
      TARGET_CONTAINER,
    )
  );
});
