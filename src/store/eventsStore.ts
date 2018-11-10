import dispatcher, { Store, stateType, actionType } from 'shri-2018-flux';
import events from '../../events';

export const EVENTS_DELETE = '@EVENTS/DELETE';

const initialState = {
  events: events.events,//...(localStorage.getItem('events') || events),
};

const reducer = (state: stateType, action: actionType) => {
  return {...state};
  // switch (action.type) {
  //   case EVENTS_DELETE: {
  //     const newState = {
  //       ...state,
  //     }
  //     localStorage.setItem('events', action.data);
  //     return {
  //       ...state,
  //       currentPage: action.data,
  //     };
  //   }
  //   default: {
  //     return { ...state };
  //   }
  // }
};

const store = new Store(initialState, reducer, dispatcher);

export default store;
