import * as React from 'react';
import * as classNames from 'classnames';
import './Wizard.less';
// stateless functional comp =D
const WizardSlide : any = (props : any) => {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}

export default class Wizard extends React.Component<any, any>{
  public static defaultProps = {
    slideIndex: 0
  }
  constructor(props) {
    super(props);
  }
  render() {

    const self = this;
    const props = self.props;

    let wizardClass = classNames(
      'r-Wizard'
    );

    let createSlidesPartial = (item, index) => {

      let wizardSlideClass = classNames(
        'r-WizardSlide',
        {'e-selected' : (props.slideIndex === index)},
        {'e-backward' : (props.slideIndex > index)},
        {'e-forward' : (props.slideIndex < index)},
        {'e-vertical' : (props.vertical)},
        props.className
      );

      return(
        <WizardSlide className={wizardSlideClass} key={index}>
          {item}
        </WizardSlide>
      );
    };

    if (props.children) {
      return(
        <div ref="r-Wizard" className={wizardClass} style={props.style}>
          <div ref='r-Wizard__track' className="r-Wizard__track">
            {props.children.map(createSlidesPartial)}
          </div>
        </div>
      );
    } else{
      return null;
    }
  }
}
