import * as React from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Toolbar from '../Toolbar/Toolbar';

export default class TableSearch extends React.Component<any, any>{
    _throttleTimeout: any;

  public static defaultProps = {
      active: true,
      className: '',
      disabled: false,
      block: false,
      simple: true,
      throttle: 200,
      iconLocation : 'left',
      onChange () {}
  };

  constructor (props) {
    super(props);
    this.state = {
      searchTerm: props.value || ''
    }
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      const e = {
        target: {
          value: nextProps.value
        }
      }
      this.updateSearch(e)
    }
  }

  updateSearch (term) {
    const searchTerm = term;
    this.setState({
      searchTerm: searchTerm
    }, () => {
      if (this._throttleTimeout) {
        clearTimeout(this._throttleTimeout)
      }
      this._throttleTimeout = setTimeout(() => this.props.filterItems(searchTerm, this.props.searchableKeys), this.props.throttle)
    })
  }

  render() {

    const self = this;
    const props = self.props;

    const {className, onChange, throttle, searchableKeys, value} = this.props

    let searchPartial = () => {
      return (
        <Toolbar flex flush block noRadius className="p5">
          <Input 
            placeholder={props.searchTitle} 
            onChange={this.updateSearch.bind(this)} 
            block
            type="text"
            size="small"
            flex
            value={this.state.searchTerm}
          />
          <Button size="small" icon="times" onClick={this.updateSearch.bind(this, "")} />
        </Toolbar>
      )
    }
    
    return props.searchableKeys ? searchPartial() : null;

  }
}