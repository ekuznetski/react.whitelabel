import React from 'react';

export type UploadText = string | React.ReactFragment | undefined;
export type UploadIcon = { name: string; height?: number; width?: number };
export enum UploadViewState {
  empty = 'empty',
  error = 'error',
  loading = 'loading',
  ready = 'ready',
}
type Action = {
  type: 'addDesc' | 'addIcon' | 'addFile' | 'removeFile' | 'showError' | 'uploadFile';
  desc?: UploadText;
  fileIcon?: UploadIcon;
  file?: File;
  fileDataURL?: string;
  error?: string | React.ReactFragment;
};
type Dispatch = (action: Action) => void;
type State = {
  file: File | null;
  fileDataURL: string | null;
  desc: UploadText;
  fileIcon: UploadIcon;
  view: UploadViewState;
  error: string | React.ReactFragment | null;
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
    case 'showError': {
      return { ...state, error: action.error || null, view: UploadViewState.error };
    }
    case 'addFile': {
      return {
        ...state,
        file: action.file || null,
        fileDataURL: action.fileDataURL || null,
        view: UploadViewState.ready,
      };
    }
    case 'removeFile': {
      return { ...state, file: null, view: UploadViewState.empty, error: null };
    }
    case 'uploadFile': {
      return { ...state, view: UploadViewState.loading };
    }
    default: {
      throw new Error(`Unhandled Tabs action type: ${action.type}`);
    }
  }
}

function UploadProvider({ children }: UploadProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(UploadReducer, {
    file: null,
    desc: undefined,
    fileIcon: { name: '' },
    fileDataURL: null,
    view: UploadViewState.empty,
    error: null,
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
