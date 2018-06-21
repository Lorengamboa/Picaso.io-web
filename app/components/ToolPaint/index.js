'use strict';

import React, { Component } from 'react';
import Palette from './Palette';

class ToolPaint extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="palette">
                <Palette />
            </div>
        )
    }
}

export default ToolPaint;