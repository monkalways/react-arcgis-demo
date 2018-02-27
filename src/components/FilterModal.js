import React from 'react';
import { connect } from 'react-redux';
import { Header, Modal } from 'semantic-ui-react';

import { hideFilterModal } from '../actions/appActions';
import FilterForm from './FilterForm';

const FilterModal = ({visible, hideFilterModal}) => {

    const handleClose = () => hideFilterModal();
    
    return (
        <Modal open={visible} onClose={handleClose} dimmer="inverted">
            <Header icon="filter" content="New Filter"></Header>
            <Modal.Content>
                <Modal.Description>
                    <FilterForm />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}

const mapStateToProps = (state) => ({
    visible: state.app.filterModalVisible
});

export default connect(mapStateToProps, {hideFilterModal})(FilterModal);