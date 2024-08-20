import React from "react";

const SystemStatusCard = () => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>ESTADO DEL SISTEMA</b>
            </div>
            <div className="h5 mb-0 text-gray-800">
              Funcionando sin interrupciones{" "}
              <i className="fa-solid fa-check-circle text-success"></i>
            </div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-heart-pulse fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SystemStatusCard;
