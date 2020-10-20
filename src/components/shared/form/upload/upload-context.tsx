import React from 'react';

export type UploadText = string | React.ReactFragment | undefined;
export type UploadIcon = { name: string; height?: number; width?: number };
type Action = {
  type: 'addDesc' | 'addIcon';
  desc?: UploadText;
  fileIcon?: UploadIcon;
};
type Dispatch = (action: Action) => void;
type State = {
  desc: UploadText;
  fileIcon: UploadIcon;
};
type UploadProviderProps = {
  children: (state: State, action: Dispatch) => React.ReactNode;
};

const UploadStateContext = React.createContext<State | undefined>(undefined);
const UploadDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function UploadReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addDesc': {
      return { ...state, desc: action.desc };
    }
    case 'addIcon': {
      return { ...state, fileIcon: action.fileIcon || { name: '' } };
    }
    default: {
      throw new Error(`Unhandled Tabs action type: ${action.type}`);
    }
  }
}

function UploadProvider({ children }: UploadProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(UploadReducer, {
    desc: undefined,
    fileIcon: { name: '' },
  });

  return (
    <UploadStateContext.Provider value={state}>
      <UploadDispatchContext.Provider value={dispatch}>{children(state, dispatch)}</UploadDispatchContext.Provider>
    </UploadStateContext.Provider>
  );
}

function useUploadState() {
  const context = React.useContext(UploadStateContext);
  if (context === undefined) {
    throw new Error('useUploadState must be used within a UploadProvider');
  }
  return context;
}

function useUploadDispatch() {
  const context = React.useContext(UploadDispatchContext);
  if (context === undefined) {
    throw new Error('useUploadDispatch must be used within a UploadProvider');
  }
  return context;
}

export { UploadProvider, useUploadState, useUploadDispatch };
