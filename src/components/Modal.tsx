
export const Modal = ({ title, children, footer }: any) => {
    return (
        <div className="modal">
            <h2>{title}</h2>
            <div>{children}</div>
            <div>{footer}</div>
        </div>
    );
};
