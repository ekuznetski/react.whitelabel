import React from 'react';

export enum EUploadWrapperViewType {
  select = 'select',
  upload = 'upload',
  documents = 'documents',
}
export type DocsType = { icon: string; iconHeight?: number; label: string | React.ReactFragment };
export type UploadWrapperDispatch = (action: Action) => void;
export type UploadWrapperState = {
  view: EUploadWrapperViewType | null;
  cover: DocsType[];
};
type Action = {
  type: 'addCover' | 'changeView';
  view?: EUploadWrapperViewType;
  cover?: DocsType;
};
type UploadWrapperProviderProps = {
  children: (state: UploadWrapperState, action: UploadWrapperDispatch) => React.ReactNode;
};

const UploadWrapperStateContext = React.createContext<UploadWrapperState | undefined>(undefined);
const UploadWrapperDispatchContext = React.createContext<UploadWrapperDispatch | undefined>(undefined);

function UploadWrapperReducer(state: UploadWrapperState, action: Action) {
  switch (action.type) {
    case 'addCover': {
      return {
        ...state,
        cover: Object.assign(state.cover, [action.cover]),
      };
    }
    case 'changeView': {
      return {
        ...state,
        view: action.view,
      };
    }
    default: {
      throw new Error(`Unhandled Tabs action type: ${action.type}`);
    }
  }
}

function UploadWrapperProvider({ children }: UploadWrapperProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<UploadWrapperState, Action>>(UploadWrapperReducer, {
    view: null,
    cover: [],
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
  if (context === undefined) {
    throw new Error('useUploadDispatch must be used within a UploadProvider');
  }
  return context;
}

export { UploadWrapperProvider, useUploadWrapperState, useUploadWrapperDispatch };
