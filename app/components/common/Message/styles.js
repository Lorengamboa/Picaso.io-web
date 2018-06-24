'use strict';

const messageStyles = {
    container: color => {
        return {
            color,
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            backgroundColor: "#f6f6f6",
            borderRadius: "12px"
        }
    },
    userIcon: userColor => {
        return {
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            backgroundColor: userColor
        }
    },
    message: {
        marginLeft: "5px"
    }
};

export default messageStyles;