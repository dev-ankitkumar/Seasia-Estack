import "react-toastify/dist/ReactToastify.css";
import "./spinner.css";
export default function Spinner() {
  return (
    <div className="spinnerDiv">
      <div>
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
