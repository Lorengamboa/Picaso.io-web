'use strict';

import React from 'react';

const Palette = (props) => {
    return (
        <div>
            <ul className="colors">
                <li data-color="#2ecc71"></li>
                <li data-color="#D64A4B"></li>
                <li data-color="#8e44ad"></li>
                <li class="active-color" data-color="#46a1de"></li>
                <li data-color="#bdc3c7"></li>
                <li class="active-color" data-color="#46a1de"></li>
                <li class="active-color" data-color="#46a1de"></li>
            </ul>
        </div>
    )
}

export default Palette;