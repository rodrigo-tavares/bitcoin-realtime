import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import PriceCard from './PriceCard';
//import axios from 'axios';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Grid } from '@material-ui/core';

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

ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.BASE_URL = "https://cors.io/?https://api.cryptonator.com/api/ticker/";
        this.chartRef = null;
        this.state = {
            btcusd: '-',
            ltcusd: '-',
            ethusd: '-',
            showChart: false,
            initValue: 0,
            dataSource : {
                "chart": {
                    "caption": "Bitcoin Timeline",
                    "subCaption": "",
                    "xAxisName": "Local Time",
                    "yAxisName": "USD",
                    "numberPrefix": "$",
                    "refreshinterval": "2",
                    "slantLabels": "1",
                    "numdisplaysets": "10",
                    "labeldisplay": "rotate",
                    "showValues": "0",
                    "showRealTimeValue": "0",
                    "theme": "fusion"    
                },
                "categories": [{
                    "category": [{
                        "label": this.clientDateTime().toString()
                    }]
                }],
                "dataset": [{
                    "data": [{
                        "value": 0
                    }]
                }]
            }
        };
        this.chartConfigs = {
            type: 'realtimeline',
            renderAt: 'container',
            width: '100%',
            height: '350',
            dataFormat: 'json'
        };
    } 
    componentDidMount() {
        this.getDataFor("btc-usd", "btcusd");
        this.getDataFor("ltc-usd", "ltcusd");
        this.getDataFor("eth-usd", "ethusd");
    }

    startUpdatingData(){
        setInterval(() => {
            fetch(this.BASE_URL + 'btc-usd')
            .then(res => res.json())
            .then(d => {
                let x_axis = this.clientDateTime();
                let y_axis = d.ticker.price;
                this.chartRef.feedData("&label=" + x_axis + "&value=" + y_axis);
            });
        }, 3000);
    }


    getDataFor(conversion, prop){
        fetch(this.BASE_URL + conversion, {
            mode: 'cors'
        })
        .then(res => res.json())
        .then(d => {
            if(prop === 'btcusd'){
                const dataSource = this.state.dataSource;
                dataSource.chart.yAxisMaxValue =  parseInt(d.ticker.price) + 5;
                dataSource.chart.yAxisMinValue =  parseInt(d.ticker.price) - 5;
                dataSource.dataset[0]['data'][0].value = d.ticker.price;
                this.setState({
                    showChart: true,
                    dataSource: dataSource,
                    initValue: d.ticker.price
                }, ()=>{
                    
                    this.startUpdatingData();
                })
            }

            this.setState({
                [prop]: d.ticker.price
            });
        })
        
    }

    clientDateTime() {
        var date_time = new Date();
        var curr_hour = date_time.getHours();
        var zero_added_curr_hour = Body.addLeadingZero(curr_hour);
        var curr_min = date_time.getMinutes();
        var curr_sec = date_time.getSeconds();
        var curr_time = zero_added_curr_hour + ':' + curr_min + ':' + curr_sec;
        return curr_time
    }

    static addLeadingZero(num) {
        return (num <= 9) ? ("0" + num) : num;
    }
    
    getChartRef(chart){
        this.chartRef = chart;
    }

    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    
                            <div className="card-deck custom-card-deck">
                                <Grid container direction="row" justify="center" alignItems="center" spacing={24}>
                                    <PriceCard header="Bitcoin(BTC)" src={'/bitcoin.png'} alt="fireSpot" label="(Price in USD)"   value={this.state.btcusd} />
                                    <PriceCard header="Litecoin(LTC)"   src={'/litecoin.png'} alt="fireSpot" label="(Price in USD)"  value={this.state.ltcusd}/>
                                    <PriceCard header="Ethereum(ETH)" src={'/ethereum.png'} alt="fireSpot" label="(Price in USD)"    value={this.state.ethusd}/>
                                </Grid>
                            </div>      
                            <div className="card custom-card">
                                <Grid container direction="row" justify="center" alignItems="center" spacing={12}>
                                    <Grid item xs={12} sm={9}>
                                    <div className="card-body">
                                        {
                                            this.state.showChart ? 
                                            <ReactFC {...this.chartConfigs} dataSource={this.state.dataSource} onRender={this.getChartRef.bind(this)}/>: null
                                        }
                                    </div>
                                    </Grid>                                
                                </Grid>
                            </div>
                        
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