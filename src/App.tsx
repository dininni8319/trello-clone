import { 
  AppContainer
} from './style/style'
import  { Column } from './components/Column'
import './App.css'
import { AddNewItem } from './components/AddNewItem'
import { useAppState } from './contexts/AppContext'
import { CustomDragLayer } from './components/CustomDragLayer'

function App() {
  const { state, dispatch } = useAppState()

  return (
    // arrange columns horizontally
    <AppContainer> 
      <CustomDragLayer />
      {
        state.lists.map((list, i) => (
          <Column 
            title={list.text}
            key={list.id} 
            index={i} 
            id={list.id}
          />
        ))
      }
      <AddNewItem 
         toggleButtonText='+Add another list'
         onAdd={(text) => dispatch(
            { type: 'ADD_LIST', payload: text }
         )}
      />
    </AppContainer>
  )
}

export default App
