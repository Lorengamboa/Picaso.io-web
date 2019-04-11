
const styles = {
    button: color => {
        return {
          display: "block",
          fontFamily: "'Press Start 2P', cursive",
          margin: "0 auto",
          width: "100%",
          padding: "15px 10px",
          border: "2px solid black",
          background: color,
          borderRadius: "30px",
          fontSize: "1.5em",
          color: "white",
          transition: "0.3s ease-in-out",
          backgroundImage: `linear-gradient(to right, ${color+100} 0%, ${color+200} 51%, ${color+300} 100%)`
        }
    }
};

export default styles;