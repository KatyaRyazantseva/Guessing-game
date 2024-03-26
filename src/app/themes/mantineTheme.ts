import  {
    createTheme,
    CSSVariablesResolver,
    MantineProvider,
  } from '@mantine/core';

  export const themeOverride = createTheme({
    other: {
      grayLight: '#e5e5e5',
    },
  });

  export const resolver: CSSVariablesResolver = (theme) => ({
    variables: {
      '--mantine-color-body': theme.other.grayLight,
    },
    light: {
      '--mantine-color-body': theme.other.grayLight,
    },
    dark: {
      '--mantine-color-body': theme.other.grayLight,
    },
  });