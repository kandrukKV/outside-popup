import React from 'react';
import {declOfNum} from '../../utils';

import './check-box.css';

const CheckBox = ({checked, onChangeCheckBox, tax, year, disabled = false}) => {

  return(
     <div className="check-box">
        <input
          id={`check-box-${year}`}
          className="check-box__input visually-hidden"
          type="checkbox"
          checked={checked}
          onChange={onChangeCheckBox}
          disabled={disabled}
        />
        <label htmlFor={`check-box-${year}`} className="check-box__label">
          {`${tax} рублей `} <span>{`${year === 2 ? 'во' : 'в'} ${year}-${declOfNum(year, ['ый', 'ой', 'ий'])} год`}</span>
        </label>
     </div>
  )
}

export default CheckBox;
