import React, { Component } from 'react';
import { URL } from '../../Common/constant';
import { Link } from "react-router-dom";
import './article.scss';
import { formatDate } from '../../Common/format-date'

function CommentList({ comments }) {
  console.log(comments);
  return comments.map((item) => 
  <div className="comments-item" key={item.id}>
    <div>{item.body}</div>
    <div>
      <Link to={`/profiles/${item.author.username}`}>{item.author.username}</Link>
      <span> - </span>
      <span className="comments-date">{formatDate(item.createdAt)}</span>
    </div>
  </div>
  );
}

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      comments: {}
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div className="article">
        <div className="article-block">
          <h2 className="article-title">{this.state.article.title}</h2>
          <div className="article-description">{this.state.article.description}</div>
          <div className="article-body">{this.state.article.body}</div>
        </div>
        <div className="comments-block">
          <h2>Comments</h2>
          {this.state.comments && this.state.comments.comments &&
            <CommentList comments={this.state.comments.comments} />}
        </div>
      </div>
    );
  }
}

export default Article;