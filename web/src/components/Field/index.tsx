import React from 'react';

import { Container } from './styles';

interface FieldProps {
  name: string,
  value?: string | number | string[] | undefined,
  labelText: string,
  type?: string,
  options?: string[],
  onChange?: ((event: React.ChangeEvent<any>) => void)  | undefined
}

const Field: React.FC<FieldProps> = (props) => {
  return (
    <Container className='field'>
      <label htmlFor={props.name}>{props.labelText}</label>

      {props.type === 'select' ?
        <select
          name={props.name}
          id={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options ?
            props.options.map((op, index) =>
              (
                <option key={index} value={op}>
                  {op}
                </option>
              )
            )
            : undefined
          }
        </select> :
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          id={props.name}
          onChange={props.onChange}
        />}

    </Container>
  );
}

export default Field;
