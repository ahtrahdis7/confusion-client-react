import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish: this.props.dish
        }
    }
    renderDishComments(dish){
        if(dish != null){
            const cmmt = dish.comments.map((comments) => {
                return (
                        <div>
                            <p>{comments.comment}</p>
                            <p>-- {comments.author}, {new Date(comments.date).toUTCString()}</p>
                        </div>
                );
            });
            return (
                <Card>
                    <h4>Comments</h4>
                    <CardText>{cmmt}</CardText>
                </Card>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
    renderDish(dish) {
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
    render(){
        return (
            
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDishComments(this.props.dish)}
                </div>
            </div>  
            
        );
    }
}
export default DishDetail;