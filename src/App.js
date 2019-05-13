import React, {Component} from 'react';
import Table from './Table';

var tableNumbers = {
    "B1": 0,
    "B2": 1,
    "Pod": 2,
};

var rowNumbers = {
    "Voltage": 0,
    "Current": 1,
    "Temp": 2,
    "M1": 0,
    "M2": 1,
    "M3": 2,
    "M4": 3,
};

var columnNumbers = {
    "Min": 0,
    "Max": 1,
    "Avg": 2,
};


//tableNum and rowNum starts at index 0
function updateValue(tableString,newValue)
{
    window.appComponent.updateCell(tableString,newValue);
}

class App extends Component {
    constructor(props) {
        super(props);
        window.appComponent = this;
        this.state = {

            //each index of tables array indicates different table; can have mapping function
            //array indexes correspond to data's row numbers from 0 to n-1 rows
            livetables: [
                {
                    tableName: "Battery",
                    tableLabel: "1",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                    minValues: [20,21,22],
                    maxValues: [40,41,42],
                    values: Array(3).fill(-1),
                    bgColors: Array(3).fill('aqua')
                },
                {
                    tableName: "Battery",
                    tableLabel: "2",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                    minValues: [20,21,22],
                    maxValues: [40,41,42],
                    values: Array(3).fill(-1),
                    bgColors: Array(3).fill('aqua')
                },
                {
                    tableName: "Pod",
                    tableLabel: "",
                    labels: ['Temperature','Motor 1 Current','Motor 2 Current','Motor 3 Current','Motor 4 Current'],
                    rows: 5,
                    minValues: [20,21,22,23,24],
                    maxValues: [40,41,42,43,44],
                    values: Array(5).fill(-1),
                    bgColors: Array(5).fill('aqua')
                }
            ],

            overalltables: [
                {
                    tableName: "Battery",
                    tableLabel: "1",
                    labels: ['Min','Current','Temperature'],
                    rows: 3,
                    values: [
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                    ],
                    bgColors: Array(3).fill('white'),
                },
                {
                    tableName: "Battery",
                    tableLabel: "2",
                    labels: ['Voltage','Current','Temperature'],
                    rows: 3,
                    values: [
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                        Array(3).fill(-1),
                    ],
                    bgColors: Array(3).fill('white'),
                },
                {
                    tableName: "Pod",
                    tableLabel: "",
                    labels: ['Temperature','Motor 1 Current','Motor 2 Current','Motor 3 Current','Motor 4 Current'],
                    rows: 5,
                    values: [
                        Array(5).fill(-1),
                        Array(5).fill(-1),
                        Array(5).fill(-1),
                    ],
                    bgColors: Array(5).fill('white'),
                }
            ],
        };
    }

    updateCell(tableString,newValue)
    {
        const updatedState = this.state;

        let newColor = 'lightgreen';
        let tableNum;
        let rowNum;
        let modifyLive;
        let columnNum;
        let parsedTableString = tableString.split("_");

        if (parsedTableString.length() != 3)
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }

        //properly set tableNum index
        if (!(parsedTableString[0] in tableNumbers))
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }
        else
            tableNum = tableNumbers[parsedTableString[0]];

        //properly set rowNum
        if (!(parsedTableString[1] in rowNumbers))
        {
            console.log("Error: table string for update function is invalid.")
            return;
        }
        else
            rowNum = tableNumbers[parsedTableString[1]];

        //properly set columnNum
        if (parsedTableString[2] == "Actual")
            modifyLive = true;
        else
        {
            modifyLive = false;
            if (!(parsedTableString[2] in columnNumbers))
            {
                console.log("Error: table string for update function is invalid.")
                return;
            }
            else
                columnNum = columnNumbers[parsedTableString[2]];
        }

        //update value and bgColor in state object
        if (modifyLive)
        {
            if (newValue < this.state.livetables[tableNum].minValues[rowNum] || newValue > this.state.tables[tableNum].maxValues[rowNum])
                newColor = '#ff4d4d';

            updatedState.livetables[tableNum].values[rowNum] = newValue;
            updatedState.livetables[tableNum].bgColors[rowNum] = newColor;
        }
        else
        {
            updatedState.overalltables[tableNum].values[columnNum][rowNum] = newValue;
        }

        this.setState(updatedState);
        
    }

    //handleSubmit function used by button as a functionality test method for the updateValue function
    handleSubmit(event) {
        updateValue(0,1,56);
    }

    render() {
        return (
            <div className="container">
            	<br />
                <br />
            	<div className="title">
                    Pod Health Viewer - UCLA Bruin HYPErloop
                </div>
                <br />

                <div className="tableTitle">
                    Battery
                </div>

                <table class="parent">
                    <div class="leftcolumn">
                        <Table
                        tableLabel="1"
                        labels={this.state.livetables[0].labels}
                        minValues={this.state.livetables[0].minValues}
                        maxValues={this.state.livetables[0].maxValues}
                        values={this.state.livetables[0].values}
                        bgColors={this.state.livetables[0].bgColors}
                        rows={3}
                        />

                        <Table
                        tableLabel="2"
                        labels={this.state.livetables[1].labels}
                        minValues={this.state.livetables[1].minValues}
                        maxValues={this.state.livetables[1].maxValues}
                        values={this.state.livetables[1].values}
                        bgColors={this.state.livetables[1].bgColors}
                        rows={3}
                        />

                    </div>
                    <div class="rightcolumn">
                        <Table
                        tableLabel="1"
                        labels={this.state.overalltables[0].labels}
                        minValues={this.state.overalltables[0].values[0]}
                        maxValues={this.state.overalltables[0].values[1]}
                        values={this.state.overalltables[0].values[2]}
                        bgColors={this.state.overalltables[0].bgColors}
                        rows={3}
                        />

                        <Table
                        tableLabel="2"
                        labels={this.state.overalltables[1].labels}
                        minValues={this.state.overalltables[1].values[0]}
                        maxValues={this.state.overalltables[1].values[1]}
                        values={this.state.overalltables[1].values[2]}
                        bgColors={this.state.overalltables[1].bgColors}
                        rows={3}
                        />
                    </div>
                </table>

                <br />

                <div className="tableTitle">
                    Pod
                </div>

                <table class="parent">
                    <div class="leftcolumn">
                        <Table
                            labels={this.state.livetables[2].labels}
                            minValues={this.state.livetables[2].minValues}
                            maxValues={this.state.livetables[2].maxValues}
                            values={this.state.livetables[2].values}
                            bgColors={this.state.livetables[2].bgColors}
                            rows={5}
                        />
                    </div>
                    <div class="rightcolumn">
                        <Table
                            labels={this.state.overalltables[2].labels}
                            minValues={this.state.overalltables[2].values[0]}
                            maxValues={this.state.overalltables[2].values[1]}
                            values={this.state.overalltables[2].values[2]}
                            bgColors={this.state.overalltables[2].bgColors}
                            rows={5}
                        />
                    </div>
                </table>
            </div>
        );
    }
}

export default App;