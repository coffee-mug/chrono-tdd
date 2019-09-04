import React, { useState, useEffect } from 'react';
import { ChronoListComponent } from '../components/Chrono'

function IndexComponent() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <ChronoListComponent chronos={[]}/>
        </div>
    )
}

export default IndexComponent
