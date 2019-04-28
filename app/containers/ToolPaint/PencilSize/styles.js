'use strict';

const styles = {
    block: {
        display: "inline-block"
    },
    dot: size => {
        return {
            height: `${size}vh`,
            width: `${size}vh`,
            marginLeft: "10px",
            backgroundColor: "black",
            borderRadius: "50%",
            display: "inline-block"
        }
    },
};

export default styles;