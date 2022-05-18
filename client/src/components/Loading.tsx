import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading_spinner">
      <Spinner animation="border" role="status">
        <span className="sr-only">Uploading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
