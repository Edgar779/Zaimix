import React, { useState, Component } from "react";
import { Products } from "./modal"

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
export default function BankRow({ bank, editBank }) {
  const [bankData, setBankData] = useState(bank);
  const [editMode, setEditMode] = useState(false);
  return (
    <tr>
      <td>
        {bankData.id}
      </td>

      <td>
        {editMode ? (
          <input
            value={bankData.localName}
            onChange={(e) => {
              setBankData({
                ...bankData,
                localName: e.target.value,
              });
            }}
          />
        ) : (
            bankData.localName
          )}
      </td>
      <td>
        {editMode ? (
          <input
            value={bankData.officialName}
            onChange={(e) => {
              setBankData({
                ...bankData,
                officialName: e.target.value,
              });
            }}
          />
        ) : (
            bankData.officialName
          )}
      </td>
      <td>
        {editMode ? (
          <input
            value={bankData.authToken}
            onChange={(e) => {
              setBankData({
                ...bankData,
                authToken: e.target.value,
              });
            }}
          />
        ) : (
            bankData.authToken
          )}
      </td>
      <td>
        {editMode ? (
          <div className="form-check">
            <input type="checkbox" className="form-check-input" checked={bankData.active} id="exampleCheck1" onChange={(e) => {

              setBankData({
                ...bankData,
                active: !bankData.active,
              });
            }} />
            <label className="form-check-label" htmlFor="exampleCheck1">active</label>
          </div>
        ) : (
            bankData.active
          )}
      </td>
      <td>
        <a
          herf="#"
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={(e) => {
            if (editMode) {
              editBank(e, bankData);
              setEditMode(false);
            } else {
              setEditMode(true);
            }
          }}
        >
          {editMode ? "Save" : "Edit"}
        </a>
      </td>
      <td>

        <Products bank={bank} />

      </td>
    </tr>
  );
};



//    <td>
//           {editMode ? <input value={workerData.login}  onChange={(e) => {
//                 setBankData({
//                   ...workerData,
//                   login: e.target.value,
//                 });
//               }} /> : workerData.login}
//         </td>

//         <td>

//     {editMode ? (<select value={workerData.role} onChange={(e) => {
//        setBankData({
//         ...workerData,
//         role: parseInt(e.target.value),
//       });
//     }}>
//             <option value="2">admin</option>
//             <option value="3">operator</option>
//             <option value="6">curier</option>
//           </select>) : 
//           (array[0][workerData.role])

//     }

//   </td>
//   {editMode ? (
//     <td>
//       <input type="text" placeholder="Password" onChange={(e) => {
//            setBankData({
//             ...workerData,
//             password: e.target.value,
//           });
//       }} />
//     </td>
//   ): null}


        // <td>
        //   <a
        //     herf="#"
        //     style={{ color: "#007bff", cursor: "pointer" }}
        //     onClick={(e) => {
        //       if (editMode) {
        //         editWorker(e, workerData);
        //         setEditMode(false);
        //       } else {
        //         setEditMode(true);
        //       }
        //     }}
        //   >
        //     {editMode ? "Save" : "Edit"}
        //   </a>
        // </td> 