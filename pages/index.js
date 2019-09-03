import React, { useState, useEffect } from 'react';

function IndexComponent() {
    const [count, setCount] = useState(0);

    return (
        <div>{ count }</div>
    )
}


export default IndexComponent
