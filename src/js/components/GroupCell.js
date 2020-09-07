import React, {PureComponent} from 'react';

import {Avatar, Cell} from "@vkontakte/vkui";

class GroupCell extends PureComponent {

    render() {
        const {description, photo, name} = this.props;

        let desc = description.length > 0 ? description : "Описание отсутствует";

        return (
            <Cell
                description={desc}
                before={<Avatar size={40} src={photo}/>}
            >
                {name}
            </Cell>
        )
    }

}

export default GroupCell;