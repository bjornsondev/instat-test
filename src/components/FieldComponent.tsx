import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { ReactComponent as SendSVG } from '../assets/images/send.svg'



interface IFieldComponentProps extends InputHTMLAttributes<HTMLInputElement>{
  onEnterClick: () => void
}

const FieldComponent: React.FC<IFieldComponentProps> = ({ onEnterClick, ...props }) => {
  return (
      <FieldWrapper>
        <Field {...props}/>

        {
          props.value 
          ? <EnterButton onClick={onEnterClick}>
              <SendSVG/>
            </EnterButton> 
          : null
        }
      </FieldWrapper>
  )
}

export default FieldComponent


// Styled
const Field = styled.input`
  display: block;
  padding: 5px;

  border: none;
  border-bottom: 1px solid ${ ({theme}: any) => theme.CLR_cold + "55"};
  background-color: transparent;
  color: inherit;
  font-family: inherit;
  transition: .3s;
  
  
  width: 500px;
  height: 30px;
  font-size: 20px;
  padding-right: 30px;
  
  ::placeholder {
    font-size: 16px;
    color: inherit;
    opacity: 0.5;
    transition: .3s;
  }
  :focus {
    outline: none;
    border-bottom: 1px solid ${ ({theme}: any) => theme.CLR_cold};
  }
  :focus::placeholder {
    opacity: 0;
  }
`

const FieldWrapper = styled.div`
  position: relative;
  height: 30px;
  margin-bottom: 30px;

`

const EnterButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  :focus, :hover {
    outline: none;
    opacity: 0.7;
  }
  svg {
    transform: rotateZ(45deg);
  }
`