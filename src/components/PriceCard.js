import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const styles = {
    card: {
      minWidth: 275,
      marginBottom: 40,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

const PriceCard = (props) => {
    
    const { classes } = props;

    const value = typeof parseInt(props.value) === 'number' && !isNaN(parseInt(props.value)) ? Math.round(parseInt(props.value)) : props.value;
    return (
        <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
                <div className="card-body">
                    <img src={props.src} alt={props.src} className = "img-responsive float-right"  />
                    <h6 className="card-title mb-4 ">{props.header} </h6>
                    <h2 className="mb-1 text-primary">${value}</h2>
                    <p className="card-text"><small className="text-muted">{props.label}</small></p>
                    
                </div>
            </Card>
        </Grid>             
    )
};


PriceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriceCard);