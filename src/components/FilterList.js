import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Button, Checkbox, Form, Icon } from 'semantic-ui-react';

import { toggleFilter } from '../actions/mapActions';

class FilterList extends Component {
    state = { activeIndex: 0 }

    handleAccordionClick = (index) => {
        this.setState((prevState) => {
            const {activeIndex} = prevState;
            const newIndex = activeIndex === index ? -1 : index;
            return {
                activeIndex: newIndex
            };
        });
    };

    handleFilterToggleChange = (filterId, active) => {
        const {toggleFilter} = this.props;
        toggleFilter(filterId, !active);
    };

    renderFilterItem = (filter) => {
        const {activeIndex} = this.state;
        return (
            <div key={filter.id}>
                <Accordion.Title active={activeIndex === filter.id} index={filter.id}>
                    <Icon name='dropdown' onClick={() => this.handleAccordionClick(filter.id)} />
                    <Checkbox toggle label={filter.name} checked={filter.active} 
                        onChange={(e) => { e.preventDefault(); this.handleFilterToggleChange(filter.id, filter.active)} } />
                </Accordion.Title>
                <Accordion.Content active={activeIndex === filter.id}>
                    <Form>
                        <Form.Field>
                            <label>Layer</label>
                            <input value={filter.layerId} readOnly />
                        </Form.Field>
                        <Form.Field>
                            <label>Criteria</label>
                            <input value={filter.criteria} readOnly />
                        </Form.Field>
                        <Button type="button" primary>Update</Button>
                        <Button type="button">Remove</Button>
                    </Form>
                </Accordion.Content>
            </div>
        );
    };
    
    render() {
        const {filters} = this.props;

        if(!filters || _.size(filters) === 0) {
            return (
                <p>No filters defined yet.</p>
            );
        }
        
        return (
            <Accordion styled exclusive={false}>
                {_.map(filters, this.renderFilterItem)}
            </Accordion>
        );
    };
}

const mapStateToProps = (state) => ({
    filters: state.map.filters
});

export default connect(mapStateToProps, {toggleFilter})(FilterList);
