import React from "react";

const UpdatesCard = () => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>ACTUALIZACIONES PENDIENTES</b>
            </div>
            <div className="h5 mb-0 text-gray-800">
              <span>
                Versión actual: <b className="text-primary">1.0.0</b>
              </span>
            </div>
            <div className="mt-2">
              <span>
                <b className="text-primary">3</b> actualizaciones pendientes
              </span>
            </div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-arrow-up-a-z fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UpdatesCard;
