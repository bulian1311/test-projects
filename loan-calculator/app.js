document.querySelector('#loan-form').addEventListener('submit', event => {
  document.querySelector('#loading').style.display = 'block';
  document.querySelector('#results').style.display = 'none';

  setTimeout(calculateResults, 1000);

  event.preventDefault();
});

function calculateResults() {
  const amount = document.getElementById('amount');
  const interested = document.getElementById('interested');
  const years = document.getElementById('years');
  const montlyPayment = document.getElementById('montly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interested.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const montly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(montly)) {
    montlyPayment.value = montly.toFixed(2);
    totalPayment.value = (montly * calculatedPayments).toFixed(2);
    totalInterest.value = (montly * calculatedPayments - principal).toFixed(2);

    document.querySelector('#results').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  } else {
    showErrorMessage('Введите значения!');
  }
}

function showErrorMessage(error) {
  document.querySelector('#loading').style.display = 'none';
  document.querySelector('#results').style.display = 'none';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
}
