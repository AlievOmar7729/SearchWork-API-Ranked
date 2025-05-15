import React from 'react';

const VacancyCard = ({ vacancy }) => {
    if (!vacancy) return null;

    return (
        <div id="vacancy-details" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
            <p><strong>Посада:</strong> {vacancy.title}</p>
            <p><strong>Опис:</strong> {vacancy.description}</p>
            <p><strong>Зарплата:</strong> {vacancy.salary}</p>
            <p><strong>Локація:</strong> {vacancy.location}</p>
        </div>
    );
};

export default VacancyCard;
