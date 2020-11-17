import React from 'react';

type CardUid = number | string;
type Action = { type: 'scrollToCard' | 'addCard' | 'setActiveCard'; uid?: CardUid };
type Dispatch = (action: Action) => void;
type State = {
  cardsUid: CardUid[];
  scrollToUid?: CardUid;
  activeCardUid?: CardUid;
  cardsAmount?: number;
};
type CardsProviderProps = { children: (state: State, action: Dispatch) => React.ReactNode };

const CardsStateContext = React.createContext<State | undefined>(undefined);
const CardsDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function cardsReducer(state: State, action: Action) {
  switch (action.type) {
    case 'scrollToCard': {
      return { ...state, activeCardUid: action.uid, scrollToUid: action.uid };
    }
    case 'setActiveCard': {
      return { ...state, activeCardUid: action.uid };
    }
    case 'addCard': {
      const _cardsUid = state.cardsUid || [];
      if (action.uid != null || action.uid != undefined) {
        if (_cardsUid.indexOf(action.uid) != -1) {
          throw new Error(`Card Uid must be unique. CardsUid List: ${_cardsUid.join('; ')}`);
        }
        _cardsUid.push(action.uid);
      }

      return {
        ...state,
        cardsAmount: (state.cardsAmount || 0) + 1,
        cardsUid: _cardsUid,
        activeCardUid: _cardsUid[0],
      };
    }
    default: {
      throw new Error(`Unhandled Cards action type: ${action.type}`);
    }
  }
}

function CardsProvider({ children }: CardsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(cardsReducer, {
    cardsAmount: 0,
    activeCardUid: 0,
    cardsUid: [],
  });

  return (
    <CardsStateContext.Provider value={state}>
      <CardsDispatchContext.Provider value={dispatch}>{children(state, dispatch)}</CardsDispatchContext.Provider>
    </CardsStateContext.Provider>
  );
}

function useCardsState() {
  const context = React.useContext(CardsStateContext);
  if (context === undefined) {
    throw new Error('useCardsState must be used within a CardsProvider');
  }
  return context;
}

function useCardsDispatch() {
  const context = React.useContext(CardsDispatchContext);
  if (context === undefined) {
    throw new Error('useCardsDispatch must be used within a CardsProvider');
  }
  return context;
}

export { CardsProvider, useCardsState, useCardsDispatch };
