import { withFuncProps } from "../../withFuncProps";
import './NavButton.css';

function NavButton({ className, path, text, navigate, icon }) {
    const handleClick = () => {
        if (window.location.pathname !== path) { 
            navigate(path);
            localStorage.removeItem('createClientFormData');
        }
    };

    return (
        <button onClick={handleClick} className={className}>
            {icon && <span className="navIcon">{icon}</span>}
            <span>{text}</span>
        </button>
    );
}

export default withFuncProps(NavButton);