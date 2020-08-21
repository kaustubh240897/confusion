import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,  Modal, ModalHeader, ModalBody, Row, Col, Label, Button } from 'reactstrap';
//import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
    
 function RenderDish({dish}) {
       
            return(
                 <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle> {dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </FadeTransform>
                    );

        
       
    }
function RenderComments({comments, postComment, dishId}){
    
    var commentsList = comments.map(comment => {
        return( 
             <Stagger in>
                  
            <li key={comment.id}>
                 <Fade in>
                {comment.comment}
                <br/> <br/>
                -- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(comment.date)))}
                <br/> <br/>
                </Fade>
            </li>
            
            </Stagger>

        );
    });
    return (
        <div>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {commentsList}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

const DishDetail = (props) =>{
     console.log('DishDetail Component render invoked ');
    if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
    else if (props.dish !=null){
        return(
        <div className='container'>
             <div className='row'>
                    <Breadcrumb>
                       <BreadcrumbItem> <Link to={'/home'}> Home </Link></BreadcrumbItem>
                        <BreadcrumbItem> <Link to={'/menu'}> Menu </Link></BreadcrumbItem>
                       <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
            <div className='row'>
                
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                </div>
                
            </div>
        </div>
        );
    }
    else{
        return(
            <div></div>
        );
    }

}

export default DishDetail;


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component{
    constructor(props){
        super(props)
        

        this.state = {
            isModalOpen :false

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
    }




   render(){
        return(
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> 
                Submit Comment
                </Button>

              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row classname='form-group'>
                                <Label htmlFor="username" md={2}>Rating</Label>
                                <Col md={10}>
                                <Control.select model=".rating" name="rating" className='form-control'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                  
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                <Control.text  model='.author' type="text" id="name" name="name" placeholder="Author" 
                                 className='form-control' validators={{ required, minLength:  minLength(3), maxLength: maxLength(15)}} />
                                <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 3 characters', maxLength: 'Must be 15 charaters or less'}} />
                                
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor='feedback' md={2}> Your Feedback </Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control" validators={{ required }} />
                                        <Errors className="text-danger" model=".message" show="touched" messages={{ required: 'Required'}} />
                                </Col>
                                
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>

                  </ModalBody>
              </Modal>
              </>
        
            );
        

    }

}


