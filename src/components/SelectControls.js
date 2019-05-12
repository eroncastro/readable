import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = {
  selectControlsContainer: {
    display: 'flex-row',
    justifyContent: 'space-evenly'
  },
  formControl: {
    margin: '20px',
    minWidth: 120
  }
};

// Refactor component using propTypes
function SelectControls(props) {
  const { classes } = props;

  return (
    <div className={classes.selectControlsContainer}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select input={<Input name="category" id="category" />} value="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            props.categories.map((category, index) => (
              <MenuItem value={category.name} key={index}>
                {category.name}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="order-by">Order by</InputLabel>
        <Select input={<Input name="order-by" id="order-by" />} value="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="timestamp">
            Timestamp
          </MenuItem>
          <MenuItem value="votescore">
            Vote Score
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SelectControls));
