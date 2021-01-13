import { EDocumentsType } from '@domain/enums';
import React from 'react';

export type UploadText = string | React.ReactFragment | undefined;
export type UploadIcon = { name: string; height?: number; width?: number };
export enum UploadViewState {
  empty = 'empty',
  error = 'error',
  loading = 'loading',
  ready = 'ready',
  complete = 'complete',
}
export type UploadAction = {
  type:
    | 'initFile'
    | 'addDesc'
    | 'addIcon'
    | 'addFileType'
    | 'addFile'
    | 'removeFile'
    | 'showError'
    | 'uploadFile'
    | 'complete'
    | 'error';
  desc?: UploadText;
  fileType?: EDocumentsType;
  fileIcon?: UploadIcon;
  file?: File;
  fileDataURL?: string;
  error?: string | React.ReactFragment;
};
export type UploadDispatch = (action: UploadAction) => void;
export type UploadState = {
  fileType: EDocumentsType | null;
  file: File | null;
  fileDataURL: string | null;
  desc: UploadText;
  fileIcon: UploadIcon;
  view: UploadViewState;
  error: string | React.ReactFragment | null;
};
type UploadProviderProps = {
  children: (state: UploadState, action: UploadDispatch) => React.ReactNode;
};

const UploadStateContext = React.createContext<UploadState | undefined>(undefined);
const UploadDispatchContext = React.createContext<UploadDispatch | undefined>(undefined);

function UploadReducer(state: UploadState, action: UploadAction) {
  switch (action.type) {
    case 'initFile': {
      return {
        ...state,
        desc: action.desc,
        fileIcon: action.fileIcon || { name: '' },
        fileType: action.fileType || null,
      };
    }

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
      return { ...state, file: null, fileDataURL: null, view: UploadViewState.empty, error: null };
    }
    case 'uploadFile': {
      return { ...state, view: UploadViewState.loading };
    }
    case 'complete': {
      return { ...state, view: UploadViewState.complete };
    }
    case 'error': {
      return { ...state, view: UploadViewState.error };
    }
    default: {
      throw new Error(`Unhandled Tabs action type: ${action.type}`);
    }
  }
}

function UploadProvider({ children }: UploadProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<UploadState, UploadAction>>(UploadReducer, {
    fileType: null,
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
