import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {closePopout, goBack, openModal, openPopout} from "../../store/router/actions";
import {Alert, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

import Calendar from "../../../react-calendar/src";
import '../../../react-calendar/src/Calendar.less';
import moment from "moment";

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            numberOfWeeks: 2,
            showFixedNumberOfWeeks: true,
            startWeek: this.getMonday(new Date()) //понедельник текущей недели
        };
    }

    onClickDay = value => {
        this.props.openPopout(
            <Alert
                actions={[{
                    title: 'Ok',
                    autoclose: true,
                    style: 'cancel',
                }]}
                onClose={() => this.props.closePopout()}
            >
                <h2>Выбранный день:</h2>
                <p>{moment(value).format('YYYY-MM-DD')}</p>
            </Alert>
        );
    };

    getMonday = date => {
        date = new Date(date);
        let day = date.getDay(), diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff)).getDate();
    }

    render() {
        const {id, goBack} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    Календарь
                </PanelHeader>
                <Calendar
                    value={this.state.date}
                    defaultActiveStartDate={new Date()}
                    onClickDay={this.onClickDay}
                    weeksToShow={this.state.numberOfWeeks}
                    startWeek={this.state.startWeek}
                    showFixedNumberOfWeeks={this.state.showFixedNumberOfWeeks}
                    prev2Label={null}
                    next2Label={null}
                />
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
