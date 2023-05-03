const initial_state = {
  selectedImage:'',
  photos:[],
  after:'',
  hasNextPage:true
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case 'setAfter':
      return {...state, after:action.payload};
      break;
    case 'setHasNextPage':
        return {...state, hasNextPage:action.payload};
      break;
    case 'setPhotos':
        return {...state, photos:action.payload};
      break;
    case 'setSelectedImage':
        return {...state, selectedImage:action.payload};
      break;  
    default:
      return {...state};
      break;
  }
}
