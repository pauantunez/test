import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Main from "./components/main";
import Welcome from "./components/welcome";
import { SimulatorProvider } from "./AppContext";
import { ResultProvider } from "./ResultContext";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <Suspense fallback="loading">
          <div className="App">
            <SimulatorProvider>
              <ResultProvider>
                <Route exact path="/" render={(props) => <Redirect to="/deDE/welcome" />} />

                <Route exact path="/:lang/main" component={Main} />

                <Route exact path="/:lang/welcome" component={Welcome} />
              </ResultProvider>
            </SimulatorProvider>
          </div>
        </Suspense>
      </Router>
    );
  }
}

export default App;
