function CompanyCard(props) {
    return (
        <div>
            <h3>{props.companyName}</h3>
            <p>{props.positionName}</p>
            <p>{props.status}</p>
            <button onClick={props.onDelete}>Delete</button>
            <button onClick={props.onUpdate}>Mark as complete</button>
        </div>
    );
}
export default CompanyCard;