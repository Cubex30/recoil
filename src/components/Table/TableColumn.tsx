import * as React from 'react';
import * as classNames from 'classnames';

import TableData from './TableData';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

class DetailTemplateColumnToggle extends React.Component<any,any>{
    detailTemplateToggleSelectedElements(element) {
        this.props.detailTemplateToggleSelectedElements(element);
    }
    render() {
        let props = this.props;

        let {detailTemplateOpenOnRowSelect, element, selectedKey} = props;
        
        return (
            <td className="r-Table__DetailTd" width={25}>
                <Button tabIndex={-1} simple size="small" onClick={!detailTemplateOpenOnRowSelect ? this.detailTemplateToggleSelectedElements.bind(this, props.element) : null} icon={props.detailTemplateSelectedElements.includes(selectedKey ? element[selectedKey] : element) ? 'minus' : 'plus'} />
            </td>
        )
    }
};

class CheckboxColumn extends React.Component<any,any>{
    toggleSelectedElements(element) {
        this.props.toggleSelectedElements(element);
    }
    render() {
        let props = this.props;
        
        return (
            <td width={25}>
                <Checkbox onChange={this.toggleSelectedElements.bind(this, props.element)} size='small' checked={props.selectedElements.includes(props.element)}/>
            </td>
        )
    }
};

export default class TableColumn extends React.Component<any,any>{

    toggleSelectedElements(element) {
        this.props.toggleSelectedElements(element);
        this.props.onRowSelect ? this.props.onRowSelect(element) : null;
        this.props.detailTemplateOpenOnRowSelect ? this.props.detailTemplateToggleSelectedElements(element) : null;
    }

    onRowSelect(element) {
        this.props.onRowSelect ? this.props.onRowSelect(element) : null;
        this.props.detailTemplateOpenOnRowSelect ? this.props.detailTemplateToggleSelectedElements(element) : null;
    }

    render() {

        const self = this;
        const props = self.props;
        
        let {
            element, 
            columns,

            detailTemplate, 
            detailTemplateToggleSelectedElements, 
            detailTemplateSelectedElements,
            detailTemplateHideToggle,
            
            toggleSelectedElements,
            selectedElements,
            rowIsSelectable,
            hideColumns,
            
            checkable,
            onRowSelect,
            isArray,
            detailTemplateOpenOnRowSelect,
            selectedKey

        } = props;

        let TableDataArray = []

        for (let index = 0; index < columns.length; index++) {
            let key = columns[index].name;
            TableDataArray.push(element[key]);
        }

        let createList = (value, key) => {
            return (
                <TableData isArray={isArray} hideColumns={hideColumns} element={element} key={key} value={value} column={columns[key]} />
            )
        }

        let DetailTemplateColumnToggleProps = {
            element: element,
            detailTemplateToggleSelectedElements: detailTemplateToggleSelectedElements,
            detailTemplateSelectedElements : detailTemplateSelectedElements,
            detailTemplateOpenOnRowSelect : detailTemplateOpenOnRowSelect,
            selectedKey: selectedKey
        }

        let CheckBoxColumnProps = {
            element : element,
            selectedElements : selectedElements,
            toggleSelectedElements: toggleSelectedElements
        }

        return (
            <tr className={selectedElements.includes(selectedKey ? element[selectedKey] : element) ? 'r-TableColumn checked' : 'r-TableColumn'} onClick={rowIsSelectable && !checkable ? this.toggleSelectedElements.bind(this, element)  : null || (onRowSelect || detailTemplateOpenOnRowSelect ? this.onRowSelect.bind(this, element) : null)}>
                {checkable ? <CheckboxColumn {...CheckBoxColumnProps} /> : null }
                {detailTemplate && !detailTemplateHideToggle ? <DetailTemplateColumnToggle {...DetailTemplateColumnToggleProps} /> : null }
                {TableDataArray.map(createList)}
            </tr>
        )
    }
}