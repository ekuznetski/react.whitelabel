import React from 'react';

export enum EMobileDisplay {
  labels = 'labels',
  content = 'content ',
}
export type TabData = string | React.ReactFragment | undefined;
type TabAnchor = number | string | undefined;
type Action = {
  type:
    | 'instantInit'
    | 'add'
    | 'addTempLabel'
    | 'addTempSubLabel'
    | 'addTempContent'
    | 'disabledAll'
    | 'setActive'
    | 'setCustomMobileBackBtn'
    | 'setMobileDisplay';
  label?: { value: TabData; desc?: TabData; icon?: string };
  content?: TabData;
  anchor?: TabAnchor;
  disabled?: boolean;
  disabledAll?: boolean;
  labels?: { value: TabData; desc?: TabData; icon?: string; anchor: number | string; disabled?: boolean }[];
  contents?: { value: TabData; anchor: number | string }[];
  mobileDisplay?: EMobileDisplay;
  customMobileBackBtn?: boolean;
};
type Dispatch = (action: Action) => void;
type State = {
  labels: { value: TabData; desc?: TabData; icon?: string; anchor: number | string; disabled?: boolean }[];
  contents: { value: TabData; anchor: number | string }[];
  anchors: TabAnchor[];
  active: TabAnchor;
  disabledAll: boolean;
  tempLabel: { value: TabData; icon?: string } | undefined;
  tempSubLabel: TabData;
  tempContent: TabData;
  initial: boolean;
  mobileDisplay: EMobileDisplay;
  customMobileBackBtn: boolean;
};
type ActiveTab = {
  label?: { value: TabData; anchor: number | string; disabled?: boolean };
  content?: { value: TabData; anchor: number | string };
  anchor: TabAnchor;
};
type TabsProviderProps = {
  children: (state: State, action: Dispatch, active: ActiveTab) => React.ReactNode;
};

const TabsStateContext = React.createContext<State | undefined>(undefined);
const TabsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function TabsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'setActive': {
      return {
        ...state,
        active: action.anchor,
      };
    }
    case 'setMobileDisplay': {
      return {
        ...state,
        mobileDisplay: action.mobileDisplay ?? EMobileDisplay.labels,
      };
    }
    case 'instantInit': {
      const anchors = action.labels?.map((label) => label.anchor) || [];
      return {
        ...state,
        active: action.anchor,
        anchors,
        labels: action.labels || [],
        contents: action.contents || [],
        initial: true,
      };
    }
    case 'addTempLabel': {
      return { ...state, tempLabel: action.label };
    }
    case 'addTempSubLabel': {
      return { ...state, tempSubLabel: action.label };
    }
    case 'addTempContent': {
      return { ...state, tempContent: action.content };
    }
    case 'setCustomMobileBackBtn': {
      return { ...state, customMobileBackBtn: action.customMobileBackBtn || false };
    }
    case 'disabledAll': {
      return {
        ...state,
        disabledAll: !!action.disabledAll,
        labels: state.labels.map((label) => ({ ...label, disabled: action.disabledAll || label.disabled })),
      };
    }
    case 'add': {
      if (state.initial) return state;

      const _tabsUid = state.anchors || [];
      if (action.anchor != null || action.anchor != undefined) {
        if (_tabsUid.indexOf(action.anchor) != -1) {
          return state;
          // throw new Error(`TabAnchor must be unique. TabsUid List: ${_tabsUid.join('; ')}`);
        }
        _tabsUid.push(action.anchor);
      }

      const _labels = state.labels || [];
      if ((action.label || state.tempLabel) && (action.anchor != null || action.anchor != undefined))
        _labels.push({
          ...{
            value: undefined,
            ...(action.label ? action.label : {}),
            ...(state.tempLabel
              ? { value: state.tempLabel.value, desc: state.tempSubLabel, icon: state.tempLabel.icon }
              : {}),
          },
          anchor: action.anchor,
          disabled: state.disabledAll || action.disabled,
        });

      const _content = state.contents || [];
      if ((action.content || state.tempContent) && (action.anchor != null || action.anchor != undefined))
        _content.push({
          value: action.content || state.tempContent,
          anchor: action.anchor,
        });
      return {
        ...state,
        labels: _labels,
        contents: _content,
        anchors: _tabsUid,
        active: state.active || _labels.filter((label) => !label.disabled)[0].anchor,
        tempLabel: undefined,
        tempContent: undefined,
      };
    }
    default: {
      throw new Error(`Unhandled Tabs action type: ${action.type}`);
    }
  }
}

function TabsProvider({ children }: TabsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(TabsReducer, {
    anchors: [],
    labels: [],
    contents: [],
    active: '',
    tempLabel: undefined,
    tempSubLabel: undefined,
    tempContent: undefined,
    disabledAll: false,
    initial: false,
    mobileDisplay: EMobileDisplay.labels,
    customMobileBackBtn: false,
  });
  const active = {
    anchor: state.active,
    label: state.labels.find((label) => label.anchor === state.active),
    content: state.contents.find((content) => content.anchor === state.active),
  };

  return (
    <TabsStateContext.Provider value={state}>
      <TabsDispatchContext.Provider value={dispatch}>{children(state, dispatch, active)}</TabsDispatchContext.Provider>
    </TabsStateContext.Provider>
  );
}

function useTabsState() {
  const context = React.useContext(TabsStateContext);
  if (context === undefined) {
    throw new Error('useTabsState must be used within a TabsProvider');
  }
  return context;
}

function useTabsDispatch() {
  const context = React.useContext(TabsDispatchContext);
  if (context === undefined) {
    throw new Error('useTabsDispatch must be used within a TabsProvider');
  }
  return context;
}

export { TabsProvider, useTabsState, useTabsDispatch, ActiveTab };
