export const GET_CONFIG = 'GET_CONFIG';

const getConfig = ({ amount, category, difficulty, type: configType }) => ({
  type: GET_CONFIG,
  config: {
    amount,
    category,
    difficulty,
    configType,
  },
});

export default getConfig;
