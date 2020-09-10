import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {closePopout, goBack, openModal, openPopout} from "../../store/router/actions";
import {Alert, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

import moment from "moment";
import Calendar from "../../../react-calendar/src";
import '../../../react-calendar/src/Calendar.less';

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            showFixedNumberOfWeeks: true,
        };
    }

    numberOfWeeks = 2;
    onChange = date => this.setState({date: date});
    // onClickDay = activeStartDate => this.setState({activeStartDate: activeStartDate});
    // onClickDay = value => {
    //     // this.props.openPopout(
    //     //     <Alert
    //     //         actions={[{
    //     //             title: 'Ok',
    //     //             autoclose: true,
    //     //             style: 'cancel',
    //     //         }]}
    //     //         onClose={() => this.props.closePopout()}
    //     //     >
    //     //         <h2>Выбранный день:</h2>
    //     //         <p>{moment(value).format('YYYY-MM-DD')}</p>
    //     //     </Alert>
    //     // );
    // };

    render() {
        const {id, goBack} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Календарь
                </PanelHeader>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    // onClickDay={this.onClickDay}
                    weeksToShow={this.numberOfWeeks}
                    showFixedNumberOfWeeks={this.state.showFixedNumberOfWeeks}
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
