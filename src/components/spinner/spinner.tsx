type SpinnerProps = {
  text?: string;
};

function Spinner({ text = 'Loading offers, please wait...' }: SpinnerProps) {
  return (
    <div className="spinner">
      <div className="spinner__circle" />
      <p className="spinner__text">{text}</p>
    </div>
  );
}

export default Spinner;
