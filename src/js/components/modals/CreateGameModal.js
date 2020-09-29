import React from 'react';
import {connect} from 'react-redux';

import {IOS, ModalPage, ModalPageHeader, PanelHeaderButton, withPlatform} from "@vkontakte/vkui";

import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

class CreateGameModal extends React.Component {

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
                        Модальное окно для создания игры
                    </ModalPageHeader>
                }
                onClose={onClose}
                settlingHeight={80}
            >
                TODO
            </ModalPage>
        );
    }

}

export default withPlatform(connect()(CreateGameModal));
