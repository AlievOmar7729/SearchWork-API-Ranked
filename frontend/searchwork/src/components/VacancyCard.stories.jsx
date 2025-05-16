import VacancyCard from './VacancyCard';

export default {
    title: 'Components/VacancyCard',
    component: VacancyCard,
    argTypes: {
        vacancy: { control: 'object' }
    }
};

const Template = (args) => <VacancyCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    vacancy: {
        title: 'Frontend Developer',
        description: 'Розробка UI для SPA',
        salary: '2000 USD',
        location: 'Київ, Україна'
    }
};

export const HighSalary = Template.bind({});
HighSalary.args = {
    vacancy: {
        title: 'Senior React Developer',
        description: 'Робота з великим кодовою базою',
        salary: '4000 USD',
        location: 'Львів, Україна'
    }
};

export const Remote = Template.bind({});
Remote.args = {
    vacancy: {
        title: 'Fullstack Developer',
        description: 'Node + React. Повна віддаленка.',
        salary: '3000 USD',
        location: 'Remote'
    }
};
