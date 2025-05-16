import ResumeCard from './ResumeCard';

export default {
    title: 'Components/ResumeCard',
    component: ResumeCard,
    argTypes: {
        showRelevance: { control: 'boolean' },
        resume: { control: 'object' }
    }
};

const Template = (args) => <ResumeCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    showRelevance: false,
    resume: {
        id: 1,
        education: 'Бакалавр комп\'ютерних наук',
        work_experience: '3 роки у Web-розробці',
        skills: 'React, Node.js, MongoDB',
        personal_qualities: 'Командний гравець, уважний',
        about_me: 'Мотивований розробник з фокусом на UX',
        date: '2025-05-10',
        relevance_percentage: 10
    }
};

export const WithRelevance = Template.bind({});
WithRelevance.args = {
    ...Default.args,
    showRelevance: true
};

export const HighlyRelevant = Template.bind({});
HighlyRelevant.args = {
    ...Default.args,
    showRelevance: true,
    resume: {
        ...Default.args.resume,
        relevance_percentage: 95
    }
};
