import React, { Component } from "react";
import PropTypes from "prop-types";
import fetch from "isomorphic-fetch";
import {
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import toPairs from 'lodash/toPairs';
import sortBy from 'lodash/sortBy';
import Header from "../Components/Header";
import SearchBar from "../Components/SearchBar";
import FeatureTable from "../Components/FeatureTable" 
import SentenceTable from "../Components/SentenceTable"
const URL = "https://api-demo.sentisum.com/api/v1/comments/textsearch?";
const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  toggleLabel : {
    padding: theme.spacing(0.5),
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termvalue: "",
      topFeatures: [],
      sentences: {},
      isSentenceDisplay: false
    };
    this.handleOnSearchChange = this.handleOnSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.renderFeatureOrSentenceTable = this.renderFeatureOrSentenceTable.bind(this);
  }

  handleOnSearchChange(e) {
    this.setState({
      termvalue: e.target.value
    });
  }
  handleSearchClick(e) {
    var url = `${URL}source=dhl-parcel&terms=${this.state.termvalue}&sentiment=all&apiKey=AU_WtVnh93Tixe_CNZqp`;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var pairs = toPairs(json.topFeatures);
        var sortedPairs = sortBy(pairs, function (p) {return p[1]});
        var sentencePairs = toPairs(json.sentences);
        this.setState({ topFeatures: sortedPairs, sentences: sentencePairs });
      });
  }

  handleToggleChange() {
    this.setState({
      isSentenceDisplay: !this.state.isSentenceDisplay
    });
  }

  renderFeatureOrSentenceTable() {
      return !this.state.isSentenceDisplay ? <SentenceTable {...this.state.sentences}></SentenceTable> : <FeatureTable topFeatures = {this.state.topFeatures}  />
  }

  

  render() {
    const searchBarProps = {
      value: this.state.termvalue,
      onChange: this.handleOnSearchChange,
      onSearchClick: this.handleSearchClick
    };

    const featureTableProps = {
        topFeatures: this.state.topFeatures
    }
    const { classes } = this.props;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header></Header>
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          item
          xs={12}
        >
          <SearchBar {...searchBarProps}></SearchBar>
        </Grid>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          item
          xs={12}
        >
          <Paper className={classes.paper}>
            <FormControlLabel
              value="start"
              control={<Switch color="secondary" />}
              label="Sentences"
              labelPlacement="start"
              onChange={this.handleToggleChange}
            />
            <FormLabel className={classes.toggleLabel}>  Top Features</FormLabel>
          </Paper>
        </Grid>
        <Grid container
          spacing={0}
          alignItems="center"
          justify="center"
          item
          xs={12}>{this.renderFeatureOrSentenceTable()}</Grid>
      </Grid>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(HomePage);
