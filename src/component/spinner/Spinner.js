import "react-toastify/dist/ReactToastify.css";
import "./spinner.css";
export default function Spinner() {
  return (
    <div className="spinnerDiv">
      <div>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
