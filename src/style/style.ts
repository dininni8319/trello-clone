import styled from "styled-components"

interface AddItemButtonProps {
  dark?: boolean
}

interface DragPreviewContainerProps {
  isHidden?: boolean
  isPreview?: boolean
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  opacity: ${props=> props.isHidden ? 0 : 1 };
  transform: ${props => props.isPreview ? "rotate(5deg)" : undefined};
`

// arrange columns horizontally
export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #3179ba;
  height: 100%;
  padding: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;  // interactive cards
  margin-bottom: 0.5rem;
  max-width: 300px;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
`

//- set the grey background and rounded corners 
export const ColumnContainer = styled(DragPreviewContainer)`
  background-color: #ebecf0; //gray bg
  width: 300px;
  margin-right: 20px;
  min-height: 40px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0; //So the component doesn’t try to take up all the horizontal space.
  margin-top: 5px;
  @media (max-width: 768px) {
    margin-right: 0;
  }
`

//- make column title bold and add paddings
export const ColumnTitle = styled.div`
  padding: 6px 16px 12px;
  font-weight: bold;
`

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffff3d;
  border-radius: 3px;
  border: none;
  color: ${({ dark }) => dark ?  "#000" : "#fff"};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #D0D4DC;
  }
`
export const NewItemFormContainer = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`
export const NewItemButton = styled.button`
  background-color: #5aac44;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`
export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e660a 0 1px 0 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
  outline: none;
`

export const CustomDragLayerContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`