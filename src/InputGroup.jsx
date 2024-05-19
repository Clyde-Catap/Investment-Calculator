import React from "react";
import UserInput from "./UserInput";


export default function InputGroup () {
    const leftRow= ["INITITAL INVESTMENT", "EXPECTED RETURN"];
    const rightRow= ["ANNUAL INVESTMENT", "DURATION"];



    return (
        <>
        <div className="input-group" id="user-input">
            <div>
                {leftRow.map((items) => (
                    <UserInput inputLabel={items}></UserInput>
                ))}
            </div>
            <div>
                {rightRow.map((items) => (
                    <UserInput inputLabel={items}></UserInput>
                ))}
            </div>
        </div>

        </>

    );
};