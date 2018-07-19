"use strict";

const BinRecycler = (canvas) => {
    const { width, height } = canvas;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);
};

export default BinRecycler;

    