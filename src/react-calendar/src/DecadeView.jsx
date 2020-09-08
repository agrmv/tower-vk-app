import React from 'react';

import Years from './DecadeView/Years.jsx';

export default function DecadeView(props) {
    function renderYears() {
        return (
            <Years {...props} />
        );
    }

    return (
        <div className="react-calendar__decade-view">
            {renderYears()}
        </div>
    );
}
