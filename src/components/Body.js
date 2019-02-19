import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({    
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
})

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.BASE_URL = "https://cors.io/?https://api.cryptonator.com/api/ticker/";
    } 
    
    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                </main>
            </div>
        )
    }  
}

Body.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);