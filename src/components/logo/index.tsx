import './index.scss';
function Logo(props: { file: string }) {
  return (
    <img
      className="logo"
      color="black"
      src={`/assets/logo/${props.file}`}
      alt="logo"
    />
  );
}

export default Logo;
