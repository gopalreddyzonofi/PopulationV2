type SummaryProps = {
    title: string;
    value: string;
};

export const SummaryCard: React.FC<SummaryProps> = ({ title, value }) => {
    return (
        <div className="summary-card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
};
