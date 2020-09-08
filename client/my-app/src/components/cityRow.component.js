import React, { useState, Component } from "react";
import { Products } from "./modal"
import { Button, Modal, Form } from 'react-bootstrap';

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

export default function CityRow({ city, editPlace }) {
    const [cityData, setCityData] = useState(city);
    const [editMode, setEditMode] = useState(false);

    return (
        <tr>
            <td>
                {city.City}
            </td>

            <td>{city.Area}</td>

            <td>
            {editMode ? (
          <input
            value={cityData.localName}
            onChange={(e) => {
              setCityData({
                ...cityData,
                comment: e.target.value,
              });
            }}
          />
        ) : (
            cityData.comment
          )}
            </td>

            <td>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control as="select" value={city.delivery} onChange={(e) =>{editPlace(e, city)}}>
                        
                        <option value="0">Unavail</option>

                        <option value="1">Fin</option>
                        <option value="2">Guru</option>

                    </Form.Control>
                </Form.Group>
            </td>

        </tr>
    );
};
 