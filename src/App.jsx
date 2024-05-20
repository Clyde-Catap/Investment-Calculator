import React from "react";
import { useState } from "react";
import Header from "./Header";
import TableGroup from "./TableGroup";

function App() {
    let yearMatrix = []
    const leftRow= ["INITITAL INVESTMENT", "EXPECTED RETURN"];
    const rightRow= ["ANNUAL INVESTMENT", "DURATION"];
    const tableHead = ['Year', 'Investment value', 'Interest(Year)', 'Total Interest', 'Invested Capital'];


    const [year, updateInvestments] = useState(yearMatrix);


    function numberOfYears(numberOfYears) {
        let initialYearMatrix = []; 
        for (let i = 0; i < numberOfYears; i++) {
            initialYearMatrix.push([i + 1, 0.0000, 0.0000, 0.0000, 0.0000]);
        }
        yearMatrix = initialYearMatrix;
    }
    
    

    function handleInputChange (event) {
      const inputName =  event.target.name;
      const inputValue = event.target.value;
      if(inputName == "DURATION"){
          numberOfYears(event.target.value);
          updateInvestments(yearMatrix);
      } 

    }

    return (
        <>
            <Header />
              <div className="input-group" id="user-input">
                  <div>
                      {leftRow.map((items, index) => (
                              
                          <div  key={index} id="row">
                              <label>{items}</label>
                              <input onChange={handleInputChange} type="number" defaultValue="0" min="0" name={items}/>
                          </div>

                      ))}
                  </div>
                  <div>
                      {rightRow.map((items, index) => (
                              
                          <div key={index} id="row">
                              <label>{items}</label>
                              <input onChange={handleInputChange} type="number" defaultValue="0" min="0" name={items}/>
                          </div>

                      ))}
                  </div>
              </div>
            <TableGroup tableHead={tableHead} yearRow={year} />
        </>
    );
}

export default App;
