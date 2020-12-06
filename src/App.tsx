import React from 'react'

import { observer, Provider } from 'mobx-react'
import { setupRootStore } from './store/setup'
import { ITaskItem } from './store/store'

import styled from 'styled-components'

import Field from './containers/Field'
import TaskItem from './containers/TaskItem'



interface IAppState {
  rootStore: any
}

@observer
class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      rootStore: null
    }
  }

  componentDidMount = () => {
    const { rootStore } = setupRootStore()
    this.setState({ rootStore })
  } 

  render() {
    const { rootStore } = this.state
    if(!rootStore) return null

    return(
      <Provider rootStore={rootStore}>
        <AppWrapper >

          <Field />

          <TaskList>
            {rootStore.taskItems
              .map((task: ITaskItem) =>
                <TaskItem 
                  key={task.id}    
                  id={task.id}
                  text={task.text} 
                  completed={task.completed}
                  matchingWithInput={
                    task.text.toLowerCase().includes(rootStore.filterValue) 
                    && rootStore.filterValue
                  }
                />
              )
            }
          </TaskList>

        </AppWrapper>
      </Provider>
    )
  }
    
}

export default App;

// Styled
const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 100px;
  width: 500px;
  margin: 0 auto;
`

const TaskList = styled.ul`
  width: 500px;

  li {
    margin-bottom: 20px;
  }
`
