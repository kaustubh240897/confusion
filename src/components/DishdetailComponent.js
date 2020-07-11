import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
//import { render } from '@testing-library/react';

class DishDetail extends Component{
    componentDidMount(){
        console.log('DishDetail Component componentDidMount invoked ');
    }
    componentDidUpdate(){
        console.log("Dishdetail Component componentDidUpdate is invoked");
    }
    



 renderDish(dish) {
       
            return(
                <Card>
                     <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                     <CardBody>
                           <CardTitle> {this.props.dish.name}</CardTitle>
                           <CardText>{this.props.dish.description}</CardText>
                     </CardBody>
                </Card>
            );

        
       
    }
renderComments(comments){
    var commentsList = comments.map(comment => {
        return( 
            <li key={comment.id}>
                {comment.comment}
                <br/> <br/>
                -- {comment.author}, { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date( Date.parse(comment.date)))}
                <br/> <br/>
            </li>

        );
    });
    return (
        <div>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {commentsList}
            </ul>
        </div>
    );
}

render(){
     console.log('DishDetail Component render invoked ');
    if (this.props.dish){
        return(
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    {this.renderDish(this.props.dish)}
                </div>
                <div className='col-12 col-md-5 m-1'>
                    {this.renderComments(this.props.dish.comments)}
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
}
export default DishDetail;