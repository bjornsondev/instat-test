import React from 'react'
import { inject, observer } from 'mobx-react'
import { IRoot } from '../store/store'
import FieldComponent from '../components/FieldComponent'



interface IFieldProps{
  rootStore?: IRoot
}

interface IFieldState{
  value: string
}

@inject("rootStore")
@observer

class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps){
    super(props)

    this.state = {
      value: ""
    }
  }

  addNewTask() {
    const { rootStore } = this.props
    if(!rootStore || !this.state.value) return null

    rootStore.createNewTask(this.state.value)
    this.setState({ value: '' })
    rootStore.setFilterTasks('')
  }
  
  deleteSomeTasks() {
    const { rootStore } = this.props
    const checkUp = window.confirm("Возможно Вы случайно нажали, дело точно сделано? Удаляем?")

    if(!rootStore || !this.state.value || !checkUp) return null

    rootStore.deleteSomeTasks()
    this.setState({ value: '' })
    rootStore.setFilterTasks('')
  }
  
  onChangeValue(value: string) {
    const { rootStore } = this.props
    if(!rootStore) return null
    
    this.setState({ value })
    rootStore.setFilterTasks(value)
  }

  render() {
    return (
      <FieldComponent
        placeholder="Давайте что нибудь сделаем..."
        value={this.state.value}

        onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
          this.onChangeValue(e.currentTarget.value)
        }}

        onKeyUp={ (e: React.KeyboardEvent<HTMLInputElement>) => {
          e.key === "Enter" && this.addNewTask()
        }}
        
        onEnterClick={ () => this.addNewTask() }
        onDeleteClick={ () => this.deleteSomeTasks() }
      />
    )
  }
}

export default Field