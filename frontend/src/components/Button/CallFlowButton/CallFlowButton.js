import React from 'react';
import './CallFlowButton.css';
import { useNavigate } from 'react-router-dom';

const CallFlowButton = ({ draft }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/callflow', { state: { draft } });
    };

    return (
        <div className="draft-button" onClick={handleClick}>
            <span className="draft-name">{draft.name}</span>
        </div>
    );
};

export default CallFlowButton;
