import React from 'react'
import { inject, observer } from 'mobx-react'
import { IRoot, ITaskItem } from '../store/store'
import TaskItemComponent from '../components/TaskItemComponent'



interface ITaskItemProps extends ITaskItem{
  rootStore?: IRoot
}

@inject('rootStore')
@observer

class TaskItem extends React.Component<ITaskItemProps, {}> {
  
  completeTask(id: number) {
    const { rootStore } = this.props
    if(!rootStore) return null

    rootStore.completeTask(id)
  }

  deleteTask(id: number, event: React.MouseEvent) {
    event.stopPropagation()
    const checkUp = window.confirm("Возможно Вы случайно нажали, дело точно сделано? Удаляем?")

    const { rootStore } = this.props
    if(!rootStore || !checkUp) return null

    rootStore.deleteTask(id)
  }

  render() {
    const { id, text, completed } = this.props

    return (
      <TaskItemComponent
        deleteTask={ (e: React.MouseEvent) => this.deleteTask(id, e) }
        completeTask={ () => this.completeTask(id) }
        isCompleted={completed}
      >{text}</TaskItemComponent>
    )
  }
}

export default TaskItem