import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Patients} from "./Patients";

const PHYSICIANS = gql`
  query GetPhysicians {
    physicians {
      id
      firstName
      lastName
    }
  }
`;


function App() {
  const { loading, error, data } = useQuery(PHYSICIANS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Router>
      <div style={{display: 'flex'}}>
        <div>
          Physicians
          <ul className="list-group list-group-flush">{data.physicians.map((p, i) =>
            <li className="list-group-item" key={i}><Link to={`/${p.id}`}>{p.lastName}, {p.firstName}</Link></li>
          )}</ul>
        </div>
        <Switch>
          <Route path="/:id">
            <Patients/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
