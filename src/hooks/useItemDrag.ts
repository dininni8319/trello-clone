import { useDrag } from 'react-dnd'
import { useAppState } from '../contexts/AppContext'
import { DragItem } from '../DragItem'
import { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend';

// Internally this hook uses useDrag from react-dnd. We pass an options object to it.
// • item - contains the data about the dragged item 
// • begin - is called when we start dragging an item 
// • end - is called when we release the item
// As you can see inside this hook we dispatch the new SET_DRAGGED_ITEM action. When we start dragging - we store the item in our app state, and when we stop - we reset it to undefined.


// export const useItemDrag = (item: DragItem) => {
//   const { dispatch } = useAppState()
//   const [ , drag, preview ] = useDrag({
//     type: item.type,
//     item: () => {
//       dispatch(
//         { 
//           type: 'SET_DRAGGED_ITEM', 
//           payload: item 
//         });
//       return item;
//     },
//     end: () => dispatch(
//       { 
//         type: 'SET_DRAGGED_ITEM', 
//         payload: undefined 
//       }),
//   })


//   return { drag }
// }


export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();

  const [{ isDragging }, drag, preview] = useDrag({
    type: item.type, //Contains data about the item we're trying to drag
   //Item replaced Begin in the new version of React DnD
    item: () => {
        return  dispatch({
          type: "SET_DRAGGED_ITEM",
          payload: item
        }) //Need to return Item + action
      
    },
    end : () => 
      dispatch({
      type: "SET_DRAGGED_ITEM",
      payload: undefined
      })
    ,
        
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      })
    })
    
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    },[preview])
    return {drag}
}