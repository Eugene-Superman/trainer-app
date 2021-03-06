import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addExercise } from "redux/actions";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SelectItem from "components/Select/Select.jsx";
import ButtonComponent from "components/Button/Button.jsx";

import { WEIGHT_MEASUREMENTS } from "constants/constants";

const mapStateToProps = state => ({
  exercises: state.allExercises
});

const mapDispatchToProps = {
  addExercise
};

class NewExercise extends React.Component {
  state = { exerciseId: null, exerciseName: "", measurementType: "" };

  componentDidMount = () => {
    this.setState({ exerciseId: this.giveId() });
  };

  setExerciseName = event => {
    this.setState({ exerciseName: event.target.value });
  };

  handleSelect = value => {
    this.setState({ measurementType: WEIGHT_MEASUREMENTS[value] });
  };

  giveId = () => {
    const { exercises } = this.props;
    const { exerciseId } = this.state;
    let newId = null;
    if (exercises.length === 0 && !exerciseId) {
      newId = 1;
    } else if (exerciseId) {
      newId = exerciseId + 1;
    } else if (exercises.length > 0 && !exerciseId) {
      newId = exercises.reduce(
        (acc, element) =>
          (acc = acc > element.exerciseId ? acc : element.exerciseId),
        0
      );
      newId = newId + 1;
    }
    return newId;
  };

  submitExercise = () => {
    if (this.state.exerciseName && this.state.measurementType) {
      this.setState({ exerciseId: this.giveId() });
      this.props.addExercise(this.state);
    }
  };

  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4>Create new exercise</h4>
                <p>Please, add a new exercise name and measurement type</p>
              </CardHeader>
              <CardBody>
                <CustomInput
                  onChange={this.setExerciseName}
                  labelText="Username"
                  id="username"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <SelectItem
                  selectHeader="Measurement type"
                  arrayForSelect={WEIGHT_MEASUREMENTS}
                  updateData={this.handleSelect}
                  selectFor="measure"
                />
                <ButtonComponent
                  onClick={() => this.submitExercise()}
                  buttonLabel="create exercise"
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

NewExercise.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object),
  addExercise: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewExercise);
