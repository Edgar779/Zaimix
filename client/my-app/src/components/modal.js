import React, { useState, Component, useEffect } from "react";

import { Button, Modal, Form } from 'react-bootstrap';
import API from "../services/api";
import config from "../config/config";
import ProductRow from "./productRow.component"

const CreateWorker = ({ workers, role }) => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('2');
  const [response, setResponse] = useState('');
  // const [succ, setSucc] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeName = (e) => {
    console.log(e);
  }

  const createUser = async (e) => {

    e.preventDefault();

    setResponse('');

    const formData = {
      name,
      login,
      password,
      role: position
    }

    // console.log(formData);
    const authToken = localStorage.getItem("AuthToken");
    const test = await API.post(`${config.API_URL}/api/auth/signin`, formData, {
      headers: {
        Authorization: authToken,
      },
    })

    setResponse(test.data.message);

  };

  return (
    <>
      <a href="#" variant="primary" onClick={handleShow}>
        Create
        </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{err}</Modal.Title> */}
          <Modal.Title>{response}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="/send">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Login</Form.Label>
              <Form.Control type="text" onChange={(e) => setLogin(e.target.value)} placeholder="Enter Login" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select the position</Form.Label>
              <Form.Control as="select" value={position} onChange={(e) => setPosition(parseInt(e.target.value))}>
                <option value="2">admin</option>
                <option value="3">operator</option>
                <option value="6">curier</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={createUser} block>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Products = ({ bank }) => {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  const [doc, setDocs] = useState('0');
  const [response, setResponse] = useState('');
  const [productData, setProductData] = useState([]);

  // const [succ, setSucc] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async () => {

    const authToken = localStorage.getItem("AuthToken");

    const getProduct = await API.get(`${config.API_URL}/api/bank/getProduct`, {
      params: {
        bankId: bank._id
      },

      headers: {
        Authorization: authToken,
      },
    })
    const products = getProduct.data.data;

    setProductData(products)

    return setShow(true)
  };

  const createDoc = async (e) => {

    e.preventDefault();

    setResponse('');

    const formData = {
      bankId: bank._id,
      productId: id,
      name,
      print: doc
    }

    // console.log(formData);
    const authToken = localStorage.getItem("AuthToken");
    // const getProduct = await API.post(`${config.API_URL}/api/bank/getProduct`, bank._id, {
    //   headers: {
    //     Authorization: authToken,
    //   },
    // })
    // console.log(getProduct);
    const createProduct = await API.post(`${config.API_URL}/api/bank/createProduct`, formData, {
      headers: {
        Authorization: authToken,
      },
    })

    setResponse(createProduct.data.message);

  };

  const editProduct = async (e, data) => {
    const formData = {
      id: data._id,
      name: data.name,
      print: data.print
    }
    const authToken = localStorage.getItem("AuthToken");

    const editProduct = await API.post(`${config.API_URL}/api/bank/updateProduct`, formData, {
      headers: {
        Authorization: authToken,
      },
    })
    const newProduct = editProduct.data.data;

    return newProduct;


  }

  return (
    <>
      <a href="#" variant="primary" onClick={handleShow}>
        Products
        </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{err}</Modal.Title> */}
          <Modal.Title>{response}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="/send">
            <Form.Group>
              <Form.Label>Our Id</Form.Label>
              <Form.Control type="text" onChange={(e) => setId(e.target.value)} placeholder="Enter Id" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Documents</Form.Label>
              <Form.Control as="select" onChange={(e) => setDocs(parseInt(e.target.value))}>
                <option value="0">No</option>
                <option value="1">Yes, Depositor</option>
                <option value="2">Yes, Curier</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={createDoc} block>
              Submit
            </Button>
          </Form>
          <table className="table" style={{ marginTop: "30px" }}>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Doc</th>
            </tr>

            {productData.length > 0 && productData.map((product) => {
              return <ProductRow product={product} editProduct={editProduct} />
            })}
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

const CreateBank = () => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');

  const [officialName, setOfficialName] = useState('');

  const [localName, setLocalName] = useState('');

  const [token, setAuthToken] = useState('');

  const [response, setResponse] = useState('');

  const [active, setActive] = useState(false);




  const handleClose = () => setShow(false);

  const handleShow = async () => {

    return setShow(true)

  }
  const createBank = async (e) => {
    e.preventDefault();

    setResponse('');

    const formData = {
      id,
      officialName,
      localName,
      authToken: token,
      active
    }
console.log(formData);
    const authToken = localStorage.getItem("AuthToken");
  
    const createBank = await API.post(`${config.API_URL}/api/bank/createBank`, formData, {
      headers: {
        Authorization: authToken,
      },
    })

    setResponse(createBank.data.message);
  }

  return (
    <>
      <a href="#" variant="primary" onClick={handleShow}>
        Create
        </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{err}</Modal.Title> */}
          <Modal.Title>{response}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action="/send">
            <Form.Group>
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" onChange={(e) => setId(e.target.value)} placeholder="Enter Id" />
            </Form.Group>

            <Form.Group>
              <Form.Label>OfficialName</Form.Label>
              <Form.Control type="text" onChange={(e) => setOfficialName(e.target.value)} placeholder="Enter OfficialName" />
            </Form.Group>

            <Form.Group>
              <Form.Label>LocalName</Form.Label>
              <Form.Control type="text" onChange={(e) => setLocalName(e.target.value)} placeholder="Enter LocalName" />
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
              <Form.Label>AuthToken</Form.Label>
              <Form.Control type="text" onChange={(e) => setAuthToken(e.target.value)} placeholder="Enter AuthToken" />
            </Form.Group>
            <div className="form-check">
            <input type="checkbox" className="form-check-input" checked={active} id="exampleCheck1" onChange={(e) => {

              setActive(!active);
            }} />
            <label className="form-check-label" htmlFor="exampleCheck1">active</label>
          </div>
            <Button variant="primary" type="button" onClick={createBank} block>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export { CreateWorker, Products, CreateBank }