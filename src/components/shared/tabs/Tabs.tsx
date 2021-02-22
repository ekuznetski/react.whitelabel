import { ENotificationType } from '@domain/enums';
import { useDeviceDetect } from '@utils/hooks';
import { useDebounceEffect, useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { createRef, forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../form/button/Button';
import { Svg } from '../svg/Svg';
import { ActiveTab, EMobileDisplay, TabData, TabsProvider, useTabsDispatch, useTabsState } from './tabs.context';
import './Tabs.scss';

export interface ITabs {
  labels?: { value: TabData; anchor: string; disabled?: boolean }[];
  content?: { value: TabData; anchor: string }[];
  children?: React.ReactNode;
  activeTab?: string; // anchor
  disabledAll?: boolean;
  className?: string;
  isVertical?: boolean;
  alignNavigation?: 'left' | 'center' | 'right';
  onChange?: (active: ActiveTab) => void;
}

export interface ITab {
  disabled?: boolean;
  label?: TabData;
  subLabel?: TabData;
  labelIcon?: string;
  content?: TabData;
  children?: React.ReactNode;
  anchor: string | number; // anchor
  className?: string;
  status?: ENotificationType;
}

interface TabsState {
  activeTabProps: { tabHeight?: number; anchor: string | number };
  lineProps: { navLineWidth?: number; navLineLeft?: number };
}

export function Tabs({
  children,
  labels,
  content,
  activeTab,
  className,
  disabledAll = false,
  isVertical = false,
  alignNavigation = 'center',
  onChange = undefined,
}: ITabs) {
  const [activeTabProps, setActiveTabProps] = useState<TabsState['activeTabProps']>();
  const [lineProps, setLineProps] = useState<{ [k: string]: any }>();
  const navRef = createRef<HTMLDivElement>();
  const viewportSize = useResponsive();
  const tabsContentRef: { [k: string]: HTMLDivElement | null } = {};
  const { t } = useTranslation();
  const { isDesktop } = useDeviceDetect();
  let activeNavTabLink: HTMLDivElement | null = null;

  if (!children && !(labels && content)) {
    throw new Error('Tabs must have (props.children) or (labels && content)!');
  }

  return (
    <TabsProvider>
      {(state, dispatch, active) => {
        useEffect(() => {
          if (labels && content) {
            dispatch({ type: 'instantInit', labels, contents: content });
            switchTab(activeTab || labels[0].anchor);
          }
          if (activeTab) {
            switchTab(activeTab);
          }
          if (disabledAll) {
            dispatch({ type: 'disabledAll', disabledAll });
          }
        }, []);

        useEffect(() => {
          if (activeTab && activeTab != state.active) {
            switchTab(activeTab);
          }
        }, [activeTab]);

        useEffect(() => {
          if ((active.anchor != null || active.anchor != undefined) && activeTabProps?.anchor !== active?.anchor) {
            setActiveTabProps({ anchor: active.anchor, tabHeight: tabsContentRef[active.anchor]?.clientHeight });
            onChange?.(active);
          }
        }, [active]);

        useDebounceEffect(
          () => {
            if (activeNavTabLink) {
              if (navRef.current) {
                navRef.current.scrollLeft =
                  activeNavTabLink.offsetLeft - navRef.current.offsetWidth / 2 + activeNavTabLink.offsetWidth / 2;
              }
              setLineProps({ width: activeNavTabLink.clientWidth, left: activeNavTabLink.offsetLeft });
            }
          },
          [activeTabProps?.anchor, viewportSize],
          { wait: 0 },
        );

        function switchTab(anchor: string | number) {
          dispatch({ type: 'setActive', anchor });
        }

        function switchMobileDisplay(setDisplay: EMobileDisplay) {
          dispatch({ type: 'setMobileDisplay', mobileDisplay: setDisplay });
        }

        function selectPrevTab() {
          const _currentTabIdx = state.labels.findIndex(
            (tab) => tab.anchor === activeTabProps?.anchor,
          );
          if (_currentTabIdx > 0) {
            switchTab(state.labels[_currentTabIdx - 1].anchor); 
          }
          
        }

        function selectNextTab() {
          const _currentTabIdx = state.labels.findIndex(
            (tab) => tab.anchor === activeTabProps?.anchor,
          );
          if (_currentTabIdx + 1 < state.labels.length) {
            switchTab(state.labels[_currentTabIdx + 1].anchor); 
          }
        }

        return useMemo(() => {
          return (
            <div
              className={classNames('common-tabs', isVertical && 'vertical', 'show_' + state.mobileDisplay, className)}
            >
              {lineProps && !isVertical && (
                <div className="d-lg-none common-tabs__prev" onClick={() => selectPrevTab()}>
                  <Svg
                    href={'chevron_left'}
                    width={18}
                    height={18}
                  />
                </div>
                )}
              <div className={classNames('common-tabs__navigation', !isVertical && 'mb-9', !isVertical && 'mx-7 mx-lg-0')} ref={navRef}>
                <div
                  className={classNames(
                    !isVertical && 'common-tabs__navigation-wrapper',
                    !isVertical && alignNavigation,
                  )}
                >
                  {state.labels.map((label, l) => (
                    <div
                      key={l}
                      className={classNames(
                        'tab__link',
                        label.status,
                        label.disabled && 'disabled',
                        !disabledAll && activeTabProps?.anchor === label.anchor && 'active',
                        !isVertical && state.labels.length - 1 != l && 'mr-7',
                      )}
                      onClick={() => !label.disabled && switchTab(label.anchor)}
                      ref={(ref) => activeTabProps?.anchor === label.anchor && (activeNavTabLink = ref)}
                    >
                      <div className={classNames('tab__link__label', isVertical && 'py-6 pl-12 pr-4')}>
                        <div className="tab__link__label-title">{label.value}</div>
                        {label.desc && <div className="tab__link__label-subtitle">{label.desc}</div>}
                      </div>
                      {label.icon && (
                        <Svg
                          className="tab__link__icon mr-9"
                          href={label.icon}
                          width={isVertical ? 40 : 24}
                          height={24}
                        />
                      )}
                    </div>
                  ))}
                  {lineProps && !isVertical && (
                    <div
                      className="active-tab-line"
                      style={{ left: lineProps?.left, width: lineProps?.width + 'px' }}
                    />
                  )}
                </div>
              </div>
              {lineProps && !isVertical && (
                <div className="d-lg-none common-tabs__next" onClick={() => selectNextTab()}>
                  <Svg
                    href={'chevron_right'}
                    width={18}
                    height={18}
                  />
                </div>
                )}

              <div className={classNames('common-tabs__container', isVertical && 'py-8 px-6 py-md-10 px-md-9')}>
                {!children
                  ? state.contents.map((content, c) => <Tab key={c} anchor={content.anchor} content={content.value} />)
                  : children}
              </div>
              {!isDesktop && isVertical ? (
                <div className={'common-tabs__nav mt-8'}>
                  {state.mobileDisplay === EMobileDisplay.labels && (
                    <Button onClick={() => switchMobileDisplay(EMobileDisplay.content)}>{t('Continue')}</Button>
                  )}
                  {state.mobileDisplay === EMobileDisplay.content && !state.customMobileBackBtn && (
                    <Button onClick={() => switchMobileDisplay(EMobileDisplay.labels)}>{t('Back')}</Button>
                  )}
                </div>
              ) : null}
            </div>
          );
        }, [active, state.labels.join('')]);
      }}
    </TabsProvider>
  );
}

export const Tab = memo(
  forwardRef<HTMLDivElement, ITab>(function Tab(props, ref) {
    const dispatch = useTabsDispatch();
    const tabsState = useTabsState();
    const isActive = tabsState.active === props.anchor;
    const _content = tabsState.disabledAll ? (
      'temporary disabled'
    ) : !props.children && props.content ? (
      <TabContent content={props.content} />
    ) : (
      props.children
    );

    if (!props.children && !props.content) {
      throw new Error('Tab must have (props.children) or (props.content)!');
    }

    useEffect(() => {
      if (!tabsState.anchors.includes(props.anchor))
        dispatch({
          type: 'add',
          anchor: props.anchor,
          label: { value: props.label, desc: props.subLabel, icon: props.labelIcon, status: props.status },
          content: props.content,
          disabled: props.disabled,
        });
    }, []);

    useEffect(() => {
      if (tabsState.anchors.includes(props.anchor)) {
        const _value = Object.assign(
          {},
          props.label && { value: props.label },
          props.subLabel && { desc: props.subLabel },
          props.labelIcon && { icon: props.labelIcon },
          props.status && { status: props.status },
        );

        dispatch({
          type: 'update',
          anchor: props.anchor,
          ...(Object.keys(_value).length ? { label: _value } : {}),
          ...(props.disabled ? { disabled: props.disabled } : {}),
        });
      }
    }, [props.label, props.subLabel, props.labelIcon, props.status, props.disabled]);

    return (
      <div className={classNames('tab__content', props.className, isActive && 'active')} ref={ref}>
        {isActive ? _content : null}
      </div>
    );
  }),
);

export const TabLabel = memo(function TabLabel(props: {
  children: TabData;
  subTitle?: TabData;
  icon?: string;
  status?: ENotificationType;
}) {
  const dispatch = useTabsDispatch();
  useEffect(() => {
    dispatch({ type: 'addTempLabel', label: { value: props.children, icon: props?.icon, status: props?.status } });
    if (props.subTitle) dispatch({ type: 'addTempSubLabel', label: { value: props.subTitle } });
  }, []);
  return null;
});

export const TabSubLabel = memo(function TabSubLabel(props: { children: TabData }) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempSubLabel', label: { value: props.children } }), []);
  return null;
});

export const TabMobileBackButton = memo(function TabSubLabel(props: {
  children: React.ReactElement;
  onClick?: Function;
}) {
  const dispatch = useTabsDispatch();
  const viewportSize = useResponsive();

  useEffect(() => {
    dispatch({ type: 'setCustomMobileBackBtn', customMobileBackBtn: true });
    return () => dispatch({ type: 'setCustomMobileBackBtn', customMobileBackBtn: false });
  }, []);

  useEffect(() => {
    if (!viewportSize.md && viewportSize.lg) dispatch({ type: 'setCustomMobileBackBtn', customMobileBackBtn: false });
    else dispatch({ type: 'setCustomMobileBackBtn', customMobileBackBtn: true });
  }, [viewportSize]);

  return React.cloneElement(props.children, {
    onClick: () => {
      props.onClick?.();
      dispatch({ type: 'setMobileDisplay', mobileDisplay: EMobileDisplay.labels });
    },
  });
});

const TabContent = memo(function TabContent(props: { content: TabData }) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempContent', content: props.content }), []);
  return <>{props.content}</>;
});
