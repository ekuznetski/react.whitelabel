import React from 'react';

type Action = {
  type: 'changeTab' | 'registerRef';
  activeTab?: string;
  formRef?: React.RefObject<HTMLDivElement> | null;
};
export type Dispatch = (action: Action) => void;
type State = {
  activeTab?: string;
  formRef?: React.RefObject<HTMLDivElement> | null;
};
type PartnershipProviderProps = { children: (state: State, action: Dispatch) => React.ReactNode };

const PartnershipStateContext = React.createContext<State | undefined>(undefined);
const PartnershipDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function partnershipReducer(state: State, { type, activeTab, formRef }: Action) {
  switch (type) {
    case 'changeTab': {
      return { ...state, activeTab };
    }
    case 'registerRef': {
      return { ...state, formRef };
    }
    default: {
      throw new Error(`Unhandled Partnership action type: ${type}`);
    }
  }
}

function PartnershipProvider({ children }: PartnershipProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(partnershipReducer, {
    activeTab: 'affiliate',
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

function navigateToForm() {
  const state = usePartnershipState();
  state.formRef?.current?.scrollIntoView({ behavior: 'smooth' });
}

export { PartnershipProvider, usePartnershipState, usePartnershipDispatch, navigateToForm };
