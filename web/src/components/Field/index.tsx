import React from 'react';

import { Container } from './styles';

interface FieldProps {
  name: string,
  labelText: string
  type?: string
  options?: string[]
}

const Field: React.FC<FieldProps> = (props) => {
  return (
    <Container className='field'>
      <label htmlFor={props.name}>{props.labelText}</label>

      {props.type === 'select' ?
        <select
          name={props.name}
          id={props.name}
        >
          {props.options ?
            props.options.map((op, index) => {
              return (
                <option
                  key={index}
                  value={index}
                >
                  {op}
                </option>
              )
            })
            : undefined
          }
        </select> :
        <input
          type={props.type}
          name={props.name}
          id={props.name}
        />}

    </Container>
  );
}

export default Field;
