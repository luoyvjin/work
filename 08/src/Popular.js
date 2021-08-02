import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import InfiniteScroll from 'react-infinite-scroller'
// import './popular.less'

class App extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            infinitKey: 'All',//增加无限滚动key值以便切换时重置page
            url: {
                'All': 'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories',
                'JavaScript': 'https://api.github.com/search/repositories?q=stars:3E1+language:javascript&sort=stars&order=desc&type=Repositories',
                'Ruby': 'https://api.github.com/search/repositories?q=stars:3E1+language:ruby&sort=stars&order=desc&type=Repositories',
                'Java': 'https://api.github.com/search/repositories?q=stars:3E1+language:java&sort=stars&order=desc&type=Repositories',
                'CSS': 'https://api.github.com/search/repositories?q=stars:3E1+language:css&sort=stars&order=desc&type=Repositories'
            },
            hasMore: true, // 是否开启下拉加载
            pageUrl: 'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories'
        }
        this.loadMoreData()
    }
    // 加载更多数据
    loadMoreData = (page = 1) => {
        // page 当前滚动到了第几页
        const { pageUrl } = this.state
        this.getData(`${pageUrl}&page=${page}`)
    }
    //获取数据
    getData = (url = 'https://api.github.com/search/repositories?q=stars:3E1&sort=stars&order=desc&type=Repositories') => {
        let { list } = this.state
        fetch(url).then(res => res.json())
            .then(res => {
                if (res.items) {
                    this.setState({ list: [...list, ...res.items] })
                }
            }).catch(e => { console.log(e) })
    }
    //切换
    onSwitch = str => {
        this.setState({ list: [], pageUrl: this.state.url[str], infinitKey: str }, () => { this.loadMoreData(1) })
    }
    render() {
        const { list, hasMore, infinitKey } = this.state
        return (
            <div className='a'>
                <div style={styles.nav}>
                    <div onClick={() => { this.onSwitch('All') }} style={{ cursor: 'pointer', color: infinitKey === 'All' ? 'red' : '' }}>All</div>
                    <div onClick={() => { this.onSwitch('JavaScript') }} style={{ cursor: 'pointer', color: infinitKey === 'JavaScript' ? 'red' : '' }}>JavaScript</div>
                    <div onClick={() => { this.onSwitch('Ruby') }} style={{ cursor: 'pointer', color: infinitKey === 'Ruby' ? 'red' : '' }}>Ruby</div>
                    <div onClick={() => { this.onSwitch('Java') }} style={{ cursor: 'pointer', color: infinitKey === 'Java' ? 'red' : '' }}>Java</div>
                    <div onClick={() => { this.onSwitch('CSS') }} style={{ cursor: 'pointer', color: infinitKey === 'CSS' ? 'red' : '' }}>CSS</div>
                </div>
                <InfiniteScroll
                    initialLoad={false} // 不让它进入直接加载
                    pageStart={1} // 设置初始化请求的页数
                    loadMore={this.loadMoreData}  // 监听的ajax请求
                    hasMore={hasMore} // 是否继续监听滚动事件 true 监听 | false 不再监听
                    useWindow={true} // 不监听 window 滚动条
                    key={infinitKey}
                    style={{width: '100%',overflow:'hidden'}}
                >
                    <div className='row'>
                        {list.map((item, index) => {
                            return (
                                <div className="col-lg-3 col-sm-12 col-md-6 inner" key={index} >
                                    <div style={{  ...styles.item }}>
                                        <h2 style={{ textAlign: 'center' }}>#{index + 1}</h2>
                                        <div style={{ textAlign: 'center' }}>
                                            <img src={item.owner.avatar_url} style={{ width: '150px' }} />
                                        </div>
                                        <h3 style={{ textAlign: 'center', color: '#b83617' }}><a href={item.owner.html_url}>{item.owner.login}</a></h3>
                                        <p style={{ paddingLeft: '20px' }}><i className="fa fa-user-circle-o" style={{ marginRight: '10px' }}></i><a href={item.owner.html_url}>{item.owner.login}</a></p>
                                        <p style={{ paddingLeft: '20px' }}><i className="fa fa-star" style={{ marginRight: '10px' }}></i>{item.stargazers_count}<span style={{ marginLeft: '10px' }}>stars</span></p>
                                        <p style={{ paddingLeft: '20px' }}><i className="fa fa-code-fork" style={{ marginRight: '10px' }}></i>{item.forks_count}<span style={{ marginLeft: '10px' }}>forks</span></p>
                                        <p style={{ paddingLeft: '20px' }}><i className="fa fa-warning" style={{ marginRight: '10px' }}></i>{item.open_issues_count}<span style={{ marginLeft: '10px' }}>open issues</span></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}
const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    item: {
        backgroundColor: '#ebebeb',
        width: '100%',
        marginBottom: '10px'
    }
}

export default App;