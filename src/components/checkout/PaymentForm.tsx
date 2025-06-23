const PaymentForm = () => {
  return (
    <form>
      <label>Card Number</label>
      <input type="text" placeholder="1234 5678 9012 3456" />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
