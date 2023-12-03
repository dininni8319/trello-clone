import { DragItem } from "../DragItem"

interface Item {
  id: string
}

// looks in the lists for the item that has the same id
export const findItemIndexById = <T extends Item>(
  items: T[],
  id: string
) => {
  return items.findIndex((item: T) => item.id === id)
}

export const moveItem = <T>(array: T[], from: number, to: number): T[] => {
  const startIndex = to < 0 ? array.length + to : to;
  const newArray = [...array];
  const [removedItem] = newArray.splice(from, 1);
  newArray.splice(startIndex, 0, removedItem);
  return newArray;
};


// isHidden is a function that takes 4 arguments and returns a boolean
export const isHidden = ( 
  isPreview: boolean | undefined, 
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string,
  ): boolean => { 
    return Boolean( !isPreview &&
        draggedItem &&
        draggedItem.type === itemType &&
        draggedItem.id === id
  ) }
