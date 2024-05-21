import React from "react";
import { useState } from "react";
import Header from "./Header";
import TableGroup from "./TableGroup";
import { calculateInvestmentResults } from "./util/investment";

function App() {
    let investmentMatrix = []
    const leftRow= ["INITIAL INVESTMENT", "EXPECTED RETURN"];
    const rightRow= ["ANNUAL INVESTMENT", "DURATION"];
    const tableHead = ['Year', 'Investment value', 'Interest(Year)', 'Total Interest', 'Invested Capital'];


    const [matrix, updateMatrix] = useState(investmentMatrix);
    const [initialInvestment, updateInitialInvestment] = useState('');
    const [expectedReturn, updateExpectedReturn] = useState('');
    const [annualInvestment, updateAnnualInvestment] = useState('');
    const [duration, updateDuration] = useState('');


    function numberOfYears(numberOfYears) {
        let initialYearMatrix = [];

        for (let i = 0; i < Number(numberOfYears); i++) {
            let investments = calculateInvestmentResults({
                initialInvestment: Number(initialInvestment),
                annualInvestment: Number(annualInvestment),
                expectedReturn: Number(expectedReturn),
                duration: Number(i+1),
              });

            let computedInterest = Number(investments[i]['interest']);
            let computedTotalInterest = computeTotalInterest(investments);
            let totalInvestedCapital = computeInvestedCapital(Number(initialInvestment), Number(annualInvestment), Number(i+1));
            let computedInvestedValue = Number(investments[i]['valueEndOfYear']);

            initialYearMatrix.push([i + 1, "$" + computedInvestedValue.toFixed(2), "$" + computedInterest.toFixed(2), "$" + computedTotalInterest.toFixed(2), "$" + totalInvestedCapital.toFixed(2)]);
        }

        investmentMatrix = initialYearMatrix;
    }
    function computeTotalInterest (investments){
        let computedTotalInterest = 0;
        for (let i in investments){
            computedTotalInterest += investments[i]['interest']
        }
        return Number(computedTotalInterest);
    }

    function computeInvestedCapital(initialCapital, annualCapital, numberOfYears){
        let totalInvestedCapital = initialCapital;
        totalInvestedCapital += ((numberOfYears)*annualCapital)

        return totalInvestedCapital;
    }

    
    

    function handleInputChange (event) {

      const inputName =  event.target.name;
      const inputValue = Number(event.target.value);
      if(inputName == "DURATION"){
          numberOfYears(inputValue);
          updateMatrix(investmentMatrix);
          updateDuration(inputValue)
      }
      if (inputName == "INITIAL INVESTMENT") {
        updateInitialInvestment(inputValue);
        console.log(typeof inputValue)
        if (duration != "") {
            numberOfYears(duration);
            updateMatrix(investmentMatrix);
        }

      }
      if (inputName == "EXPECTED RETURN") {
        updateExpectedReturn(inputValue);
        if (duration != "") {
            numberOfYears(duration);
            updateMatrix(investmentMatrix);
        }

      }
      if (inputName == "ANNUAL INVESTMENT") {
        updateAnnualInvestment(inputValue);
        if (duration != "") {
            numberOfYears(duration);
            updateMatrix(investmentMatrix);
        }

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
                              <input onChange={handleInputChange} type="number" placeholder="0" min="0" name={items}/>
                          </div>

                      ))}
                  </div>
                  <div>
                      {rightRow.map((items, index) => (
                              
                          <div key={index} id="row">
                              <label>{items}</label>
                              <input onChange={handleInputChange} type="number" placeholder="0" min="0" name={items}/>
                          </div>

                      ))}
                  </div>
              </div>
            <TableGroup tableHead={tableHead} yearRow={matrix} />
        </>
    );
}

export default App;
