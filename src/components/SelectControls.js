import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class SelectControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: props.orderBy ? props.orderBy : 'timestamp'
    };

    this.handleOrderChange = this.handleOrderChange.bind(this);
  }

  handleOrderChange(event) {
    this.setState({ orderBy: event.target.value });

    if (!this.props.onOrderChange) return;
    if (!(typeof this.props.onOrderChange === 'function')) return;

    this.props.onOrderChange(event.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.selectControlsContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="post-category">Category</InputLabel>
          <Select
            input={<Input name="category" id="post-category" />}
            value={this.props.selectedCategory ? this.props.selectedCategory : 'All'}>
            <MenuItem
              component={Link}
              to="/"
              value="All"
              style={{ textDecoration: 'none' }}>
              All
            </MenuItem>
            {
              this.props.categories.map((category, index) => (
                <MenuItem
                  component={Link}
                  to={`/posts/category/${category.name}`}
                  value={category.name}
                  key={index}
                  style={{ textDecoration: 'none' }}>
                  {category.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="order-by">Order by</InputLabel>
          <Select
            input={<Input name="order-by" id="order-by" />}
            value={this.state.orderBy}
            onChange={this.handleOrderChange}>
            <MenuItem value="timestamp">
              Timestamp
            </MenuItem>
            <MenuItem value="voteScore">
              Vote Score
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

export default connect(mapStateToProps)(withStyles(styles)(SelectControls));
