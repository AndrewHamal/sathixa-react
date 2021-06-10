import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "antd";
import { Tabs } from "antd";

const Notif = () => {
  const history = useHistory();

  return (
    <section className="container text-center px-1 bg-red position-relative ">
      <div className="col-md-12 center-from-top">
        <i className="fas fa-check-circle text-white fa-2x" />
        <p className="text-white">
          Your request for delivery has proceed successfully
        </p>
        <Button type="default">Got It</Button>
      </div>
    </section>
  );
};

export default Notif;
