import React from 'react';

type CardElement = { elem: React.ReactNode; class?: string } | null;
type CardUid = number | string;
type Action = {
  type: 'scrollToCard' | 'addCard' | 'setActiveCard' | 'addTempHeader' | 'addTempContent';
  uid?: CardUid;
  header?: CardElement;
  content?: CardElement;
  tempHeader?: CardElement;
  tempContent?: CardElement;
};
type Dispatch = (action: Action) => void;
type State = {
  cards: {
    header: CardElement;
    content: CardElement;
    uid: CardUid;
  }[];
  scrollToUid?: CardUid;
  activeCardUid?: CardUid;
  cardsAmount?: number;
  tempHeader: CardElement;
  tempContent: CardElement;
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
    case 'addTempHeader': {
      return { ...state, tempHeader: action.tempHeader || null };
    }
    case 'addTempContent': {
      return { ...state, tempContent: action.tempContent || null };
    }
    case 'addCard': {
      const _cards = state.cards || [];
      if (action.uid != null || action.uid != undefined) {
        if (_cards.findIndex((card) => card.uid === action.uid) != -1) {
          throw new Error(`Card Uid must be unique. CardsUid List: ${_cards.join('; ')}`);
        }

        _cards.push({
          header: Object.assign({}, state.tempHeader, action.header),
          content: Object.assign({}, state.tempContent, action.content),
          uid: action.uid,
        });
      }

      return {
        ...state,
        cardsAmount: (state.cardsAmount || 0) + 1,
        cards: _cards,
        activeCardUid: _cards[0].uid,
        tempHeader: null,
        tempContent: null,
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
    cards: [],
    tempHeader: null,
    tempContent: null,
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
