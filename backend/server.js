const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { TfIdf } = require("natural");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

const UKRAINIAN_STOP_WORDS = [
    "і", "й", "або", "але", "та", "що", "як", "в", "на", "з", "по", "за", "у", "із", "від", "до",
    "не", "так", "також", "чи", "ви", "ми", "вони", "це", "цей", "ця", "те", "ті", "бо", "хоча", "де", "коли"
];

function cleanText(text) {
    return text
        .toLowerCase()
        .split(/\s+/)
        .filter(word => !UKRAINIAN_STOP_WORDS.includes(word))
        .join(" ");
}

// Власна реалізація косинусної схожості
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

function rankResumes(vacancy, resumes) {
    const vacancyText = cleanText(
        `${vacancy.title} ${vacancy.description} ${vacancy.employment} ${vacancy.salary} ${vacancy.location}`
    );

    const resumeTexts = resumes.map(resume =>
        cleanText(`${resume.education} ${resume.work_experience} ${resume.skills} ${resume.personal_qualities} ${resume.about_me}`)
    );

    const tfidf = new TfIdf();
    tfidf.addDocument(vacancyText);
    resumeTexts.forEach(text => tfidf.addDocument(text));

    // Отримаємо всі унікальні терміни для створення однакових векторів
    const terms = tfidf.listTerms(0).map(term => term.term);

    const vacancyVector = terms.map(term => tfidf.tfidf(term, 0));

    const similarityScores = resumeTexts.map((_, i) => {
        const resumeVector = terms.map(term => tfidf.tfidf(term, i + 1));
        return cosineSimilarity(vacancyVector, resumeVector);
    });

    const maxRelevance = Math.max(...similarityScores);
    const maxPercentage = maxRelevance < 0.1 ? 70 : 100;

    const rankedResumes = resumes.map((resume, i) => ({
        id: resume.id,
        relevance_score: similarityScores[i],
        relevance_percentage: Math.round((similarityScores[i] / maxRelevance) * maxPercentage)
    }));

    return rankedResumes.sort((a, b) => b.relevance_score - a.relevance_score);
}

app.post("/rank_resumes_ai/", (req, res) => {
    try {
        const { vacancy, resumes } = req.body;
        const ranked = rankResumes(vacancy, resumes);
        res.json(ranked);
    } catch (err) {
        console.error("Помилка AI ранжування:", err);
        res.status(500).json({ error: err.toString() });
    }
});

app.post("/rank_resumes_date/", (req, res) => {
    try {
        const { resumes } = req.body;
        const sorted = resumes.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json(sorted);
    } catch (err) {
        console.error("Помилка сортування по даті:", err);
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
