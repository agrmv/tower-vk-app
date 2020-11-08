import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {closePopout, goBack, openModal, openPopout} from "../../store/router/actions";
import {Alert, Panel} from "@vkontakte/vkui";

import Calendar from "../../../react-calendar/src";
import '../../../react-calendar/src/Calendar.less';
import moment from "moment";
import Button from "@vkontakte/vkui/dist/components/Button/Button";

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            numberOfWeeks: 1,
            showFixedNumberOfWeeks: true,
            startWeek: this.getMonday(new Date()).getDate(), //понедельник текущей недели
            weeksToSwitch: 1 * 7, // one week
            activeStartDate: this.getMonday(new Date()),
            gamesList: [],
            errorMessage: ""
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
        return new Date(date.setDate(diff));
    }

    componentDidMount() {
        const headers = {'Content-Type': 'application/json'}
        fetch('http://127.0.0.1:8000/gamesList', {headers})
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                this.setState({gamesList: data.gamesList})
            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
            });
    }

    render() {
        const {id} = this.props;
        return (
            <Panel id={id}>
                <Calendar
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                    defaultActiveStartDate={this.state.activeStartDate}
                    weeksToShow={this.state.numberOfWeeks}
                    startWeek={this.state.startWeek}
                    showFixedNumberOfWeeks={this.state.showFixedNumberOfWeeks}
                    weeksToSwitch={this.state.weeksToSwitch}
                    prev2Label={null}
                    next2Label={null}
                />
                <Button variant="contained" color="primary" style={{marginTop: '0.5em'}}
                        onClick={() => this.props.openModal("CREATE_GAME_MODAL")}>Заявить
                    игру</Button>
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
