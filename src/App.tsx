import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import FullLayout from "./components/layout/layout";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="dark">
      <Router>
        <Routes>
          {routes.map((route, index) => {
            // Obtén el componente para la ruta actual.
            const RouteComponent = route.element;

            // Construye el elemento de la ruta, envolviéndolo en PrivateRoute si es necesario.
            const routeElement = route.isPrivate ? (
              <PrivateRoute>
                <RouteComponent />
              </PrivateRoute>
            ) : (
              <RouteComponent />
            );

            // Si la ruta debe usar FullLayout, renderiza dentro de este.
            // De lo contrario, renderiza el componente directamente.
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.fullLayout ? (
                    <FullLayout>{routeElement}</FullLayout>
                  ) : (
                    routeElement
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
