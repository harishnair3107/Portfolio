import '../App.css'

function SuccessAlert({ message, onClose }) {
    return (
        <div className="alert-overlay" onClick={onClose}>
            <div className="alert-box" onClick={(e) => e.stopPropagation()}>
                <div className="alert-icon">
                    <svg viewBox="0 0 52 52" className="checkmark">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <h3 className="alert-title">Success!</h3>
                <p className="alert-message">{message}</p>
                <button className="alert-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default SuccessAlert
