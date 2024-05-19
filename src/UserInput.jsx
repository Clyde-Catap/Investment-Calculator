export default function UserInput ({inputLabel}) {
    return (
        <>
            <div id="row">
                <label>{inputLabel}</label>
                <input type="number" defaultValue="0" min="0" />
            </div>
        </>
    );
};