import { useState } from "react"
import { AddItemButton } from "../style/style"
import { NewItemForm } from "./NewItemForm"

interface AddNewItemProps {
  onAdd(
    text: string,
    setShowForm: (val: boolean) => void
  ): void // onAdd is a callback function that will be called when we click the Create item button.
  toggleButtonText: string // toggleButtonText is the text we’ll render when this component is a button.
  dark?: boolean //dark is a flag that we’ll pass to the styled component.
}

export const AddNewItem = (props: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false)
  const { onAdd, toggleButtonText, dark } = props

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => onAdd(
            text,
            setShowForm,
          )
        }
      />
    )
  }

  return (
    <AddItemButton
      dark={dark} 
      onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  )
}