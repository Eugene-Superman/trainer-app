import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    backgroundImage: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    color: "#fff",
    textTarnsform: "uppercase"
  },
  input: {
    display: "none"
  }
});

function ButtonComponent(props) {
  const { classes, buttonLabel, onClick, buttonImage } = props;
  const adiitionalStyles = props.buttonColor
    ? { backgroundImage: "none", backgroundColor: props.buttonColor }
    : null;
  return (
    <Button
      style={adiitionalStyles}
      variant="contained"
      className={classes.button}
      onClick={onClick}
    >
      {buttonLabel}
      {buttonImage}
    </Button>
  );
}

ButtonComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonColor: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonImage: PropTypes.object,
  onClick: PropTypes.func
};

export default withStyles(styles)(ButtonComponent);
