'use strict';

import React, { Component } from 'react';
import Palete from './Palete';

/**
 * @class ToolPaint
 * @desc
 */
class ToolPaint extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="palette">
                <Palete />
            </div>
        )
    }
}

export default ToolPaint;