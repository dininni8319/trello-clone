import { CardContainer } from "../style/style"
import { useDrop } from 'react-dnd'
import { DragItem } from '../DragItem'
import { useAppState } from "../contexts/AppContext"
import { useItemDrag } from "../hooks/useItemDrag"
import { useRef } from "react"

interface CardProps {
  text: string
  id: string
  index: number
  columnId: string
}

export const Card = ({ text, id, index, columnId }: CardProps) => {
  const { state, dispatch } = useAppState()
  const columnRef = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({
    type: "CARD",
    id,
    text,
    index,
    columnId
  
  })
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: DragItem) {
      if (item.type === "CARD") {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceColumn = item.columnId
        const targetColumn = id
        if (dragIndex === hoverIndex) {
          return
        }
        item.index = hoverIndex
        item.columnId = targetColumn
        dispatch({
          type: "MOVE_TASK",
          payload: {
            dragIndex,
            hoverIndex,
            sourceColumn,
            targetColumn
          }
        })
      }
    }   
  }) 

  drag(drop(columnRef))

  return (
    <CardContainer
      ref={columnRef}
    >{text}</CardContainer>
  )
}