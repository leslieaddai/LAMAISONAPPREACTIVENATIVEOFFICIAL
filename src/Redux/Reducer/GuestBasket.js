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
      return {...state, products: state.products.map(p => {
        if(p.data.id === action.payload.data.id && p.colorId.id === action.payload.colorId.id && p.sizeId.size_id === action.payload.sizeId.size_id){
            return{...p,Quantity:p.Quantity+1}
        };
        return p;
    })};

    case types.DecreamentQuantity:
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
