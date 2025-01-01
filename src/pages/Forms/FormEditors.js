import React from "react";

import {
    Form,
    Card,
    CardBody,
    Col,
    Row,
    CardHeader,
    Container,
} from "reactstrap";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormEditors = () => {
    //meta title
    document.title = "Form Editors | Minia - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Forms" breadcrumbItem="Form Editors" />
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">react-draft-wysiwyg</h4>
                                    <p className="card-title-desc">
                                        Bootstrap-wysihtml5 is a javascript plugin that makes it
                                        easy to create simple, beautiful wysiwyg editors with the
                                        help of wysihtml5 and Twitter Bootstrap.
                                    </p>
                                </CardHeader>
                                <CardBody>
                                    <Form method="post">
                                        <Editor
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                        />
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default FormEditors;
