import React from 'react';
import {useParams} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const PATIENTS = gql`
  query GetPatients($id: Int!) {
    physician(id: $id) {
      firstName
      lastName
      email
      patients {
        id
        name
        time
        kind
      }
    }
  }
`;

export function Patients() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(PATIENTS, {variables: {id: Number(id)}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const {physician} = data;
  const {patients} = physician;
  
  return (
    <div>
      Dr {physician.firstName} {physician.lastName}<br/>
      {physician.email}
      <table className="table">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Time</th>
          <th scope="col">Kind</th>
        </tr>
          {patients.map((p,i) =>
          <tr scope="row" id={i}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.time}</td>
            <td>{p.kind}</td>
          </tr>
          )}
      </table>
    </div>
  )
}