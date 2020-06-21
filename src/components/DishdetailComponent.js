import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader,
     ModalBody, Label, Col, } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Link } from 'react-router-dom';
 
    function RenderDish({dish}){
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}) {
        const cmmt = comments.map((comment) => {
            return (
                    <div>
                        <p>{comment.comment}</p>
                        <p>
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', 
                                        { year: 'numeric', month: 'short', day: '2-digit'})
                                        .format(new Date(Date.parse(comment.date)))}
                        </p>
                    </div>
            );
        });
        return (
                <div>
                    <h4>Comments</h4>
                    <p>
                        {cmmt}
                    </p>
                </div>

        );
    }


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    const maxValue = (len) => (val) => !(val) || (val <= len);
    const minValue = (len) => (val) => val && (val >= len);

    class DishDetail extends Component{
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }


        handleSubmit(values) {
            this.toggleModal();
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
        }

        render() {
            if(this.props.dish != null){
                return (
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{this.props.dish.name}</h3>
                                <hr />
                            </div>                
                        </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} /><br></br>
                            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                                <Label htmlFor="rating" md={2}>Rating</Label>
                                                <Col md={12}>
                                                    <Control.select
                                                        model=".rating"
                                                        id=".rating"
                                                        name=".rating"
                                                        className="form-control"
                                                        >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </Control.select>
                                                </Col>
                                                <Label htmlFor="username" md={2}>Username</Label>
                                                <Col md={12}>
                                                    <Control.text model=".username" id="username" name="username"
                                                        placeholder="Author"
                                                        className="form-control"
                                                        validators={{
                                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                                        }}
                                                        />
                                                    <Errors
                                                        className="text-danger"
                                                        model=".username"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required',
                                                            minLength: 'Must be greater than 2 characters',
                                                            maxLength: 'Must be 15 characters or less'
                                                        }}
                                                    />
                                                </Col>
                                                <Label htmlFor="message" md={2}>Comment</Label>
                                                <Col md={12}>
                                                    <Control.textarea model=".message" id="message" name="message"
                                                        rows="6"
                                                        placeholder="Your Comment goes Here"
                                                        className="form-control" />
                                                </Col>
                                            {/* <Button type="submit" value="submit" color="primary">Add</Button> */}
                                            <br></br>
                                            <Col md={{size:10, offset: 2}}>
                                                <Button type="submit" color="primary">
                                                Add Comment
                                                </Button>
                                            </Col>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                    </div>
                );
            } else {
                return (
                    <div>
                    </div>
                );
            }
        }
    }
export default DishDetail;