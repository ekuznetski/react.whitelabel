import React from 'react';
import { DocsType, EUploadWrapperViewType } from '..';

export type UploadWrapperDispatch = (action: Action) => void;
export type UploadWrapperState = {
  view: EUploadWrapperViewType | null;
  documentsTypeList: DocsType[];
  selectedDocTypeIdx: number;
};
type Action = {
  view?: EUploadWrapperViewType;
  documentsTypeList?: DocsType[];
  activeDocTypeIdx?: number;
};
type UploadWrapperProviderProps = {
  children: (state: UploadWrapperState, action: UploadWrapperDispatch) => React.ReactNode;
};

const UploadWrapperStateContext = React.createContext<UploadWrapperState | undefined>(undefined);
const UploadWrapperDispatchContext = React.createContext<UploadWrapperDispatch | undefined>(undefined);

function UploadWrapperReducer(state: UploadWrapperState, action: Action) {
  return {
    ...state,
    view: action.view || null,
    documentsTypeList: action.documentsTypeList || state.documentsTypeList || [],
    selectedDocTypeIdx: action.activeDocTypeIdx || 0,
  };
}

function UploadWrapperProvider({ children }: UploadWrapperProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<UploadWrapperState, Action>>(UploadWrapperReducer, {
    view: null,
    documentsTypeList: [],
    selectedDocTypeIdx: 0,
  });

  return (
    <UploadWrapperStateContext.Provider value={state}>
      <UploadWrapperDispatchContext.Provider value={dispatch}>
        {children(state, dispatch)}
      </UploadWrapperDispatchContext.Provider>
    </UploadWrapperStateContext.Provider>
  );
}

function useUploadWrapperState() {
  const context = React.useContext(UploadWrapperStateContext);
  if (context === undefined) {
    throw new Error('useUploadState must be used within a UploadProvider');
  }
  return context;
}

function useUploadWrapperDispatch() {
  const context = React.useContext(UploadWrapperDispatchContext);
  // if (context === undefined) {
  //   throw new Error('useUploadDispatch must be used within a UploadProvider');
  // }
  return context;
}

export { UploadWrapperProvider, useUploadWrapperState, useUploadWrapperDispatch };
