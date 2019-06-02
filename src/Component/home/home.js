import React, { Component } from 'react';
import { URL } from '../../Common/constant';
import { Link } from "react-router-dom";
import './home.scss';
import { formatDate } from '../../Common/format-date'

function ArticleList({ articles }) {
  console.log(articles);
  return articles.map((item) => (
    <Link to={`/article/${item.slug}`} key={item.slug}>
      <div className="articles-item">
        <div className="articles-author">
          <img alt="" src={item.author.image}></img>
          <p>{item.author.username}</p>
        </div>
        <div className="articles-content">
          <div className="articles-title">{item.title}</div>
          <div>{item.body}</div>
          <div>{formatDate(item.createdAt)}</div>
        </div>
      </div>
    </Link>
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
    fetch(URL + '/articles')
      .then(res => res.json())
      .then(json => {
        var articles = json.articles.filter(article => article.author.image.includes('http'));
        json.articles = articles;
        return json;
      })
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <h3>Article List</h3>
        <div className="articles-list">
          {this.state.data && this.state.data.articles &&
            <ArticleList articles={this.state.data.articles} />}
        </div>
      </div>
    );
  }
}

export default Home;