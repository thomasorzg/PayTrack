import React from "react";

interface UsersCardProps {
  totalUsers: number;
  totalAlumnos: number;
}

const UsersCard: React.FC<UsersCardProps> = ({ totalUsers, totalAlumnos }) => (
  <div className="col-xl-4 col-md-6 mb-4">
    <div className="card shadow h-100 py-2 card2">
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs text-success text-uppercase mb-1">
              <b>TOTAL DE USUARIOS</b>
            </div>
            <div className="h5 mb-0 text-gray-800">
              {totalUsers} registrados <i className="fa-regular fa-user"></i>
            </div>
            <div className="h5 mb-0 text-gray-800">
              {totalAlumnos} alumnos registrados <i className="fa-regular fa-user"></i>
            </div>
          </div>
          <div className="col-auto">
            <i className="fa-solid fa-school fa-2x"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UsersCard;
