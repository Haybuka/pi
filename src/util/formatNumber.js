const formatNumber = (number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NGN',
  }).format(number);


export default formatNumber