import React from 'react'
import styled from 'styled-components'

import { ReactComponent as TrashSVG } from '../assets/images/trash.svg'
import { ReactComponent as CheckedSVG } from '../assets/images/tick.svg'
import { ReactComponent as NotCheckedSVG } from '../assets/images/blank-check-box.svg'




interface IProps{
  isCompleted: boolean
  matchingWithInput: boolean
  children: React.ReactNode
  completeTask: () => void
  deleteTask: ( event: React.MouseEvent<HTMLButtonElement> ) => void // Event for stop propogation
}

const TaskItemComponent: React.FC<IProps> = (
  {deleteTask, completeTask, isCompleted, matchingWithInput, ...props}: IProps
) => {
  return (
    <TaskItem 
      onClick={completeTask} 
      className={" " + (isCompleted ? "completed" : null) + (matchingWithInput ? " match" : null)}
    >
      <CheckboxLabel>
        <Checkbox checked={isCompleted} onChange={completeTask}/>
        {
          isCompleted
          ? <span className="checked">
              <CheckedSVG/>
            </span>
          : <span className="checked-off">
              <NotCheckedSVG/>
            </span>
        }
      </CheckboxLabel>

      {props.children}

      <DeleteButton onClick={ (e: React.MouseEvent<HTMLButtonElement>) => deleteTask(e)}>
        <TrashSVG/>
      </DeleteButton>
    </TaskItem>
  )
}

export default TaskItemComponent



// Styled
const TaskItem = styled.li`
  position: relative;
  width: 100%;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: ${ ({theme}: any) => theme.CLR_cold + "33"};
  transition: .3s;
  user-select: none;
  
  :hover, :focus {
    cursor: pointer;
    background-color: ${ ({theme}: any) => theme.CLR_cold + "cc"};
    color: black;
    svg {
      fill: black;
    }
  }

  :active {
    transition: none;
    background-color: ${ ({theme}: any) => theme.CLR_cold + "77"};
  }
  &.match {
    background-color: ${ ({theme}: any) => theme.CLR_cold + "aa"};
    
    button {
      svg {
        fill: darkred;
      }
    }
  }
    
  &.completed {
    text-decoration: line-through;
    color: ${ ({theme}: any) => theme.CLR_cold + "33"};

    label {
      opacity: 17%;
    }

    :hover {
      color: #00000077;

      label {
        opacity: 37%;
      }
    }
  }
`

const CheckboxLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);

  display: block;
  width: 12px;
  height: 12px;

  cursor: pointer;
  user-select: none;
  
`
const Checkbox = styled.input.attrs( (props: any) => ({
  type: "checkbox"
}))`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  cursor: pointer;

  & ~ span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
  }
`

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  width: 20px;
  height: 20px;
  
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  
  :hover {
    svg {
      transition: .3s;
      fill: #a03a3a;
    }
  }
`