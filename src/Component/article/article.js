import React, { Component } from 'react';
import { URL } from '../../Common/constant';
import { Link, withRouter } from "react-router-dom";
import './article.scss';
import { formatDate } from '../../Common/format-date'

function CommentList({ comments }) {
  console.log(comments);
  return comments.map((item) => 
  <div className="comments-item" key={item.id}>
    <div className="col-1 text-align-center">
      <div className="comments-image">
        <img alt="" src={item.author.image}/>
      </div>
      <Link to={`/profiles/${item.author.username}`}>{item.author.username}</Link>
    </div>
    <div className="col-11 comments-body">
      <div>{item.body}</div>
      <div className="comments-date">{formatDate(item.createdAt)}</div>
    </div>
  </div>
  );
}

class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {
      article: {},
      comments: {},
      newComment: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    if(localStorage.getItem("token")){
      var slug = this.props.match.params.slug;
      Promise.all([
        fetch(URL + `/articles/${slug}`),
        fetch(URL + `/articles/${slug}/comments`)
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        article: data1.article,
        comments: data2
      }));
    }
    else {
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    this.setState({
      newComment: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var slug = this.props.match.params.slug;
    const comment = {"comment": {"body": this.state.newComment}}
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(comment)
    };

    fetch(`${URL}/articles/${slug}/comments`, requestOptions)
    .then(res => res.json())
    .then(comment => {
      
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
          {this.state.comments && this.state.comments.comments &&
            <CommentList comments={this.state.comments.comments} />}
          <div className="comments-item">
            <div className="col-1 text-align-center">
              <div className="comments-image">
                <img alt="" src={localStorage.getItem("imageUser")}/>
              </div>
              <Link to={`/user`}>{localStorage.getItem("username")}</Link>
            </div>
            <div className="col-11 comments-body" onSubmit={this.handleSubmit}>
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