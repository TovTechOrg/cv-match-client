import React, { FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/esm/Container";
type Props = {};

const Contact = (props: Props) => {
  const [validated, setValidated] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    if (form.checkValidity() === false) {
      console.log("asdf");
      setValidated(true);
    } else {
      setValidated(false);
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  }

  return (
    <Container className="Connect">
      <h2 className="text-center mb-5">
        <span>Connect With Us</span>
      </h2>
      <Row>
        <Col lg={4} sm={12}>
          <div className="text-white fw-bolder d-flex flex-column">
            {/* <div className="mt-3 ">
              <h4>Mailing Address:</h4>
              <p>Hata'as 33 Givatayim, Isreal</p>
            </div> */}
            <div className="mt-3">
              <h4 style={{color:'white'}}>Email Address:</h4>
              {/* <p>info@pythia-match.com</p> */}
              <p>talya@tovtech.org</p>
            </div>
            <div>
              <h4 style={{color:'white'}}>Phone Number:</h4>
              <p>+972-58-4431931</p>
            </div>
          </div>
        </Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3 ">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="name"
                  defaultValue="Mark"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  please enter name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>subject</Form.Label>
                <Form.Control type="text" placeholder="your subject" required />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>message</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="your subject"
                  required
                />
              </Form.Group>
            </Row>
            <div className="mt-4 ms-auto d-flex ">
              <Button type="submit" className="button ms-auto">
                Send Message
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
