'use strict';

import ReactDOM from "react-dom";
import { router } from './config/router';
import floodFill from 'Shared/floodFill';

CanvasRenderingContext2D.prototype.floodFill = floodFill;

ReactDOM.render(router, document.getElementById("root"));