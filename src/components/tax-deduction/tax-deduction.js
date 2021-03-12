import React, {PureComponent} from 'react';

import './tax-deduction.css';
import CheckBox from "../check-box/check-box";
import {calculateTax} from "../../utils";
import {ENTER_KEY} from "../../const";

class TaxDeduction extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      salary: '',
      isSalaryError: false
    }
    this.textInputKeyDownHandler = this.textInputKeyDownHandler.bind(this);
    this.textInputOnFocusHandler = this.textInputOnFocusHandler.bind(this);
    this.addBtnOnClickHandler = this.addBtnOnClickHandler.bind(this);
    this.calcBtnOnClickHandler = this.calcBtnOnClickHandler.bind(this);
    this.textInputOnChangeHandler = this.textInputOnChangeHandler.bind(this);
  }


  calculate() {
    if (this.state.salary === '') {
      this.setState({
        isSalaryError: true
      })
    } else {
      this.setState({
        payments: calculateTax(this.state.salary),
        salary: `${parseInt(this.state.salary, 10).toLocaleString('ru-RU')} ₽`,
        isSalaryError: false
      })
    }
  }

  textInputKeyDownHandler(evt) {
    if (evt.key === ENTER_KEY) {
      this.calculate();
    }
  }

  textInputOnChangeHandler(evt) {
    this.setState({
      salary: evt.target.value
    })
  }

  textInputOnFocusHandler() {
    this.setState({salary: ''})
  }

  addBtnOnClickHandler() {
    this.setState({
      isSalaryError: this.state.salary === ''
    })
  }

  calcBtnOnClickHandler() {
    this.calculate();
  }

  render() {

    const {isSalaryError, salary, payments} = this.state;

    return (
      <div className="tax-deduction">
        <h3 className="tax-deduction__title">Налоговый вычет</h3>
        <p className="tax-deduction__desc">
          {`Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.`}
        </p>

        <div className="tax-deduction__wrap">
          <label className={`tax-deduction__label ${isSalaryError ? 'tax-deduction__label--error' : ''}`} htmlFor="cost">
            <p className="tax-deduction__label-inner">Ваша зарплата в месяц</p>
            <input
              className="tax-deduction__cost"
              id="cost"
              type="text"
              placeholder="Введите данные"
              value={salary.toLocaleString('ru-RU')}
              onChange={this.textInputOnChangeHandler}
              onKeyDown={this.textInputKeyDownHandler}
              onFocus={this.textInputOnFocusHandler}
            />
          </label>
          <button className="tax-deduction__cost-btn" onClick={this.calcBtnOnClickHandler}>Рассчитать</button>
        </div>

        <div className="tax-deduction__wrap">
          {
            payments.length > 0
            && (<h4 className="tax-deduction__subtitle">Итого можете внести в качестве досрочных:</h4>)
          }
          {
            payments.map(item =>
              <CheckBox
                key={`key-${item.year}`}
                tax={item.tax}
                year={item.year}
              />)
          }
        </div>

        <div className="tax-deduction__tags">
          <p className="tax-deduction__tags-title">Что уменьшаем?</p>
          <div className="tax-deduction__radio-wrap">
            <input className="tax-deduction__radio visually-hidden" id="what-1" type="radio" name="what" defaultChecked={true}/>
            <label className="tax-deduction__radio-label" htmlFor="what-1">Платеж</label>
            <input className="tax-deduction__radio visually-hidden" id="what-2" type="radio" name="what"/>
            <label className="tax-deduction__radio-label" htmlFor="what-2">Срок</label>
          </div>
        </div>

        <button
          className="tax-deduction__add-btn"
          onClick={this.addBtnOnClickHandler}
        >Добавить</button>
      </div>
    )
  }
}

export default TaxDeduction;
