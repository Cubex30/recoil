import * as React from 'react';
import * as classNames from 'classnames';
import './Loading.less';

import Button from '../Button/Button';

import {IRecoil} from '../../index';

export interface ILoadingProps extends IRecoil {
  children ? : any;
  if ?: boolean;
  src? : string;
  title? : string;
  width?: number;
  height?: number;
}

export interface ILoadingState {}

export default class Loading extends React.Component<ILoadingProps, ILoadingState> {
  public state : ILoadingState;

  constructor (props : ILoadingProps) {
    super(props);
  }

  public render() {

    const self = this;
    const props = self.props;

    let {src, size, theme, title} = props;

    let loadingClass = classNames(
      'r-Loading',
      'loader',
      props.className
    )

    if (props.if) {
      if (src)
          return <div className={loadingClass}><img height={props.height} width={props.width} src={src} /></div>;
      else
        return <Button className={loadingClass} size={size} theme={theme} simple loading={true}>{title}</Button>
    } else return null;
  }
}
