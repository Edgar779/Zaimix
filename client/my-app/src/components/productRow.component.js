import React, { useState, Component } from "react";
const array = [
  {
    0: "no need",
    1: "Yes depozitor",
    2: "Yes Curier",
  },
];
export default function ProductRow({ product, editProduct }) {
  const [productData, setProductData] = useState(product);
  const [editMode, setEditMode] = useState(false);
  return (
    <tr>
      <td>{productData.id}</td>
      <td>
        {editMode ? (
          <input
            value={productData.name}
            onChange={(e) => {
              setProductData({
                ...productData,
                name: e.target.value,
              });
            }}
          />
        ) : (
            productData.name
          )}
      </td>
      <td>
        {editMode ? (
          <select onChange={(e) => {
            setProductData({
              ...productData,
              print: parseInt(e.target.value),
            });
          }}
            value={productData.print}
          >
            <option value="0">No need</option>
            <option value="1">Yes depozitor</option>
            <option value="2">Yes Curier</option>
          </select>
        ) : (
            array[0][productData.print]
          )}
      </td>
      <td>
        <a
          herf="#"
          style={{ color: "#007bff", cursor: "pointer" }}
          onClick={(e) => {
            if (editMode) {

              editProduct(e, productData);
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







//   <td>
//   {editMode ? (
//     <input
//       value={workerData.name}
//       onChange={(e) => {
//         setWorkerData({
//           ...workerData,
//           name: e.target.value,
//         });
//       }}
//     />
//   ) : (
//     workerData.name
//   )}
// </td>
// <td>
//   {editMode ? <input value={workerData.login}  onChange={(e) => {
//         setWorkerData({
//           ...workerData,
//           login: e.target.value,
//         });
//       }} /> : workerData.login}
// </td>

// <td>

// {editMode ? (<select value={workerData.role} onChange={(e) => {
// setWorkerData({
// ...workerData,
// role: parseInt(e.target.value),
// });
// }}>
//     <option value="2">admin</option>
//     <option value="3">operator</option>
//     <option value="6">curier</option>
//   </select>) : 
//   (array[0][workerData.role])

// }

// </td>
// {editMode ? (
// <td>
// <input type="text" placeholder="Password" onChange={(e) => {
//    setWorkerData({
//     ...workerData,
//     password: e.target.value,
//   });
// }} />
// </td>
// ): null}


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