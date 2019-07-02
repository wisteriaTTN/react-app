import React, { Component } from 'react';
import { URL } from '../../Common/constant';
import { Link, withRouter } from "react-router-dom";
import '../../App.scss';
import { formatDate } from '../../Common/common-ui'

function ArticleList({ articles }) {
  console.log(articles);
  return articles.map((item) => (
      <div className="articles-item" key={item.slug}>
        <div className="col-md-3">
          <Link to={`/profiles/${item.author.username}`}>
            <div className="articles-author">
              <div className="author-image">
                <img alt="" src={item.author.image}></img>
              </div>
              <p>{item.author.username}</p>
            </div>
          </Link>
        </div>
        <div className="col-md-9">
          <Link to={`/article/${item.slug}`}>
            <div className="articles-content">
              <div className="articles-title">{item.title}</div>
              <div className="block-with-text">{item.body}</div>
              <div className="articles-date">{formatDate(item.createdAt)}</div>
            </div>
          </Link>
        </div>
        
      </div>
  ));
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    if(localStorage.getItem("token")){
      fetch(URL + '/articles')
      .then(res => res.json())
      .then(json => {
        var articles = json.articles.filter(article => article.author.image.includes('http'));
        json.articles = articles;
        return json;
      })
      .then(data => this.setState({ data }));
    }
    else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="main">
        <h1>Article List</h1>
        <div className="container articles-list">
          {this.state.data && this.state.data.articles &&
            <ArticleList articles={this.state.data.articles} />}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);