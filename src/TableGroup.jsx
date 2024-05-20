import React from "react";
import YearAndInvestments from './YearAndInvestments';  // Make sure to import the component

export default function TableGroup() {
    const tableHead = ['Year', 'Investment value', 'Interest(Year)', 'Total Interest', 'Invested Capital'];
    const yearRow = [
        ["1",'2315','0.9991','89123','89623'],
        ["2",'2315','0.9991','89123','89623'],
        ["3",'2315','0.9991','89123','89623'],
        ["4",'2315','0.9991','89123','89623'],
        ["5",'2315','0.9991','89123','89623'],
        ["6",'2315','0.9991','89123','89623'],
        ["7",'2315','0.9991','89123','89623'],
        ["8",'2315','0.9991','89123','89623'],
        ["9",'2315','0.9991','89123','89623'],
        ["10",'2315','0.9991','89123','89623'],
        ["11",'2315','0.9991','89123','89623'],
        ["12",'2315','0.9991','89123','89623']
    ];

    return (
        <table id="result">
            <thead>
                <tr>
                    {tableHead.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {yearRow.map((row, index) => (
                    <tr key={index}>
                        <YearAndInvestments YearAndInvestments={row} />
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
