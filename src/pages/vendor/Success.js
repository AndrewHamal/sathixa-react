import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Success = () => {
  const history = useHistory();

  return (
    <section className="container text-center px-1 bg-red position-relative d-flex vh-100">
      <div className="col-md-12 center-from-top m-auto">
        <i className="fas fa-check-circle text-white fa-2x mb-3"></i>
        <p className="text-white">
          Your request for delivery has proceed successfully
        </p>
        <button
                     className="btn btn-primary btn-withdraw bg-white text-red mt-5"
          onClick={(e) => history.push("/package")}
        >
          Got It
        </button>
      </div>
    </section>
  );
};

export default Success;
