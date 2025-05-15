import React from 'react';

const ResumeCard = ({ resume, showRelevance }) => {
    const handleInvite = () => {
        alert(`Запрошення надіслано кандидату з ID ${resume.id}`);
    };

    return (
        <div className="resume-card" style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '10px',
            position: 'relative',
            backgroundColor: '#f9f9f9'
        }}>
            <p><strong>Освіта:</strong> {resume.education}</p>
            <p><strong>Досвід роботи:</strong> {resume.work_experience}</p>
            <p><strong>Навички:</strong> {resume.skills}</p>
            <p><strong>Особисті якості:</strong> {resume.personal_qualities}</p>
            <p><strong>Про мене:</strong> {resume.about_me}</p>
            <p><strong>Дата подачі:</strong> {resume.date}</p>
            <button onClick={handleInvite}>Запропонувати співбесіду</button>
            <br /><br />

            {showRelevance && (
                <>
                    <div style={{ backgroundColor: '#ddd', height: '5px', borderRadius: '3px' }}>
                        <div style={{
                            width: `${resume.relevance_percentage}%`,
                            height: '100%',
                            backgroundColor: 'darkgreen',
                            borderRadius: '3px'
                        }}></div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}>
                        {resume.relevance_percentage}%
                    </div>
                </>
            )}
        </div>
    );
};

export default ResumeCard;
