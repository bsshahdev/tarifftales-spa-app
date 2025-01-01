import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";

// Form Mask
import InputMask from "react-input-mask";

const FormMask = () => {

  const [inputValue, setInputValue] = useState(
    {
      ISBN1: "",
      ISBN2: "",
      ISBN3: "",
      IPV4: "",
      Date2: "",
      Date1: "",
      Currency: "",
      Phone: "",
      TAX: "",
      IPV6: ""
    }
  );


  const onHandleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };


  //meta title
  document.title = "Form Mask | Minia - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Form" breadcrumbItem="Form Mask" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title">Imask</h4>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <div className="p-20">
                        <Form action="#">
                          <div className="mb-4">
                            <Label>ISBN 1</Label>
                            <InputMask name="ISBN1" mask="99/99/9999" value={inputValue.ISBN1} onChange={(e) => onHandleChange(e)} className="form-control input-color" >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              e.g "999-99-999-9999-9"
                            </span>
                          </div>

                          <div className="mb-4">
                            <Label>ISBN 2</Label>
                            <InputMask
                              name="ISBN2"
                              mask="999 99 999 9999 99 9"
                              value={inputValue.ISBN2}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              999 99 999 9999 9
                            </span>
                          </div>

                          <div className="mb-4">
                            <Label>ISBN 3</Label>
                            <InputMask
                              name="ISBN3"
                              mask="999/99/999/9999/99/9"
                              value={inputValue.ISBN3}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              999/99/999/9999/9
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>IPV4</Label>
                            <InputMask
                              name="IPV4"
                              mask="999.999.999.999"
                              value={inputValue.IPV4}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              192.168.110.310
                            </span>
                          </div>
                          <div className="mb-0">
                            <Label>IPV6</Label>
                            <InputMask
                              name="IPV6"
                              mask="****:****:****:*:***:****:****:****"
                              value={inputValue.IPV6}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              4deg:1340:6547:2:540:h8je:ve73:98pd
                            </span>
                          </div>
                        </Form>
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="p-20">
                        <Form action="#">
                          <div className="mb-4">
                            <Label>Tax ID</Label>
                            <InputMask
                              name="TAX"
                              mask="99-9999999"
                              value={inputValue.TAX}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              99-9999999
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Phone</Label>
                            <InputMask
                              name="Phone"
                              mask="(999) 999-9999"
                              value={inputValue.Phone}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              (999) 999-9999
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Currency</Label>
                            <InputMask
                              name="Currency"
                              mask="$ 999,999,999.99"
                              value={inputValue.Currency}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              $ 999,999,999.99
                            </span>
                          </div>
                          <div className="mb-4">
                            <Label>Date</Label>
                            <InputMask
                              name="Date1"
                              mask="99/99/9999"
                              value={inputValue.Date1}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              dd/mm/yyyy
                            </span>
                          </div>
                          <div className="mb-0">
                            <Label>Date 2</Label>
                            <InputMask
                              name="Date2"
                              mask="99-99-9999"
                              value={inputValue.Date2}
                              className="form-control input-color"
                              onChange={(e) => onHandleChange(e)}
                            >
                              {(inputProps) => (
                                <Input {...inputProps} type="tel" className="" />
                              )}
                            </InputMask>
                            <span className="font-13 text-muted">
                              dd-mm-yyyy
                            </span>
                          </div>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormMask;
