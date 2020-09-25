import React from 'react';

type TabAnchor = number | string;
type Action = { type: 'add' | 'setActive'; anchor: TabAnchor };
type Dispatch = (action: Action) => void;
type State = {
	labels: (string | React.ReactFragment)[];
	content: (string | React.ReactFragment)[];
	anchors: any;
	active: string | number;
};
type TabsProviderProps = { children: (state: State, action: Dispatch) => React.ReactNode };

const TabsStateContext = React.createContext<State | undefined>(undefined);
const TabsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function TabsReducer(state: State, action: Action) {
	switch (action.type) {
		case 'setActive': {
			return { ...state, active: action.anchor };
		}
		case 'add': {
			const _tabsUid = state.anchors || [];
			if (action.anchor != null || action.anchor != undefined) {
				if (_tabsUid.indexOf(action.anchor) != -1) {
					throw new Error(`TabAnchor must be unique. TabsUid List: ${_tabsUid.join('; ')}`);
				}
				_tabsUid.push(action.anchor);
			}

			return {
				labels: [],
				context: [],
				anchors: _tabsUid,
				active: _tabsUid[0],
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
		content: [],
		active: undefined,
	});
	return (
		<TabsStateContext.Provider value={state}>
			<TabsDispatchContext.Provider value={dispatch}>{children(state, dispatch)}</TabsDispatchContext.Provider>
		</TabsStateContext.Provider>
	);
}

function generateLabels() {

}

function generateContent() {

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

export { TabsProvider, useTabsState, useTabsDispatch };
