import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { ActiveTab, TabsProvider, useTabsDispatch, useTabsState } from './tabs-context';
import './Tabs.scss';

export interface ITabs {
  labels?: { value: string | React.ReactFragment; anchor: string }[];
  content?: { value: string | React.ReactFragment; anchor: string }[];
  children?: React.ReactNode;
  activeTab?: string; // anchor
  className?: string;
  isVertical?: boolean;
  alignNavigation?: 'left' | 'center' | 'right';
  onChange?: (active: ActiveTab) => void;
}

export interface ITab {
  label?: string | React.ReactFragment;
  content?: string | React.ReactFragment;
  children?: React.ReactNode;
  anchor: string | number; // anchor
  className?: string;
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
  isVertical = false,
  alignNavigation = 'center',
  onChange = undefined,
}: ITabs) {
  const [activeTabProps, setActiveTabProps] = useState<TabsState['activeTabProps']>();
  const [lineProps, setLineProps] = useState<TabsState['lineProps']>();
  const viewportSize = useResponsive();
  const tabsContentRef: { [k: string]: HTMLDivElement | null } = {};
  let activeNavTabLink: HTMLDivElement | null = null;

  if (!children && !(labels && content)) {
    throw new Error('Tabs must have (props.children) or (labels && content)!');
  }

  window.onload = function () {
    setLineProps({
      navLineWidth: activeNavTabLink?.clientWidth,
      navLineLeft: activeNavTabLink?.offsetLeft,
    });
  };

  useEffect(() => {
    setLineProps({
      navLineWidth: activeNavTabLink?.clientWidth,
      navLineLeft: activeNavTabLink?.offsetLeft,
    });
  }, [activeTabProps?.anchor, viewportSize]);

  return (
    <TabsProvider>
      {(state, dispatch, active) => {
        useEffect(() => {
          if (labels && content) {
            dispatch({ type: 'instantInit', labels, contents: content });
            switchTab(activeTab || labels[0].anchor);
          }
        }, []);

        useEffect(() => {
          if (active?.anchor && activeTabProps?.anchor !== active?.anchor) {
            setActiveTabProps({ anchor: active.anchor, tabHeight: tabsContentRef[active.anchor]?.clientHeight });
            onChange?.(active);
          }
        }, [active]);

        function switchTab(anchor: string | number) {
          dispatch({ type: 'setActive', anchor });
        }

        return useMemo(
          () => (
            <div className={classNames('common-tabs', isVertical && 'vertical', className)}>
              <div className={classNames('common-tabs__navigation', alignNavigation, !isVertical && 'mb-9')}>
                {state.labels.map((label, l) => (
                  <div
                    key={l}
                    data-id={label.anchor}
                    className={classNames(
                      'tab__link',
                      activeTabProps?.anchor === label.anchor && 'active',
                      !isVertical && 'mr-7',
                    )}
                    onClick={() => switchTab(label.anchor)}
                    ref={(ref) => activeTabProps?.anchor === label.anchor && (activeNavTabLink = ref)}
                  >
                    {label.value}
                  </div>
                ))}
                {activeTabProps && !isVertical && (
                  <div
                    className="active-tab-line"
                    style={{ left: lineProps?.navLineLeft, width: lineProps?.navLineWidth }}
                  />
                )}
              </div>
              <div className="common-tabs__container">
                {!children
                  ? state.contents.map((content, c) => <Tab key={c} anchor={content.anchor} content={content.value} />)
                  : children}
              </div>
            </div>
          ),
          [active],
        );
      }}
    </TabsProvider>
  );
}

export const Tab = memo(
  forwardRef<HTMLDivElement, ITab>(function Tab(props, ref) {
    const dispatch = useTabsDispatch();
    const tabsState = useTabsState();
    const isActive = tabsState.active === props.anchor;
    const _content = !props.children && props.content ? <TabContent content={props.content} /> : props.children;

    if (!props.children && !props.content) {
      throw new Error('Tab must have (props.children) or (props.content)!');
    }

    function tabInitialized() {
      return tabsState.anchors.includes(props.anchor);
    }

    function AfterRenderDispatch() {
      useEffect(() => {
        dispatch({
          type: 'add',
          anchor: props.anchor,
          label: props.label,
          content: props.content,
        });
      }, []);

      return null;
    }

    return (
      <div
        id={props.anchor.toString()}
        className={classNames('tab__content', props.className, isActive && 'active')}
        ref={ref}
      >
        {!tabInitialized() ? (
          <>
            {_content}
            <AfterRenderDispatch />
          </>
        ) : isActive ? (
          _content
        ) : null}
      </div>
    );
  }),
);

export const TabLabel = memo(function TabLabel(props: { children: string | React.ReactFragment; className?: string }) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempLabel', label: props.children }), []);
  return null;
});

const TabContent = memo(function TabContent(props: { content: string | React.ReactFragment; className?: string }) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempContent', content: props.content }), []);
  return <>{props.content}</>;
});
