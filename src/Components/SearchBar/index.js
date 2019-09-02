import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {TextField,IconButton, Paper} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = theme => ({
  container: {
    padding: '2px 4px',
    alignItems: 'center',
    width: 400,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  iconButton: {
    padding: 25,
  },
});

const propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearchClick: PropTypes.func.isRequired,
}

class SearchBar extends PureComponent{
render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.container}>
            <TextField
                id="textBox"
                label="Terms"
                className={classes.textField}
                value={this.props.value}
                onChange={this.props.onChange}
                margin="normal"
            />
            <IconButton
                id="termbutton"
                onClick ={this.props.onSearchClick}
                aria-label="search"
                className={classes.iconButton}
            ><SearchIcon /></IconButton>
        </Paper>
    );
}
}
SearchBar.propTypes = propTypes;
export default withStyles(useStyles)(SearchBar);