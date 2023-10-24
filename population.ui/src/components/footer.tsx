type FooterCardProps = {
    title: string;
};

export const FooterCard: React.FC<FooterCardProps> = ({ title }) => {
    return (
        <footer className="footer">
            <p>
                &copy; {new Date().getFullYear()} {title}
                reserved.
            </p>
        </footer>
    );
};
