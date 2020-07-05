import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button, Modal, ModalHeader,
     ModalBody, Label, Col, } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


import { Link } from 'react-router-dom';
 
    function RenderDish({dish}){
        if (dish.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (dish.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{dish.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish.dish != null)
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        else
            return(
                <div></div>
            );
    }
    function RenderComments({comments, addComment, dishId}) {

        return (
                <div>
                        <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
                </div>

        );
    }


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class DishDetail extends Component{
        constructor(props){
            super(props);

            this.state = {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }


        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dish.id, values.rating, values.author, values.comment);
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
                            <RenderDish dish={this.props} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments}
                                        addComment={this.props.addComment}
                                        dishId={this.props.dish.id} /><br></br>
                            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={(values) => this.handleSubmit(values)}>
                                        <Label htmlFor="rating" md={2}>Rating ( 1-5 )</Label>
                                        <Col md={12}>
                                            <Control.select model=".rating"
                                                id="rating"
                                                name="rating"
                                                type="number"
                                                className="form-control"
                                                >
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                        <Label htmlFor="author" md={2}>Author</Label>
                                        <Col md={12}>
                                            <Control.text model=".author" id="author" name="author"
                                                placeholder="Author"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        </Col>
                                        <Label htmlFor="comment" md={2}>Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="6"
                                                placeholder="Your Comment goes Here"
                                                className="form-control" />
                                        </Col>
                                        <br></br>
                                        <Col md={{size:10, offset: 2}}>
                                            <Button type="submit" color="primary">
                                            Add Comment
                                            </Button>
                                        </Col>
                                    </Form>
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