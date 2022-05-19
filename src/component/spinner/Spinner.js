import "react-toastify/dist/ReactToastify.css";
import "./spinner.css";
export default function Spinner() {
  return (

    <div>
    <div class="multi-spinner-container">
      <div class="multi-spinner">
        <div class="multi-spinner">
          <div class="multi-spinner">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    // <div className="spinnerDiv">
    //   <div>
    //     <div className="d-flex justify-content-center">
    //       <div className="spinner-border nb-spinner" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
