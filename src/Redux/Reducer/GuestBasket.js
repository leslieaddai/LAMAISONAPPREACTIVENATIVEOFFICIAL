import types from '../types';

const initial_state = {
  products:[]
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.AddToBasketGuest:
      return {...state, products:[...state.products, action.payload]};

    case types.RemoveFromBasketGuest:
      return {...state, products: state.products.filter(p => p.data.id !== action.payload.data.id || p.colorId.id !== action.payload.colorId.id || p.sizeId.size_id !== action.payload.sizeId.size_id)};

    case types.IncreamentQuantity:
      //const indexI = state.products.findIndex(p => p.id !== action.payload); //finding index of the item
      //const newArrayI = [...state.products]; //making a new array
      //newArrayI[action.payload].Quantity = newArrayI[action.payload].Quantity + 1 //changing value in the new array
      //console.log(newArrayI[action.payload].Quantity = newArrayI[action.payload].Quantity + 1)
      //return {...state, products: newArrayI};
      return {...state, products: state.products.map(p => {
        if(p.data.id === action.payload.data.id && p.colorId.id === action.payload.colorId.id && p.sizeId.size_id === action.payload.sizeId.size_id){
            return{...p,Quantity:p.Quantity+1}
        };
        return p;
    })};

    case types.DecreamentQuantity:
    //   const indexD = state.products.findIndex(p => p.id !== action.payload); //finding index of the item
    //   const newArrayD = [...state.products]; //making a new array
    //   newArrayD[indexD].completed = true //changing value in the new array
    //   return {...state, products: newArrayD};
    return {...state, products: state.products.map(p => {
        if(p.data.id === action.payload.data.id && p.colorId.id === action.payload.colorId.id && p.sizeId.size_id === action.payload.sizeId.size_id){
            return{...p,Quantity:p.Quantity-1}
        };
        return p;
    })};

    case types.ClearBasketGuest:
      return{products:[]}

    default:
      return {...state};
  }
}
