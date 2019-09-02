import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 300
  }
});

const propTypes = {
    topFeatures: PropTypes.array.isRequired
};

class FeatureTable extends PureComponent {
  render() {
    function createData(feature, value) {
      return { feature, value };
    }

    const { classes } = this.props;
    const features = this.props.topFeatures;

    const allfeatures = [];
    for (var i = 0; i < Math.min(features.length, 50); i++) {
      allfeatures.push(createData(features[i][0], features[i][1]));
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Feature</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allfeatures.map(row => (
              <StyledTableRow key={row.feature}>
                <StyledTableCell component="th" scope="row">
                  {row.feature}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

FeatureTable.propTypes = propTypes;
export default withStyles(useStyles)(FeatureTable);
