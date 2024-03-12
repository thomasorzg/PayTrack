const Dashboard = () => {
  return (
    <div>
      <div className="row">
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs text-success text-uppercase mb-1">
                    <b>Cuatrimestre cursando</b>
                  </div>
                  <div className="h5 mb-0 text-gray-800">
                    Octavo Cuatrimestre
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-school fa-2x  "></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs text-success text-uppercase mb-1">
                    <b>Total de adeudos</b>
                  </div>
                  <div className="h5 mb-0 text-gray-800">$2,500.00 </div>
                </div>
                <div className="col-auto">
                  <i className="fa-solid fa-money-bill fa-2x  "></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs text-success text-uppercase mb-1">
                    <b>Informacion importante</b>
                  </div>
                  <div className="h5 mb-0 text-gray-800">
                    - Beca benito juarez disponible
                  </div>
                  <div className="h5 mb-0 text-gray-800">
                    - Ruta nueva disponible
                  </div>
                  <div className="h5 mb-0 text-gray-800">
                    - Promociones de pronto pago
                  </div>
                </div>
                <div className="col-auto mb-4">
                  <i className="fa-solid fa-calendar fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-md-6 mb-4">
          <div className="card shadow h-100 py-2 card2">
            <div className="card-body">
              <img src="../../src/assets/images/bg/calendario.png" className="img-fluid" alt="calendario" />

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
