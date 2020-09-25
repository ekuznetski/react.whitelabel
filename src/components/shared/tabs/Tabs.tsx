import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { TabsProvider, useTabsDispatch, useTabsState } from './tabs-context';
import './Tabs.scss';

export interface ITabs {
  labels?: { value: string | React.ReactFragment; anchor: string }[];
  content?: { value: string | React.ReactFragment; anchor: string }[];
  children?: React.ReactNode;
  activeTab?: string; // anchor
  className?: string;
  isVertical?: boolean;
}

export interface ITab {
  label?: { value: string | React.ReactFragment; anchor: string };
  content?: { value: string | React.ReactFragment; anchor: string };
  children?: React.ReactNode;
  anchor: string; // anchor
  className?: string;
}

interface TabsState {
  activeTabProps: { tabHeight?: number; anchor: string | number };
  lineProps: { navLineWidth?: number; navLineLeft?: number };
}

export function Tabs({ children, labels, content, activeTab, className, isVertical = false }: ITabs) {
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

  function switchTab(anchor: string | number) {
    setActiveTabProps({ anchor, tabHeight: tabsContentRef[anchor]?.clientHeight });
  }

  return (
    <TabsProvider>
      {(state, dispatch) => {
        useEffect(() => {
          if (labels && content) {
            dispatch({ type: 'instantInit', labels, contents: content });
            switchTab(activeTab || labels[0].anchor);
          }
        }, []);

        return (
          <div className={classNames('common-tabs', isVertical && 'vertical', className)}>
            <div className={classNames('common-tabs__navigation', !isVertical && 'mb-9')}>
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
              {state.contents.map((content, c) =>
                content.anchor === activeTabProps?.anchor ? (
                  <div
                    key={c}
                    data-id={content.anchor}
                    className={`tab__content ${activeTabProps?.anchor === content.anchor ? 'active' : ''}`}
                    ref={(ref) => (tabsContentRef[content.anchor] = ref)}
                  >
                    {content.value}
                  </div>
                ) : null,
              )}
            </div>
          </div>
        );
      }}
    </TabsProvider>
  );
}

export const Tab = memo(
  forwardRef<HTMLDivElement, ITab>(function Tab(props, ref) {
    const dispatch = useTabsDispatch();
    const tabsState = useTabsState();

    if (!props.children && !(props.label && props.content)) {
      throw new Error('Tab must have (props.children) or (props.label && props.content)!');
    }

    function AfterRenderDispatch() {
      useEffect(() => {
        if (!props.children)
          dispatch({
            type: 'add',
            label: props.label || tabsState.tempLabel,
            content: props.content || tabsState.tempContent,
            anchor: props.anchor,
          });
        else
          dispatch({
            type: 'addAnchor',
            anchor: props.anchor,
          });
      }, []);

      return null;
    }

    return (
      <div id={props.anchor} className={`tab__content ${tabsState.active === props.anchor ? 'active' : ''}`} ref={ref}>
        {!props.children && props.content ? <TabContent>{props.content}</TabContent> : props.children}
        <AfterRenderDispatch />
      </div>
    );
  }),
);

export const TabLabel = memo(function TabLabel(props: { children: string | React.ReactFragment; className?: string }) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempLabel', label: props.children }), []);
  return <>{props.children}</>;
});

export const TabContent = memo(function TabContent(props: {
  children: string | React.ReactFragment;
  className?: string;
}) {
  const dispatch = useTabsDispatch();
  useEffect(() => dispatch({ type: 'addTempContent', content: props.children }), []);
  return <>{props.children}</>;
});
