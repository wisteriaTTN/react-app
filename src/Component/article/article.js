import React, { Component } from 'react';
import { URL } from '../../Common/constant';
import { Link, withRouter } from "react-router-dom";
import '../../App.scss';
import { formatDate, isEmpty, callAPI } from '../../Common/common-ui'

function CommentList({ comments, deleteComment }) {
  if(!isEmpty(comments)){
    return comments.map((item) => (
      <div className="comments-item" key={item.id}>
        <div className="col-1 text-align-center">
          <div className="comments-image">
            <img alt="" src={item.author.image}/>
          </div>
          <Link to={`/profiles/${item.author.username}`}>{item.author.username}</Link>
        </div>
        <div className="col-10 comments-body">
          <div>{item.body}</div>
          <div className="comments-date">{formatDate(item.createdAt)}</div>
        </div>
        <div className="col-1">
          {item.author.username === localStorage.getItem('username') && <button type="button" className="btn btn-danger" onClick={() => deleteComment(item.id)}>Delete</button>}
        </div>
      </div>
    ));
  }
  else {
    return <div></div>
  }
};

var slug = '';
class Article extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      comments: {},
      newComment: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    slug = this.props.match.params.slug;
  }
  
  componentDidMount() {
    if(localStorage.getItem('token')){
      Promise.all([
        fetch(URL + `/articles/${slug}`),
        fetch(URL + `/articles/${slug}/comments`)
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        article: data1.article,
        comments: data2.comments
      }));
    }
    else {
      this.props.history.push('/');
    }
  }

  deleteComment(id){
    callAPI('DELETE', null, `${URL}/articles/${slug}/comments/${id}`)
    .then( res => {
      if(res !== 200){
        console.log(res);
      }
      else{
        callAPI('GET', null, `${URL}/articles/${slug}/comments`)
        .then( data => {
          this.setState({
            comments: data.comments
          })
        })
      } 
    });
  }

  handleChange(event) {
    this.setState({
      newComment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const comment = {comment: {"body": this.state.newComment}};
    callAPI('POST', comment, `${URL}/articles/${slug}/comments`)
      .then( comment => {
        this.setState(prev => {
          return {
            comments: [...prev.comments, comment.comment],
            newComment: ''
          }
        });
        console.log(JSON.stringify(this.state.comments));
      });
    }
    

  render() {
    return (
      <div className="article">
        <div className="article-block">
          <h2 className="article-title">{this.state.article.title}</h2>
          <div className="article-description">{this.state.article.description}</div>
          <div className="article-body">{this.state.article.body}</div>
        </div>
        <div className="comments-block">
          <h2 className="comments-title">Comments</h2>
          <CommentList comments={this.state.comments} deleteComment={this.deleteComment} />
          <div className="comments-item">
            <div className="col-1 text-align-center">
              <div className="comments-image">
                <img alt="" src={localStorage.getItem("imageUser")}/>
              </div>
              <Link to={`/user`}>{localStorage.getItem("username")}</Link>
            </div>
            <div className="col-10 comments-body" onSubmit={this.handleSubmit}>
              <form onSubmit= { this.props.onSubmit}>
                <input type="text" placeholder="What do you want to say?" value={this.state.newComment} onChange={this.handleChange}/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Article);