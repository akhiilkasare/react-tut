import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  // async componentDidMount(){
  //   try{
  //     const url = "https://newsapi.org/v2/top-headlines?country=${this.props.country}{this.props.country}in&apiKey=1ee26d3b3ab3449a972c9577a22a69d6";
  //     const data = await fetch(url);
  //     const parsedData = await data.json();
  //     this.setState = ({
  //       articles: parsedData.articles
  //     });     
  //   }
  //   catch(e){
  //     console.log("something went wrong")
  //   }
  // }    


  async componentDidMount(){
    try{
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=1&category=${this.props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&pageSize=${this.props.pageSize}`;        
        this.setState({loading: true});
        const res = await fetch(url);
        const data = await res.json();
        // this.setState({
        //     articles: (data.articles),
        //     totalResults: (data.totalResults),
        //     loading: false
        // });
        this.setState({articles: data.articles,
          totalResults: data.totalResults,
          loading: false})
    }
    catch(e) {
        console.log("something is not working");
    }
  }

  handlePreviousClick = async ()=>{
    try{
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;     
      this.setState({loading: true});    
      const res = await fetch(url);
      const data = await res.json();
      this.setState({
          page: this.state.page-1, 
          articles: data.articles,
          loading: false
      });

    }
    catch(e) {
        console.log("something is not working");
    }    
  }


  handleNextClick = async ()=>{
    // updating to next page by updating the state
    try{
      if (this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&page=${this.state.page+1}&pageSize=${this.props.pageSize}`; 
        this.setState({loading: true});       
        const res = await fetch(url);
        const data = await res.json();
        this.setState({
            page: this.state.page+1, 
            articles: data.articles,
            loading: false
      });
      }
      

    }
    catch(e) {
        console.log("something is not working");
    }    
  }


  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '35px 0px'}}>NewsMonkey - Top Headlines</h1>
        {/* if this.state.loading is true then display the spinner */}
        {this.state.loading && <Spinner/>} 
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              {/* If element is not null slice else return empty string */}
                <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            // console.log(element);
        })}            
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>        
      </div>
    )
  }
}

export default News
