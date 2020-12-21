import React from 'react';

export enum EPartnershipTabs {
  'affiliate' = 'affiliate',
  'ib' = 'ib',
  'whiteLabel' = 'whiteLabel',
}

type Action = {
  type: 'changeTab' | 'registerRef';
  activeTab?: EPartnershipTabs;
  formRef?: React.RefObject<HTMLDivElement> | null;
};
export type Dispatch = (action: Action) => void;
type State = {
  activeTab?: EPartnershipTabs;
  formRef?: React.RefObject<HTMLDivElement> | null;
};
type PartnershipProviderProps = { children: (state: State, action: Dispatch) => React.ReactNode };

const PartnershipStateContext = React.createContext<State | undefined>(undefined);
const PartnershipDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function partnershipReducer(state: State, action: Action) {
  switch (action.type) {
    case 'changeTab': {
      return { ...state, activeTab: action.activeTab };
    }
    case 'registerRef': {
      return { ...state, formRef: action.formRef };
    }
    default: {
      throw new Error(`Unhandled Partnership action type: ${action.type}`);
    }
  }
}

function PartnershipProvider({ children }: PartnershipProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(partnershipReducer, {
    activeTab: EPartnershipTabs.affiliate,
    formRef: null,
  });

  return (
    <PartnershipStateContext.Provider value={state}>
      <PartnershipDispatchContext.Provider value={dispatch}>
        {children(state, dispatch)}
      </PartnershipDispatchContext.Provider>
    </PartnershipStateContext.Provider>
  );
}

function usePartnershipState() {
  const context = React.useContext(PartnershipStateContext);
  if (context === undefined) {
    throw new Error('usePartnershipState must be used within a PartnershipProvider');
  }
  return context;
}

function usePartnershipDispatch() {
  const context = React.useContext(PartnershipDispatchContext);
  if (context === undefined) {
    throw new Error('usePartnershipDispatch must be used within a PartnershipProvider');
  }
  return context;
}

export { PartnershipProvider, usePartnershipState, usePartnershipDispatch };
