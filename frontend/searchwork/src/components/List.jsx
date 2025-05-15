import React, { useEffect, useState } from 'react';
import VacancyCard from './VacancyCard';
import ResumeCard from './ResumeCard';

const List = () => {
    const [vacancy, setVacancy] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [rankedResumes, setRankedResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortMode, setSortMode] = useState('ai'); // 'ai' | 'date'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch('/mock-data.json');
                const data = await response.json();
                setVacancy(data.vacancy);
                setResumes(data.resumes);

                await fetchSortedResumes(data.vacancy, data.resumes, sortMode);
            } catch (error) {
                console.error('Помилка завантаження:', error);
                alert('Помилка при завантаженні даних');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sortMode]);

    const fetchSortedResumes = async (vacancyData, resumesData, mode) => {
        const url =
            mode === 'ai'
                ? 'http://localhost:8000/rank_resumes_ai/'
                : 'http://localhost:8000/rank_resumes_date';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vacancy: vacancyData,
                    resumes: resumesData,
                }),
            });

            const apiData = await response.json();

            if (!Array.isArray(apiData)) {
                throw new Error('Невірна відповідь API');
            }

            const rankedData = apiData.map((rank) => {
                const fullResume = resumesData.find(r => r.id === rank.id);
                return {
                    ...fullResume,
                    relevance_score: rank.relevance_score,
                    relevance_percentage: rank.relevance_percentage,
                };
            });

            setRankedResumes(rankedData);
        } catch (err) {
            console.error('Помилка API:', err);
            alert('Не вдалося отримати відсортовані резюме');
        }
    };

    const handleSortChange = (e) => {
        setSortMode(e.target.value);
    };

    return (
        <div>
            <h1>Вакансія</h1>
            <VacancyCard vacancy={vacancy} />

            <div style={{ marginBottom: '20px' }}>
                <label>Сортування: </label>
                <select className={"select-dropdown"} value={sortMode} onChange={handleSortChange}>
                    <option value="ai">AI-сортування(тест)</option>
                    <option value="default">По даті</option>
                </select>
            </div>

            {loading ? (
                <div>Завантаження...</div>
            ) : (
                <>
                    <h2>Резюме кандидатів</h2>
                    {rankedResumes.length === 0 ? (
                        <p>Жоден кандидат не відповідає вимогам.</p>
                    ) : (
                        <div id="resume-list">
                            {rankedResumes.map(resume => (
                                <ResumeCard key={resume.id} resume={resume} showRelevance={sortMode === 'ai'}/>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default List;
