'use strict';

const messageStyles = {
    container: color => {
        return {
            color,
            marginBottom: "10px",
            backgroundColor: "#f6f6f6",
            borderRadius: "12px",
            wordWrap: "break-word",
            padding: ".5rem .5rem"
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
    username: color => {
        return {
            color,
            border: "none",
            background: "none",
            borderRadius: "0",
            padding: "0"
        }
    },
    message: {
        marginLeft: "5px",
        width: "100%"
    }
};

export default messageStyles;