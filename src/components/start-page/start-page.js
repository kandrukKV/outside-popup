import React, {useState} from 'react';

import './start-page.css';
import Modal from "../modal/modal";
import TaxDeduction from "../tax-deduction/tax-deduction";

const StartPage = () => {

  const [modalIsActive, setModalIsActive] = useState(false);

  return (
    <div className="start-page">
      <button
        className="start-page__btn"
        onClick={() => setModalIsActive(true)}
      >Налоговый вычет</button>
      {
        modalIsActive &&
        <Modal closeModal={() => setModalIsActive(false)}>
          <TaxDeduction/>
        </Modal>
      }
    </div>
  )
}
export default StartPage;
