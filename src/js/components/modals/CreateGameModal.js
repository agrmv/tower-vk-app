import React from 'react';
import {connect} from 'react-redux';

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Gallery from '@vkontakte/icons/dist/24/gallery';
import {
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
    Button,
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
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                <ModalPageHeader>
                    Заявить новую игру
                </ModalPageHeader>
                {/*TODO когда появится бэк добавить стейты/пропсы для сабмита*/}
                <FormLayout>
                    <FormLayoutGroup top="Название игры">
                        <Input type="text" placeholder="Введите название"/>
                    </FormLayoutGroup>
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
                        <Input type="date"/>
                    </FormLayoutGroup>
                    <FormLayout>
                        {/*TODO количесвто столов вынести в конфиг, а тут заебашить циклом*/}
                        {/*TODO а еще ебать надо как то чекать свободные*/}
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
