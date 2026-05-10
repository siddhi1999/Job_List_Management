function CompanyCard(props) {
    return (
        <div>
            <h3>{props.companyName}</h3>
            <p>{props.positionName}</p>
            <p>{props.status}</p>
        </div>
    );
}
export default CompanyCard;