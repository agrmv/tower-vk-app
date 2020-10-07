import React from 'react';
import {connect} from 'react-redux';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import {
    Button,
    Checkbox,
    File,
    FormLayout,
    FormLayoutGroup,
    Input,
    IOS,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Select,
    Slider,
    Textarea,
    withPlatform
} from "@vkontakte/vkui";

class CreateGameModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfPlayers: 0,
        };
    }

    render() {
        const {id, onClose, platform} = this.props;

        return (
            <ModalPage
                id={id}
                header={
                    <ModalPageHeader
                        left={platform !== IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Cancel/></PanelHeaderButton>}
                        right={platform === IOS &&
                        <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    >
                        Заявить новую игру
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                {/*TODO когда появится бэк добавить стейты/пропсы для сабмита*/}
                <FormLayout>
                    <FormLayoutGroup top="Название игры">
                        <Input type="text" placeholder="Введите название"/>
                    </FormLayoutGroup>
                    {/*TODO сделать выбор системы селектом, а при нажатии на чекбокс выкидывать инпут.Либо убрать этот юзлес чекбокс*/}
                    <FormLayoutGroup top="Система правил">
                        <Input type="text" placeholder="Введите систему правил"/>
                    </FormLayoutGroup>
                    <FormLayoutGroup>
                        <Checkbox>Моей системы нет в базе</Checkbox>
                    </FormLayoutGroup>
                    <FormLayoutGroup top="Иллюстрация к игре">
                        <File top="Загрузить изображение" before={<Icon24Gallery/>} controlSize="l">
                            Открыть галерею
                        </File>
                    </FormLayoutGroup>
                    <FormLayout>
                        <Slider
                            onChange={numberOfPlayers => this.setState({numberOfPlayers})}
                            defaultValue={this.state.numberOfPlayers}
                            top="Количество игроков"
                            step={1}
                            bottom={`${this.state.numberOfPlayers}`}
                        />
                    </FormLayout>
                    <FormLayoutGroup top="Укажите жанр">
                        <Input type="text" placeholder="Введите жанр"/>
                    </FormLayoutGroup>
                    <FormLayoutGroup top="Дата проведения игры">
                        <Input type="date" placeholder="Выберите дату"/>
                    </FormLayoutGroup>
                    <FormLayout>
                        {/*TODO запрос для получения столов с флагом is_свободен? А занятые столы нахуй не надо рисовать*/}
                        <Select top="Игровой стол" placeholder="Выберите игровой стол">
                            <option value="table_1">1</option>
                            <option value="table_2">2</option>
                            <option value="table_3">3</option>
                            <option value="table_4">4</option>
                            <option value="table_5">5</option>
                            <option value="table_6">6</option>
                            <option value="table_6">7</option>
                        </Select>
                    </FormLayout>
                    <FormLayoutGroup top="Описание игры">
                        <Textarea type="textarea" placeholder="Описание игры"/>
                    </FormLayoutGroup>
                    <FormLayout>
                        <Checkbox>Подходит для новичков</Checkbox>
                    </FormLayout>
                    <Button size="xl">Создать</Button>
                </FormLayout>
            </ModalPage>
        );
    }

}

export default withPlatform(connect()(CreateGameModal));
