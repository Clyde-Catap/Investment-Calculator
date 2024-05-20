export default function YearAndInvestments ({YearAndInvestments, ...props}){
    return (
        <>
            {YearAndInvestments.map((cell, index) => (
                <td key={index}>{cell}</td>
            ))}
        </>
    );
}