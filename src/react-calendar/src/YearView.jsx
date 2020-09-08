import React from 'react';

import Months from './YearView/Months.jsx';

export default function YearView(props) {
    function renderMonths() {
        return (
            <Months {...props} />
        );
    }

    return (
        <div className="react-calendar__year-view">
            {renderMonths()}
        </div>
    );
}
