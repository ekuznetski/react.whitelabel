import React from 'react';

export type CardUid = number | string;
type CardElement = { elem: React.ReactNode; class?: string } | null;
type Card = {
  header: CardElement;
  content: CardElement;
  uid: CardUid;
  ref: HTMLDivElement | null;
};
type Action = {
  type: 'scrollToCard' | 'addCard' | 'addCardRef' | 'setActiveCard' | 'addTempHeader' | 'addTempContent';
  uid?: CardUid;
  ref?: HTMLDivElement | null;
  header?: CardElement;
  content?: CardElement;
  tempHeader?: CardElement;
  tempContent?: CardElement;
};
type Dispatch = (action: Action) => void;
type State = {
  cards: Card[];
  activeCard: Card;
  scrollToUid?: CardUid;
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
      const _cards = state.cards || [];
      const _card = _cards.find((c) => c.uid === action.uid);

      if (!_card) throw new Error(`Card Uid not found. CardsUid List: ${_cards.map((c) => c.uid).join('; ')}`);

      return { ...state, activeCard: _card, scrollToUid: action.uid };
    }
    case 'setActiveCard': {
      const _cards = state.cards || [];
      const _card = _cards.find((c) => c.uid === action.uid);

      if (!_card) throw new Error(`Card Uid not found. CardsUid List: ${_cards.map((c) => c.uid).join('; ')}`);

      return { ...state, activeCard: _card };
    }
    case 'addTempHeader': {
      return { ...state, tempHeader: action.tempHeader || null };
    }
    case 'addTempContent': {
      return { ...state, tempContent: action.tempContent || null };
    }
    case 'addCard': {
      const _cards = state.cards || [];
      if (action.uid !== '' && action.uid != null && action.uid != undefined) {
        if (_cards.findIndex((card) => card.uid === action.uid) != -1) {
          throw new Error(`Card Uid must be unique. CardsUid List: ${_cards.map((c) => c.uid).join('; ')}`);
        }

        _cards.push({
          header: Object.assign({}, state.tempHeader, action.header),
          content: Object.assign({}, state.tempContent, action.content),
          uid: action.uid,
          ref: null,
        });
      } else {
        throw new Error(`Card Uid can't be a 'null', 'undefined' or empty string`);
      }

      return {
        ...state,
        cardsAmount: (state.cardsAmount || 0) + 1,
        cards: _cards,
        activeCard: _cards[0],
        tempHeader: null,
        tempContent: null,
      };
    }
    case 'addCardRef': {
      if (action.ref != null && action.ref != undefined) {
        if (!state.cardsAmount) {
          throw new Error(`Cards must have at least one element to reference it`);
        }

        const _cards = state.cards.map((card) => {
          // @ts-ignore
          if (card.uid === action.uid) card.ref = action.ref;

          return card;
        });

        return {
          ...state,
          cards: _cards,
        };
      }

      return state;
    }
    default: {
      throw new Error(`Unhandled Cards action type: ${action.type}`);
    }
  }
}

function CardsProvider({ children }: CardsProviderProps) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(cardsReducer, {
    cardsAmount: 0,
    cards: [],
    activeCard: {
      header: null,
      content: null,
      uid: '',
      ref: null,
    },
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
