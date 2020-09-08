import React, { useState, Component } from "react";
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

const array = [
  {
    1: "superadmin",
    2: "admin",
    3: "operator",
    4: "verificator",
    5: "logist",
    6: "curier",
  },
];
export default function UserRow({ worker, editWorker }) {
  const [workerData, setWorkerData] = useState(worker);
  const [editMode, setEditMode] = useState(false);


  return (
    <tr>
      <td>
        {editMode ? (
          <Form.Group as={Row} controlId="formHorizontalEmail">

            <Col sm={10}>
              <Form.Control value={workerData.name} onChange={(e) => {
                setWorkerData({
                  ...workerData,
                  name: e.target.value,
                });
              }} />
            </Col>
          </Form.Group>
          // <input
          //   value={workerData.name}
          //   onChange={(e) => {
          //     setWorkerData({
          //       ...workerData,
          //       name: e.target.value,
          //     });
          //   }}
          // />
        ) : (
            workerData.name
          )}
      </td>
      <td>
        {editMode ?
          <Form.Group as={Row} controlId="formHorizontalEmail">

            <Col sm={10}>
              <Form.Control value={workerData.login} onChange={(e) => {
                setWorkerData({
                  ...workerData,
                  login: e.target.value,
                });
              }} />
            </Col>
          </Form.Group>
          // <input value={workerData.login}  onChange={(e) => {
          //       setWorkerData({
          //         ...workerData,
          //         login: e.target.value,
          //       });
          //     }} />
          : workerData.login}
      </td>

      <td>

        {editMode ? (
          <Form.Group as={Col} controlId="formGridState">
            <Form.Control as="select" defaultValue={workerData.role} onChange={(e) => {
              setWorkerData({
                ...workerData,
                role: parseInt(e.target.value),
              });
            }}>
              <option value="2">admin</option>
              <option value="3">operator</option>
              <option value="6">curier</option>

            </Form.Control>
          </Form.Group>
          // <select value={workerData.role} onChange={(e) => {
          //    setWorkerData({
          //     ...workerData,
          //     role: parseInt(e.target.value),
          //   });
          // }}>
          //         <option value="2">admin</option>
          //         <option value="3">operator</option>
          //         <option value="6">curier</option>
          //       </select>
        )
          :
          (array[0][workerData.role])

        }

      </td>
      <td>
      {editMode ? (
          <Form.Group as={Row} controlId="formHorizontalEmail">

          <Col sm={10}>
            <Form.Control placeholder="enter password" onChange={(e) => {

              setWorkerData({
                ...workerData,
                password: e.target.value,
              });
            }} />
          </Col>
        </Form.Group>
        // <td>
        //   <input type="text" placeholder="Password" onChange={(e) => {
        //     setWorkerData({
        //       ...workerData,
        //       password: e.target.value,
        //     });
        //   }} />
        // </td>
      ) : null}

</td>
      <td>
        <a
          herf="#"
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={(e) => {
            if (editMode) {
              console.log(workerData);
              editWorker(e, workerData);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
        >
          {editMode ? "Save" : "Edit"}
        </a>
      </td>
    </tr>
  );
  
};