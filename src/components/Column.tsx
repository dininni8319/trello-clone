import { 
  ColumnContainer, 
  ColumnTitle 
} from '../style/style'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../contexts/AppContext'
import { Card } from './Card'
import { useRef } from 'react'
import { useItemDrag } from '../hooks/useItemDrag'
import { useDrop } from 'react-dnd'
import { DragItem } from '../DragItem'
import { isHidden } from '../util/functions'

interface ColumnProps {
  title: string
  index: number
  id: string
  isPreview?: boolean 
}

export const Column = (
  //cleaner approach with PropsWithChildren          
  { title, index, id, isPreview }: ColumnProps
  ) => {

  const [, drop] = useDrop({
    accept: "COLUMN",
    // Inside our hover callback we check that dragIndex and hoverIndex are not the same. 
    // Which means we aren’t hovering above the dragged item.
    hover(item: DragItem) {
      const dragIndex = item.index
      const hoverIndex = index
  
      if (dragIndex === hoverIndex) {
        return
      }
      dispatch({
        type: "MOVE_LIST",
        payload: {
          dragIndex,
          hoverIndex
        }
      })
      item.index = hoverIndex
    }
  })
  
  const { state, dispatch } = useAppState()
  const columnRef = useRef<HTMLDivElement>(null)

  const handleText = (
    text: string, 
    closeForm: (val: boolean) => void
  ) => {
    dispatch(
      { 
        type: 'ADD_TASK', 
        payload: {
          text: text,
          listId: id
        }
      }
    )
    closeForm(false)
  }
  const { drag } = useItemDrag(
    { 
      type: "COLUMN", 
      id , 
      index, 
      text: title
    }
  )
  // we provide the ref to specify as a drag target
  // we know that it will be a div element
  drag(drop(columnRef))
  
  return (
    <ColumnContainer 
      ref={columnRef}
      isHidden={isHidden(
        isPreview,
        state.draggedItem,
        "COLUMN",
        id,
      )}
    >
      <ColumnTitle>{title}</ColumnTitle>
      {

        state?.lists[index]?.tasks.map(task => (
          <Card 
            text={task.text} 
            key={task.id}
            id={task.id}
            columnId={id}
            index={index} 
          />
        ))
      }
      <AddNewItem
        toggleButtonText='+ Add another task'
        onAdd={handleText}
        dark
      />
    </ColumnContainer>
  )
}