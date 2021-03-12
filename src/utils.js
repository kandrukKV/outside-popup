import {MAX_TAX, TAX_IN_PERCENT, MONTHS_OF_THE_YEAR} from './const';

export const calculateTax = (salary) => {

  const cost = (parseInt(salary, 10) * MONTHS_OF_THE_YEAR) * TAX_IN_PERCENT;
  const numberOfPayment = Math.ceil(MAX_TAX / cost);
  const payments = [];
  let maxTax = MAX_TAX;

  for (let i = 0; i < numberOfPayment; i++) {
    let tax = maxTax < cost ? maxTax : cost;
    maxTax = maxTax - cost;
    payments.push({
      year: i + 1,
      tax: tax.toLocaleString('ru-RU')
    });
  }
  return payments;
}

export const declOfNum = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;

  if(value >= 9 && value <= 20){
    return words[0];
  }

  if(num === 0 ||num === 1 || num === 4 || num === 5) {
    return words[0];
  }

  if(num === 3) {
    return words[2];
  }

  if(num === 2 || (num >= 6 && num <= 8)) {
    return words[1];
  }
}
