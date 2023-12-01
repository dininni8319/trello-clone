import { 
  CustomDragLayerContainer,
} from "../style/style"
import { Column } from "./Column"
import {XYCoord,  useDragLayer } from 'react-dnd'

function getItemStyles(
  currentOffset: XYCoord | null
): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }
  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

export const CustomDragLayer = () => {
  const { isDragging, item, currentOffSet } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffSet: monitor.getClientOffset()
  }))
  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffSet)}>

      </div>
      <Column
        id={item.id}
        title={item.text}
        index={item.index}
      />
    </CustomDragLayerContainer>
) : null }