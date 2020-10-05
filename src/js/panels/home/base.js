import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Panel, PanelHeader} from "@vkontakte/vkui"
import CalendarView from "./calendar";

class HomePanelBase extends React.Component {
    render() {
        const {id} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Tower</PanelHeader>
                <CalendarView/>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
