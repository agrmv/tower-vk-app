import React from 'react';
import {connect} from 'react-redux';

import {setPage} from "../../store/router/actions";
import {setActiveTab, setScrollPositionByID} from "../../store/vk/actions";
import {restoreScrollPosition} from "../../services/_functions";

import {Div, FixedLayout, Group, HorizontalScroll, Panel, PanelHeader, Tabs, TabsItem} from "@vkontakte/vkui";

class HomePanelProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: "test"
        };
    }

    setTab(tab) {
        this.setState({
            activeTab: tab
        });
    }

    componentWillUnmount() {
        const {setScrollPositionByID, setActiveTab} = this.props;

        setActiveTab("EXAMPLE", this.state.activeTab);
        setScrollPositionByID("MENU_LIST");
    }

    componentDidMount() {
        restoreScrollPosition();
    }

    render() {
        const {id} = this.props;
        const boxStyle = {marginTop: 56};

        return (
            <Panel id={id}>
                <PanelHeader noShadow={true}>Examples 2</PanelHeader>
                <FixedLayout vertical="top">
                    <Tabs theme="header" mode="default">
                        <HorizontalScroll id="MENU_LIST">
                            <TabsItem
                                onClick={() => this.setTab('test')}
                                selected={this.state.activeTab === 'test'}
                            >
                                Для теста
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setTab('test2')}
                                selected={this.state.activeTab === 'test2'}
                            >
                                Для теста 2
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setTab('test3')}
                                selected={this.state.activeTab === 'test3'}
                            >
                                Для теста 3
                            </TabsItem>
                        </HorizontalScroll>
                    </Tabs>
                </FixedLayout>
                <Group style={boxStyle}>
                    {<Div>{this.state.activeTab}</Div>}
                </Group>
            </Panel>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        activeTab: state.vkui.activeTab,
    };
};

const mapDispatchToProps = {
    setPage,
    setActiveTab,
    setScrollPositionByID
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePanelProfile);
