interface Props {
  visible: boolean;
}

const Preloader = ({ visible }: Props) => {
  if (!visible) return null;

  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
