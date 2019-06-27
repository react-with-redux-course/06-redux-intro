console.clear();

// People dropping off a form (Action Creators)

const createPolicy = (name, amount) => {
  return { // ACTION (anaology: insurance company form)
    type: 'CREATE_POLICY',
    payload: {
      name, // name: name
      amount //amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      amountOfMoneyToCollect
    }
  };
};

// Reducers (like departments of an insurance company)

/*
  if oldListOfClaims is undefined (like when claimsHistory)
  is first defined, set it to an empty array
*/
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    // we care about this action (aka form)
    return [...oldListOfClaims, action.payload];
  }
  
  // we don't care about the action (aka form)
  return oldListOfClaims;
};

/*
  initialize bagOfMoney so that insurance
  company has $100
*/
const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
      return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === 'CREATE_POLICY') {
    return bagOfMoney + action.payload.amount;     
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
      return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};

// functions from Redux
const { createStore, combineReducers } = Redux;

const ourDepartments = combineReducers({
  // names of our different reducers:
  accounting,
  claimsHistory,
  policies
});

const store = createStore(ourDepartments);

/*
our store has a dispatch function.
dispatch() will take our action, make copies of
the action so that each reducer will receive a copy
*/

store.dispatch(createPolicy('Grace', 20)); // action will be shipped off to each reducer
store.dispatch(createPolciy('Jack', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim('Grace', 120));
store.dispatch(createClaim('Jack', 50));

store.dispatch(deletePolicy('Bob')); // only Grace and Jack will have policies in the store

console.log(store.getState()); // get our entire/central repository of all data created by reducers