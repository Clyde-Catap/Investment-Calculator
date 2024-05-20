import React from "react";
import YearAndInvestments from './YearAndInvestments';

export default function TableGroup({tableHead, yearRow}) {
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
