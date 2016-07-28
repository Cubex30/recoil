import * as React from 'react';
import * as classNames from 'classnames';
import './Grid.less';

import GridComponent from './GridComponent';
import DataSource from '../DataSource/DataSource';

export interface IGridProps {
    dataSource?: any[];
    numberPerPage?: number;
    columns?: any;
    open?: boolean;
    hideHeader?: boolean;
    sortable?: boolean;
    detailTemplate?: any;
    height?: string;
    onRowSelect?: any;
    selected?: any;
    hideColumns?: any;
    columnTemplate?: any;
    detailTemplateOpenOnHover?: boolean;
    detailTemplateOpenOnSelect?: boolean;
    isSelected?: any;
    dataKey?: any;
    rowIsSelectable?: boolean;
    selectedKey?: string;
    rowIsSelectableType?: string;
    onSelect?: any;
    detailTemplateOpenOnRowSelect?: boolean;
    filterSelected?: boolean;
    initialSortKey?: string;
    numberOfPages?: any;
}

export interface IGridState {
    columns?: any;
    dataSource?: any;
    pageList?: any;
    currentPage?: number;
    numberPerPage?: number;
    numberOfPages?: number;
    dataType?: any;
    sortType?: any;
    selected?: any;
}

export default class Grid extends React.Component<IGridProps, IGridState>{
    render() {
        const self = this;
        const props = self.props;

        return React.createElement(DataSource(<GridComponent {...props} />))
    }
}