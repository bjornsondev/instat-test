import { Instance, types, applySnapshot } from 'mobx-state-tree'

const TaskItemModel = types
.model("TaskItems", {
  id: types.identifierNumber,
  text: types.string,
  completed: types.boolean
})

const RootModel = types
.model("Root",{
  taskItems: types.array(TaskItemModel),
  filterValue: types.string
})
.actions( state => {
  function createNewTask(text: string) {
    applySnapshot(state, {
      ...state, 
      taskItems: [
        ...state.taskItems,
        { id: Date.now(), text, completed: false }
      ]
    })
  }

  function completeTask(id: number) {
    applySnapshot(state, {
      ...state, 
      taskItems: state.taskItems.map( ( e: ITaskItem ) => {
        if( e.id === id ) e.completed = !e.completed
        return e
      })
    })
  }

  function deleteTask(id: number) {
    applySnapshot(state, {
      ...state, 
      taskItems: state.taskItems.filter( ( e: ITaskItem ) => e.id !== id) 
    })
  }
  
  function setFilterTasks(filterValue: string) {
    applySnapshot(state, {
      ...state,
      filterValue
    })
  }

  return { createNewTask, completeTask, deleteTask, setFilterTasks }
})


export type IRoot = Instance<typeof RootModel>
export type ITaskItem = Instance<typeof TaskItemModel>

export default RootModel