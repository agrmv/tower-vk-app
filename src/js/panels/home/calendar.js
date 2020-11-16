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
        fetch('http://127.0.0.1:8000/gamesList')
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                console.log(data.gamesList)
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
                <Button variant="contained" color="primary" style={{marginTop: '0.5em', marginLeft: '8.5px'}}
                        onClick={() => this.props.openModal("CREATE_GAME_MODAL")}>Заявить
                    игру</Button>
                <GamesList list={this.state.gamesList}/>
            </Panel>
        );
    }

}

const GamesList = ({list}) => (
    <ul>
        {list.map(item => (
            <ListItem key={item.id.toString()} item={item}/>
        ))}
    </ul>
);

const ListItem = ({item}) => (
    <li className="game_card">
        <img className="game_image" src={`data:image/jpeg;base64,${item.img}`}/>
        <p className="game_name">{item.name}</p>
        <p className="game_system">{item.system}</p>
        <p className="game_genre">Жанр: {item.genre.join(", ")}</p>
        <div className="game_tag">
            <p style={{margin: '5px'}}>{item.tag.join(", ")}</p>
        </div>
        <div className="game_time">
            <img src="/src/images/time.svg"/>{item.time.start} - {item.time.end}
        </div>
        <p className="game_master">Мастер: <a href={item.master.vkLink}>{item.master.name} </a></p>
        <div className="game_table">
            <img src="/src/images/table.svg"/>  {item.table}
        </div>
        <div className="game_peoples">
            <img src="/src/images/peoples.svg"/> 3/4
        </div>
        <div className="game_company">
            <img src="/src/images/company.svg"/>  Кампания (10 - 10+ игровых сессий)
        </div>
    </li>
);


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
