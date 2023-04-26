import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page}&category=${props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&pageSize=${props.pageSize}`;        
    setLoading(true);
    const res = await fetch(url);
    // props.setProgress(30);
    const data = await res.json();
    props.setProgress(70);
    setArticles(data.articles)
    settotalResults(data.totalResults)
    setLoading(false)       
    props.setProgress(100);
  }  

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
  }, [])
  


  // handlePreviousClick = async ()=>{
    // try{
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&page=${this.state.page-1}&pageSize=${props.pageSize}`;     
    //   this.setState({loading: true});    
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   this.setState({
    //       page: this.state.page-1, 
    //       articles: data.articles,
    //       loading: false
    //   });

    // }
    // catch(e) {
    //     console.log("something is not working");
    // }
    // this.setState({page: this.state.page - 1});
    // this.updateNews();
    
  // }


  // handleNextClick = async ()=>{
    // updating to next page by updating the state
    // try{
    //   if (this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)){

    //   }
    //   else{
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&page=${this.state.page+1}&pageSize=${props.pageSize}`; 
    //     this.setState({loading: true});       
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     this.setState({
    //         page: this.state.page+1, 
    //         articles: data.articles,
    //         loading: false
    //   });
    //   }
      

    // }
    // catch(e) {
    //     console.log("something is not working");
    // }    

    // this.setState({page: this.state.page - 1});
    // this.updateNews();

  // }

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&page=${page+1}&category=${props.category}&apiKey=1ee26d3b3ab3449a972c9577a22a69d6&pageSize=${props.pageSize}`;            
    setPage(page+1)
    let res = await fetch(url);
    let data = await res.json();
    setArticles(articles.concat(data.articles));
    settotalResults(data.totalResults);
    
  };

    return (
        <>
          <h1 className='text-center' style={{margin: '35px 0px', marginTop:'90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headline's</h1>
          {/* if this.state.loading is true then display the spinner */}
          {loading && <Spinner/>} 

          <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinner/>}
          >
              <div className="container">
              <div className="row">
                {articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                      {/* If element is not null slice else return empty string */}
                        <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>             
                })}            
              </div>
              </div>
          </InfiniteScroll>              
        </>
      )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
