import dispatcher, { Store, stateType, actionType } from 'shri-2018-flux';

export const LOCATION_CHANGE = '@LOCATION/CHANGE';

const initialState = {
  currentPage: localStorage.getItem('currentPage') || 'events',
};

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      localStorage.setItem('currentPage', action.data);
      return {
        ...state,
        currentPage: action.data,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const store = new Store(initialState, reducer, dispatcher);

export default store;
