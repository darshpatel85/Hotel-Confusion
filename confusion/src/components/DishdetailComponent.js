import React, { Component } from 'react';
import { 
    Card, CardImg, CardText, CardBody, Button,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Row
} from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelOpen : false,
        }
        this.toggleModel = this.toggleModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModel = () => {
        this.setState({
            isModelOpen : !this.state.isModelOpen,
        })
    }
    handleSubmit = (vals) => {
        this.props.postComment(this.props.dishId, vals.rating, vals.author, vals.comment);
        this.toggleModel();
    }
    render() {
        return (
            <>
                <Modal toggle={this.toggleModel} isOpen={this.state.isModelOpen}>
                    <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-12 col-md-12">
                            <LocalForm onSubmit={(vals) => { this.handleSubmit(vals) }}>
                                <Row className="form-group" md={12}>
                                    <label htmlFor="rating">Rating</label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group" md={12}>
                                    <label htmlFor="rating">Your Name</label>
                                    <Control.text model=".name"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Row>
                                <Row className="form-group" md={12}>
                                    <label htmlFor="rating">Comment</label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                </Row>
                                <Button className="Submit" color="primary" type="submit">
                                    Submit</Button>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            <Button outline onClick={this.toggleModel}>
                <span className="fa fa-pencil"></span>Submit Comment
            </Button>
            </>
            );
    }
}
const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.err) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.err}</h4>
                </div>
            </div>
            )
    }
    else if (props.dish == null) {
        return <div></div>
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />
                    </div>
                </div>
            </div>
        );
    }
}
const RenderDish = ({ dish }) => {
        if(dish != null) {
            return (
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>

            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

const RenderComments = ({ comments, postComment, dishId }) => {
        if(comments==null) {
            return(<div></div>);
        }
        else {
    
            const comm = <Stagger in>
                {comments.map((comment) => {
                    return (
                        <Fade in>
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        </Fade>
                    );
                })}
            </Stagger>
            return(
                <div>
                    <h4>Comments</h4>
                    <div className="list-unstyled">{comm}</div>
                    <CommentForm dishId={dishId} postComment ={postComment} />
                </div>
            );
        }
    }


export default DishDetail;