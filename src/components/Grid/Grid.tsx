import * as React from 'react';
import './Grid.less';

import Selectable from '../Selectable/Selectable';
import Layer from '../Layer/Layer';
import Button from '../Button/Button';

import GridHeader from './GridHeader';
import GridBody from './GridBody';
import GridFooter from './GridFooter';

export default class Grid extends React.Component<any, any>{

  constructor() {
    super();
    this.state = {
      columns: [],
      collection: [],
      pageList: [],
      currentPage : 1,
      numberPerPage: 10,
      numberOfPages: 0
    }
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        collection : nextProps.dataSource
      })
    }
  }

  public componentDidMount() {
    if (!this.props.columns) {
      this.automaticallyCreateColumns();
      this.loadCollection();
    } else {
      this.loadCollection();
    }
  }

  public automaticallyCreateColumns() {
    console.log('automaticallyCreateColumns');
    console.log(this.props.dataSource);

    let columnsArray = [];
    let columns = [];

    for (let i = 0; i < Object.keys(this.props.dataSource[0]).length; i++) {
      columnsArray.push(Object.keys(this.props.dataSource[0])[i]);
    }

    let len = columnsArray.length;
    for (let i = 0; i < len; i++) {
      columns.push({
          name: columnsArray[i]
      })
    }

    this.setState({
      columns: columns
    })

    console.log(columns);
  }

  public loadCollection() {

    const self = this;
    const props = self.props;
    let state = self.state;

    let collection = props.dataSource;
    let numberOfPages;

    self.setState({
      collection: props.dataSource
    });

  }

  public toggleSorting(key, sortType) {
    let updatedCollection = [];

    for (let key in this.props.dataSource) {
      updatedCollection.push(this.props.dataSource[key])
    }

    let sortCollection = () => {
      updatedCollection.sort(function(a, b){
        switch (typeof a[key]) {
          case ('string'):
            let itemPrev = a[key].toLowerCase();
            let itemNext = b[key].toLowerCase();
             if (itemPrev < itemNext) //string asc
              return -1
             if (itemPrev > itemNext)
              return 1
            break;
          case ('number'):
            return a[key]-b[key];
          default:
        }
      })
      return updatedCollection;
    }

    if (sortType === 'none') {
      sortCollection();
    } else if (sortType === 'desc') {
      sortCollection().reverse();
    }

    this.setState({
      collection: updatedCollection,
      currentPage : 1
    })

  }

  public columns(id) {
    this.props.columns(id);
  }

  public firstPage() {
    this.setState({
      currentPage : 1
    })
  }

  public previousPage() {
    this.setState({
      currentPage :  this.state.currentPage -= 1
    })
  }

  public nextPage() {
    this.setState({
      currentPage : this.state.currentPage += 1
    })
  }

  public lastPage() {
    this.setState({
      currentPage : this.state.numberOfPages
    })
  }

  public gotoPage(i) {
    this.setState({
      currentPage : i + 1
    })
  }

  render() {
    const self = this;
    const props = self.props;
    let state = self.state;
    let renderedPage = [];
    let renderedColumns;

    let {columns, dataSource} = props;
    let {collection} = state;

    let numberPerPage, numberOfPages;

    if (props.numberPerPage) {
      numberPerPage = props.numberPerPage;
      numberOfPages = Math.ceil(collection.length / (props.numberPerPage));
    } else {
      numberPerPage = state.numberPerPage;
      numberOfPages = Math.ceil(collection.length / (state.numberPerPage));
    }

    let begin = ((state.currentPage - 1) * numberPerPage);
    let end = begin + numberPerPage;
    let pageList = collection.slice(begin, end);

    for (let i = 0; i < pageList.length; i++) {
        renderedPage.push(pageList[i]);
    }

    if (this.props.columns) {
      renderedColumns = this.props.columns;
    } else {
      renderedColumns = this.state.columns;
    }

    return (
      <Layer overflow className='r-Grid w100'>
        <GridHeader
          hideHeader={props.hideHeader}
          columns={renderedColumns}
          dataSource={renderedPage}
          sortable={props.sortable}
          toggleSorting={this.toggleSorting.bind(this)}
          sortType={state.sortType}
        />
        <GridBody
          open={props.open}
          onSelect={props.onSelect}
          selected={props.selected}
          columns={renderedColumns}
          dataSource={renderedPage}
          dataType={state.dataType}
        />
        {(()=>{
          if (state.numberOfPages !== 1) {
            return (
              <GridFooter
                gotoPage={this.gotoPage.bind(this)}
                previousPage={this.previousPage.bind(this)}
                nextPage={this.nextPage.bind(this)}
                lastPage={this.lastPage.bind(this)}
                firstPage={this.firstPage.bind(this)}
                numberOfPages={numberOfPages}
                currentPage={state.currentPage}
                />
            )
          }
        })()}
      </Layer>
    )
  }
}
