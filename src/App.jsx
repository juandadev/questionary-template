import React, { useState } from "react";
import { Navbar, Container, Form, Button, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const diseases = {
  1: [
    "diabetes",
    "sed",
    "miccion",
    "borros",
    "vista",
    "peso",
    "hambre",
    "llaga",
    "encia",
    "hormigueo",
    "entume",
  ],
  2: [
    "covid-19",
    "fiebre",
    "tos",
    "cansancio",
    "garganta",
    "diarrea",
    "conjuntivitis",
    "cabeza",
    "olfato",
    "gusto",
    "respirar",
    "presion",
  ],
  3: [
    "obesidad",
    "dormir",
    "espalda",
    "articulaciones",
    "sudoracion",
    "calor",
    "pliegues",
    "cutaneos",
    "fatiga",
    "depresion",
  ],
  4: [
    "estrés, diarrea o estreñimiento",
    "memoria",
    "achaques",
    "cabeza",
    "energia",
    "concentracion",
    "sexual",
    "cuello",
    "mandibula",
    "cansancio",
  ],
  5: [
    "bronquitis, tos",
    "mucosidad",
    "transparente",
    "blanc",
    "amarill",
    "verde",
    "sangre",
    "fatiga",
    "respirar",
    "escalofrios",
    "pecho",
  ],
};

function App() {
  const [formData, setFormData] = useState({
    symptoms: "",
  });
  const [diagnostic, setDiagnostic] = useState("");
  const [modal, setModal] = useState(false);
  const [validated, setValidated] = useState(false);

  function deleteAccents(text) {
    text = text.replace(/[Á]/g, "A");
    text = text.replace(/[á]/g, "a");
    text = text.replace(/[É]/g, "E");
    text = text.replace(/[é]/g, "e");
    text = text.replace(/[Í]/g, "I");
    text = text.replace(/[í]/g, "i");
    text = text.replace(/[Ó]/g, "O");
    text = text.replace(/[ó]/g, "o");
    text = text.replace(/[Ú]/g, "U");
    text = text.replace(/[ú]/g, "u");

    return text.toLowerCase();
  }

  function getWinner(text) {
    const results = [];

    for (let i = 1; i < 6; i++) {
      const symptoms = diseases[i];
      const reducer = (accumulator, currentValue) =>
        text.includes(currentValue) ? accumulator + 1 : accumulator;

      results.push([symptoms[0], symptoms.reduce(reducer, 0)]);
    }

    const maxCoincidence = Math.max.apply(
      Math,
      results.map((item) => item[1])
    );
    const winner = results.filter((item) => maxCoincidence === item[1]);

    return winner[0][0];
  }

  function handleChange(e) {
    const { value, name } = e.target;
    const data = {};

    data[name] = value;
    setFormData((state) => ({ ...state, ...data }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const { symptoms } = formData;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setDiagnostic(getWinner(deleteAccents(symptoms)));
      setModal(true);
    }

    setValidated(true);
  }

  return (
    <div className="app">
      <Navbar expand="lg" fixed="top" className="header">
        <Container>
          <Navbar.Brand href="#home">VSR</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="main">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Síntomas generales</Form.Label>

            <Form.Control
              required
              name="symptoms"
              as="textarea"
              rows={3}
              value={formData.symptoms}
              onChange={handleChange}
            />

            <Form.Control.Feedback type="invalid">
              Por favor completa este campo.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            Generar diagnóstico
          </Button>
        </Form>
      </Container>

      <Navbar expand="lg" className="footer">
        <Container>
          <Navbar.Brand href="#home">VSR</Navbar.Brand>
        </Container>
      </Navbar>

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header>
          <Modal.Title>Resultado del diagnóstico</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="diagnostic">{diagnostic}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
