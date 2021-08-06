export const OPTIONS_DISABLED = 'OPTIONS_DISABLED';

const optionsDisabled = (status) => ({
  type: OPTIONS_DISABLED,
  status,
});

export default optionsDisabled;
