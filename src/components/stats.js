import React from 'react'
import { BarChart } from 'react-easy-chart'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import shotImage from '../static/media/target-shot.svg'
import hitImage from '../static/media/helmet-head-shot.svg'
import woundImage from '../static/media/open-wound.svg'
import unsavedImage from '../static/media/armor-downgrade.svg'
import damageImage from '../static/media/wrapped-heart.svg'
import killImage from '../static/media/death-zone.svg'
//import questionImage from '../static/media/magnifying-glass.svg'

class Stat extends React.Component {
    transformData = (data, dist) => {
        if(dist === "standard") {
            let prob = []
            data.forEach((value, index) => {
                prob.push({
                    x: `${index}`,
                    y: value/100
                })
            })
            return prob
        } else {
            let probplus = []
            let sum = 0.0
            for(let i = data.length-1; i >= 0; i--) {
                let value = data[i]
                if(value) {
                    sum += value
                    probplus.unshift({
                        x: `${i}+`,
                        y: sum/100,
                        color: '#f00'
                    })
                }
            }
            return probplus
        }
    }

    render() {
        return (
            <div className="stat">
                <div className="stat-title">
                    {this.props.title}
                    <img style={{float: 'right'}} src={this.props.image} alt={this.props.title} width={25} height={25}/>
                </div>
                <div className="stat-data">
                    <BarChart
                        axisLabels={{x: 'Shots', y: 'Percent'}}
                        axes
                        width={250}
                        height={175}
                        data={this.transformData(this.props.data, this.props.dist)}
                    />
                </div>
            </div>
        )
    }
}

class Median extends React.Component {
    transformData = (data, thresh) => {
        let sum = 0.0
        for(let i = data.length-1; i >= 0; i--) {
            let value = data[i]
            if(value) {
                sum += value
                if (sum >= thresh) {
                    return i
                }
            }
        }
        return ""
    }

    render() {
        return (
            <div className="median">
                <div className="median-title">
                    {this.props.title}
                    <img style={{float: 'right'}} src={this.props.image} alt={this.props.title} width={25} height={25}/>
                </div>
                <div className="median-data">
                    <div>100%: {this.transformData(this.props.data, 99.9)}</div>
                    <div>75%: {this.transformData(this.props.data, 75.0)}</div>
                    <div>50%: {this.transformData(this.props.data, 50.0)}</div>
                    <div>25%: {this.transformData(this.props.data, 25.0)}</div>
                </div>
            </div>
        )
    }
}

class Data extends React.Component {
    transformData = (data) => {
        let probplus = []
        let sum = 0.0
        for(let i = data.length-1; i >= 0; i--) {
            let value = data[i]
            if(value) {
                sum += value
                probplus.unshift({
                    cum: `${i}+`,
                    cum_prob: (sum/100).toFixed(2),
                    value: `${i}`,
                    value_prob: (value/100).toFixed(2)
                })
            }
        }
        return probplus
    }

    render() {
        const data = this.transformData(this.props.data)
        return (
            <div className="median">
                <div className="median-title">
                    {this.props.title}
                    <img style={{float: 'right'}} src={this.props.image} alt={this.props.title} width={25} height={25}/>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Num</th>
                            <th>(p)</th>
                            <th>&nbsp;&nbsp;</th>
                            <th>Num+</th>
                            <th>(p)</th>
                        </tr>
                        {data.map((row)  => (
                            <tr>
                                <td>{row.value}</td>
                                <td>{row.value_prob}</td>
                                <th>&nbsp;&nbsp;</th>
                                <td>{row.cum}</td>
                                <td>{row.cum_prob}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        )
    }
}

function RenderStat(props) {
    const { stat, image, title, dist } = props
    if(stat) {
        return <Stat data={stat} image={image} title={title} dist={dist}/>
    }
    return ""
}

function RenderMedian(props) {
    const { stat, title, image } = props
    if(stat) {
        return <Median data={stat} image={image} title={title}/>
    }
    return ""
}

function RenderData(props) {
    const { stat, title, image } = props
    if(stat) {
        return <Data data={stat} image={image} title={title}/>
    }
    return ""
}

function Stats(props) {
    const { stats } = props
    const tt_cum = "This distribution shows the liklihood on the Y-Axis that a particular result will be that much or larger."
    const tt_dist = "This distribution shows the liklihood on the Y-Axis for each particular result."
    const tt_med = "This shows what the result will be where half of all results are lower and half are higher"
    const tt_data = "This shows a probability table.  First column is how many succeded for that step.  Second is the probability of those results.  Third is a result *or better*.  Fourth is the probability of the third column."

    if(stats) {
        return (
            <div className='statistics-container'>
                <Tabs>
                  <TabList>
                    <Tab>
                        <a data-tip={tt_cum}>Cumulative Distribution</a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Tab>
                    <Tab>
                        <a data-tip={tt_dist}>Distribution</a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Tab>
                    <Tab>
                        <a data-tip={tt_med}>Median</a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Tab>
                    <Tab>
                        <a data-tip={tt_data}>Data</a>
                        <ReactTooltip place="top" type="dark" effect="float"/>
                    </Tab>
                 </TabList>
                 <TabPanel>
                    { stats && stats.map((stat) => (
                        <div key={stat.id} className='statistics-container'>
                            <RenderStat stat={stat.shots} image={shotImage} title="Shots" dist="cumulative"/>
                            <RenderStat stat={stat.hits} image={hitImage} title="Hits" dist="cumulative"/>
                            <RenderStat stat={stat.wounds} image={woundImage} title="Wounds" dist="cumulative"/>
                            <RenderStat stat={stat.unsaved} image={unsavedImage} title="Unsaved Wounds" dist="cumulative"/>
                            <RenderStat stat={stat.damage} image={damageImage} title="Total Damage" dist="cumulative"/>
                            <RenderStat stat={stat.allocate} image={killImage} title="Models Killed" dist="cumulative"/>
                        </div>
                    ))}
                 </TabPanel>
                 <TabPanel>
                    { stats && stats.map((stat) => (
                        <div key={stat.id} className='statistics-container'>
                            <RenderStat stat={stat.shots} image={shotImage} title="Shots" dist="standard"/>
                            <RenderStat stat={stat.hits} image={hitImage} title="Hits" dist="standard"/>
                            <RenderStat stat={stat.wounds} image={woundImage} title="Wounds" dist="standard"/>
                            <RenderStat stat={stat.unsaved} image={unsavedImage} title="Unsaved Wounds" dist="standard"/>
                            <RenderStat stat={stat.damage} image={damageImage} title="Total Damage" dist="standard"/>
                            <RenderStat stat={stat.allocate} image={killImage} title="Models Killed" dist="standard"/>
                        </div>
                    ))}
                 </TabPanel>
                 <TabPanel>
                    { stats && stats.map((stat) => (
                        <div key={stat.id} className='statistics-container'>
                            <RenderMedian stat={stat.shots} image={shotImage} title="Shots"/>
                            <RenderMedian stat={stat.hits} image={hitImage} title="Hits"/>
                            <RenderMedian stat={stat.wounds} image={woundImage} title="Wounds"/>
                            <RenderMedian stat={stat.unsaved} image={unsavedImage} title="Unsaved Wounds"/>
                            <RenderMedian stat={stat.damage} image={damageImage} title="Total Damage"/>
                            <RenderMedian stat={stat.allocate} image={killImage} title="Models Killed"/>
                        </div>
                    ))}
                 </TabPanel>
                 <TabPanel>
                    { stats && stats.map((stat) => (
                        <div key={stat.id} className='statistics-container'>
                            <RenderData stat={stat.shots} image={shotImage} title="Shots"/>
                            <RenderData stat={stat.hits} image={hitImage} title="Hits"/>
                            <RenderData stat={stat.wounds} image={woundImage} title="Wounds"/>
                            <RenderData stat={stat.unsaved} image={unsavedImage} title="Unsaved Wounds"/>
                            <RenderData stat={stat.damage} image={damageImage} title="Total Damage"/>
                            <RenderData stat={stat.allocate} image={killImage} title="Models Killed"/>
                        </div>
                    ))}
                 </TabPanel>
                </Tabs>

            </div>
        )
    }
}

export default connect( (state) =>  ({
    stats: state.stats
}))(Stats)
