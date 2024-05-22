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


    function handleInputChange (event) {

      const inputName =  event.target.name;
      const inputValue = Number(event.target.value);
      if (inputName == "DURATION"){
          compute(inputValue);
          updateMatrix(investmentMatrix);
          updateDuration(inputValue)
      }
      if (inputName == "INITIAL INVESTMENT") {
        updateInitialInvestment(inputValue);
        if (duration != "") {
            compute(duration,inputValue,null,null);
            updateMatrix(investmentMatrix);

        }

      }
      if (inputName == "EXPECTED RETURN") {
        updateExpectedReturn(inputValue);
        if (duration != "") {
            compute(duration,null,null,inputValue);
            updateMatrix(investmentMatrix);
        }

      }
      if (inputName == "ANNUAL INVESTMENT") {
        updateAnnualInvestment(inputValue);
        if (duration != "") {
            compute(duration,null,inputValue,null);
            updateMatrix(investmentMatrix);
        }

      }    

    }


    function compute(numberOfYears, initialInv = null, annualInv = null, expectedRet = null) {
        let initialYearMatrix = [];

        for (let i = 0; i < Number(numberOfYears); i++) {
            let investments = calculateInvestmentResults({
                initialInvestment: Number(initialInv ?? initialInvestment),
                annualInvestment: Number(annualInv ?? annualInvestment),
                expectedReturn: Number(expectedRet ?? expectedReturn),
                duration: Number(i+1),
              });

            let computedInterest = Number(investments[i]['interest']);
            let computedTotalInterest = computeTotalInterest(investments);
            let totalInvestedCapital = computeInvestedCapital(Number(initialInv ?? initialInvestment), Number(annualInv ?? annualInvestment), Number(i+1));
            let computedInvestedValue = Number(investments[i]['valueEndOfYear']);

            initialYearMatrix.push([i + 1, "$" + computedInvestedValue.toFixed(2), "$" + computedInterest.toFixed(2), "$" + computedTotalInterest.toFixed(2), "$" + totalInvestedCapital.toFixed(2)]);
        }

        investmentMatrix = initialYearMatrix;
    }

    function computeTotalInterest(investments){
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
