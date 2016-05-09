import * as React from 'react';

import Align from '../../src/components/Align/Align';
import Button from '../../src/components/Button/Button';
import Card from '../../src/components/Card/Card';
import Checkbox from '../../src/components/Checkbox/Checkbox';
import Door from '../../src/components/Door/Door';
import Dropdown from '../../src/components/Dropdown/Dropdown';
import Emerge from '../../src/components/Emerge/Emerge';
import Grid from '../../src/components/Grid/Grid';
import Input from '../../src/components/Input/Input';
import Layer from '../../src/components/Layer/Layer';
import Loading from '../../src/components/Loading/Loading';
import Modal from '../../src/components/Modal/Modal';
import Pane from '../../src/components/Pane/Pane';
import Selectable from '../../src/components/Selectable/Selectable';
import Shrink from '../../src/components/Shrink/Shrink';
import Toolbar from '../../src/components/Toolbar/Toolbar';
import Transform from '../../src/components/Transform/Transform';
import Wizard from '../../src/components/Wizard/Wizard';

const LayerProperties = [
  {name: 'border', type: '', options: '', description: ''},
  {name: 'overflow', type: '', options: '', description: ''},
  {name: 'left', type: '', options: '', description: ''},
  {name: 'right', type: '', options: '', description: ''},
  {name: 'scrollY', type: '', options: '', description: ''},
  {name: 'scrollX', type: '', options: '', description: ''},
  {name: 'fill', type: '', options: '', description: ''},
  {name: 'type', type: '', options: '', description: ''},
  {name: 'children', type: '', options: '', description: ''},
  {name: 'className', type: '', options: '', description: ''},
  {name: 'style', type: '', options: '', description: ''},
  {name: 'onClick', type: '', options: '', description: ''},
  {name: 'block', type: '', options: '', description: ''},
  {name: 'key', type: '', options: '', description: ''},
  {name: 'align', type: '', options: '', description: ''},
  {name: 'flex', type: '', options: '', description: ''},
  {name: 'flow', type: '', options: '', description: ''},
  {name: 'justify', type: '', options: '', description: ''}
]

export default class TutorialLayer extends React.Component<any,any>{
  constructor() {
    super();

    this.state = {
      showProps : true,
      showVideo: false
    }
  }

  toggleShowProps() {
    this.setState({
      showVideo: false,
      showProps: this.state.showProps ? false : true
    })
  }

  toggleShowVideo() {
    this.setState({
      showProps: false,
      showVideo: this.state.showVideo ? false : true
    })
  }

  render() {

    const self = this;
    const props = self.props;
    let state = self.state;

    const columns = [
      {name: 'name', width:250},
      {name: 'type', width:300},
      {name: 'options', width:250},
      {name: 'description'}
    ]

    return (
      <div className="p10">

        <h1>Layer</h1>

        <div className="ptb10">
          <h2 className="pb10">Description</h2>
          <p>The Layer component is an advanced version of the standard div control.</p>
        </div>

        <div className="ptb10">
          <h2 className="pb10">Examples</h2>
          <div className="ptb10">
            <Layer className="p10 dark">
              <Layer type="light" className="p10">
                This is a Layer
              </Layer>
            </Layer>
          </div>
        </div>

        <div className="ptb10">
          <h2 className="pb10">Options</h2>
          <Button checked={this.state.showProps} onClick={this.toggleShowProps.bind(this)}>Toggle Options</Button>
          <Door open={this.state.showProps}>
            <div className="ptb10">
              <Grid open={this.state.showProps} numberPerPage={20} sortable columns={columns} dataSource={LayerProperties} />
            </div>
          </Door>
        </div>

        <div className="ptb10">
          <h2 className="pb10">Video</h2>
          <Button checked={this.state.showVideo} onClick={this.toggleShowVideo.bind(this)}>Toggle Video Tutorial</Button>
          <Door open={this.state.showVideo}>
            <div className="ptb10">
              VIDEO
            </div>
          </Door>
        </div>

      </div>
    )
  }
}
