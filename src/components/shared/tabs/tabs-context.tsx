import React from 'react';

type TabAnchor = number | string | undefined;
type TabData = string | React.ReactFragment | undefined;
type Action = {
  type: 'instantInit' | 'add' | 'addTempLabel' | 'addTempContent' | 'addAnchor' | 'setActive';
  label?: TabData;
  content?: TabData;
  anchor?: TabAnchor;
  labels?: { value: TabData; anchor: number | string }[];
  contents?: { value: TabData; anchor: number | string }[];
};
type Dispatch = (action: Action) => void;
type State = {
  labels: { value: TabData; anchor: number | string }[];
  contents: { value: TabData; anchor: number | string }[];
  anchors: TabAnchor[];
  active: TabAnchor;
  tempLabel: TabData;
  tempContent: TabData;
  initial: boolean;
};
type ActiveTab = {
  label?: { value: TabData; anchor: number | string };
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
      return { ...state, active: action.anchor };
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
    case 'addAnchor': {
      const _tabsUid = state.anchors || [];
      if (action.anchor != null || action.anchor != undefined) {
        if (_tabsUid.indexOf(action.anchor) != -1) {
          throw new Error(`TabAnchor must be unique. TabsUid List: ${_tabsUid.join('; ')}`);
        }
        _tabsUid.push(action.anchor);
      }

      return {
        ...state,
        anchors: _tabsUid,
        active: _tabsUid[0],
      };
    }
    case 'addTempLabel': {
      console.log(action, state);

      return { ...state, tempLabel: action.label };
    }
    case 'addTempContent': {
      return { ...state, tempContent: action.content };
    }
    case 'add': {
      if (state.initial) return state;

      console.log(action, state);

      const _tabsUid = state.anchors || [];
      if (action.anchor != null || action.anchor != undefined) {
        if (_tabsUid.indexOf(action.anchor) != -1) {
          return state;
          // throw new Error(`TabAnchor must be unique. TabsUid List: ${_tabsUid.join('; ')}`);
        }
        _tabsUid.push(action.anchor);
      }

      const _labels = state.labels || [];
      if ((action.label || state.tempLabel) && action.anchor)
        _labels.push({
          value: action.label || state.tempLabel,
          anchor: action.anchor,
        });

      const _content = state.contents || [];
      if ((action.content || state.tempContent) && action.anchor)
        _content.push({
          value: action.content || state.tempContent,
          anchor: action.anchor,
        });

      return {
        ...state,
        labels: _labels,
        contents: _content,
        anchors: _tabsUid,
        active: _tabsUid[0],
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
    tempContent: undefined,
    initial: false,
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
