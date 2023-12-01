import { 
  createContext, 
  useReducer,
  useContext, 
} from "react"
import { v4 as uuidv4 } from'uuid'
import { 
  findItemIndexById,
  moveItem
} from '../util/functions'

import { DragItem } from "../DragItem"

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
  draggedItem: DragItem | undefined 
}

// The technique we are using here is called discriminated union.
type Action = 
  | {
    type: 'ADD_LIST'
    payload: string
  }
  | {
    type: 'ADD_TASK'
    payload: { text: string; listId: string }
  }
  | {
    type: "MOVE_LIST",
    payload: {
      dragIndex: number
      hoverIndex: number
    }
  }
  | {
    type: "SET_DRAGGED_ITEM",
    payload: DragItem | undefined
  }

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: 'To Do',
      tasks: [
        {
          id: "c0", 
          text: 'Generate app scaffold'
        }
      ]
      
    },
    {
      id: "1",
      text: 'In Progress',
      tasks: [
        {
          id: "c1", 
          text: 'Learn Typescript'
        }
      ]
    },
    {
      id: "2",
      text: 'Done',
      tasks: [
        {
          id: "c2", 
          text: 'Begin to use static typing'
        }
      ]
    }
  ],
  draggedItem: undefined
}


interface AppStateProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}
const AppStateContext = createContext({} as AppStateProps)

export const useAppState = () => {
  return useContext(AppStateContext)
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          {     // using the length of the lists array as id
            id: uuidv4(),
            text: action.payload, 
            tasks: []
          }
        ]
      }
    }
    case "ADD_TASK": {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      
      state.lists[targetLaneIndex].tasks.push({
        id: uuidv4(),
        text: action.payload.text
      })
      return {
        ...state
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(
        state.lists, 
        dragIndex, 
        hoverIndex
      ) 
      return {
        ...state
      }
    }

    case "SET_DRAGGED_ITEM":{
      return {
        ...state,
        draggedItem: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export const AppProvider = (
  {children }: React.PropsWithChildren<object>
) => {

  const [state, dispatch] = useReducer(appStateReducer, appData)
  
  return (
   <AppStateContext.Provider value={{ state, dispatch }}>
     {children}
   </AppStateContext.Provider>
 )
}

