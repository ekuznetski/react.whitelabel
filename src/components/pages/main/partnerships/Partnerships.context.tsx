import React from 'react';

type Action = {
  type: 'changeTab' | 'registerRef';
  payload: { activeTab?: string; formRef?: React.RefObject<HTMLDivElement> | null };
};
export type Dispatch = (action: Action) => void;
type State = {
  activeTab?: string;
  formRef?: React.RefObject<HTMLDivElement> | null;
};
type FormsProviderProps = { children: (state: State, action: Dispatch) => React.ReactNode };

const FormsStateContext = React.createContext<State | undefined>(undefined);
const FormsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function formsReducer(state: State, { type, payload }: Action) {
  switch (type) {
    case 'changeTab': {
      return { ...state, activeTab: payload.activeTab };
    }
    case 'registerRef': {
      return { ...state, formRef: payload.formRef };
    }
    default: {
      throw new Error(`Unhandled Forms action type: ${type}`);
    }
  }
}

function FormsProvider({ children }: FormsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(formsReducer, {
    activeTab: 'affiliate',
    formRef: null,
  });

  return (
    <FormsStateContext.Provider value={state}>
      <FormsDispatchContext.Provider value={dispatch}>{children(state, dispatch)}</FormsDispatchContext.Provider>
    </FormsStateContext.Provider>
  );
}

function useFormsState() {
  const context = React.useContext(FormsStateContext);
  if (context === undefined) {
    throw new Error('useFormsState must be used within a FormsProvider');
  }
  return context;
}

function useFormsDispatch() {
  const context = React.useContext(FormsDispatchContext);
  if (context === undefined) {
    throw new Error('useFormsDispatch must be used within a FormsProvider');
  }
  return context;
}

function navigateToForm(formRef?: React.RefObject<HTMLDivElement> | null) {
  formRef?.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
}

export { FormsProvider, useFormsState, useFormsDispatch, navigateToForm };
