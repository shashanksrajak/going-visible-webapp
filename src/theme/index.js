'use client';
import { Roboto, Poppins, Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const poppins = Poppins({
    weight: ['900', '800', '700', '600'],
    subsets: ['latin'],
    display: 'swap'
})

// colors
export const gray = {
    50: '#FBFCFE',
    100: '#EAF0F5',
    200: '#D6E2EB',
    300: '#BFCCD9',
    400: '#94A6B8',
    500: '#5B6B7C',
    600: '#4C5967',
    700: '#364049',
    800: '#131B20',
    900: '#090E10',
};

export const brand = {
    50: '#efe5fd',
    100: '#d4bff9',
    200: '#b794f6',
    300: '#9965f4',
    400: '#7e3ff2',
    500: '#6002ee',
    600: '#5300e8',
    700: '#3d00e0',
    800: '#1c00db',
    900: '#0000d6',
};

export const secondary = {
    50: '#fbe2f0',
    100: '#f5b6da',
    200: '#f186c0',
    300: '#ef4fa6',
    400: '#ee0290',
    500: '#ef0078',
    600: '#dd0074',
    700: '#c7006e',
    800: '#b1006a',
    900: '#880061',
};


const mode = "light";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: brand[200],
            main: brand[500],
            dark: brand[800],
            contrastText: brand[50],
            ...(mode === 'dark' && {
                contrastText: brand[100],
                light: brand[300],
                main: brand[400],
                dark: brand[800],
            }),
        },
        secondary: {
            light: secondary[300],
            main: secondary[500],
            dark: secondary[800],
            ...(mode === 'dark' && {
                light: secondary[400],
                main: secondary[500],
                dark: secondary[900],
            }),
        },
    },
    typography: {
        // fontFamily: ['"Poppins", "sans-serif"'].join(','),
        fontFamily: inter.style.fontFamily,
        // h1: {
        //     fontSize: 60,
        //     fontWeight: 600,
        //     lineHeight: 78 / 70,
        //     letterSpacing: -0.2,
        //     fontFamily: poppins.style.fontFamily,
        // },
        // h2: {
        //     fontSize: 48,
        //     fontWeight: 400,
        //     lineHeight: 1.2,
        //     fontFamily: poppins.style.fontFamily,
        // },
        // h3: {
        //     fontSize: 42,
        //     fontWeight: 400,
        //     lineHeight: 1.2,
        // },
        // h4: {
        //     fontSize: 36,
        //     fontWeight: 500,
        //     lineHeight: 1.5,
        // },
        // h5: {
        //     fontSize: 28,
        //     fontWeight: 600,
        // },
        // h6: {
        //     fontSize: 18,
        //     fontWeight: 400,
        // },
        // subtitle1: {
        //     fontSize: 18,
        // },
        // subtitle2: {
        //     fontSize: 16,
        // },
        // body1: {
        //     fontWeight: 400,
        //     fontSize: 15,
        // },
        // body2: {
        //     fontWeight: 400,
        //     fontSize: 14,
        // },
        // caption: {
        //     fontWeight: 400,
        //     fontSize: 12,
        // },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary"
            },
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    textTransform: "none"
                }
            }
        },
        MuiAccordion: {
            defaultProps: {
                elevation: 0,
                disableGutters: true,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: 8,
                    overflow: 'clip',
                    backgroundColor: '#fff',
                    border: '1px solid',
                    borderColor: gray[100],
                    ':before': {
                        backgroundColor: 'transparent',
                    },
                    '&:first-of-type': {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    },
                    '&:last-of-type': {
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                    },
                    ...(theme.palette.mode === 'dark' && {
                        backgroundColor: gray[900],
                        borderColor: gray[800],
                    }),
                }),
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: ({ theme }) => ({
                    border: 'none',
                    borderRadius: 8,
                    '&:hover': { backgroundColor: gray[100] },
                    ...(theme.palette.mode === 'dark' && {
                        '&:hover': { backgroundColor: gray[800] },
                    }),
                }),
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: { mb: 20, border: 'none' },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme, ownerState }) => ({
                    backgroundColor: gray[50],
                    borderRadius: 10,
                    border: `1px solid ${alpha(gray[200], 0.8)}`,
                    boxShadow: 'none',
                    transition: 'background-color, border, 80ms ease',
                    ...(ownerState.variant === 'outlined' && {
                        background: `linear-gradient(to bottom, #FFF, ${gray[50]})`,
                        '&:hover': {
                            borderColor: brand[300],
                            boxShadow: `0 0 24px ${brand[100]}`,
                        },
                    }),
                    ...(theme.palette.mode === 'dark' && {
                        backgroundColor: alpha(gray[800], 0.6),
                        border: `1px solid ${alpha(gray[700], 0.3)}`,
                        ...(ownerState.variant === 'outlined' && {
                            background: `linear-gradient(to bottom, ${gray[900]}, ${alpha(
                                gray[800],
                                0.5,
                            )})`,
                            '&:hover': {
                                borderColor: brand[700],
                                boxShadow: `0 0 24px ${brand[800]}`,
                            },
                        }),
                    }),
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                root: ({ theme }) => ({
                    alignSelf: 'center',
                    py: 1.5,
                    px: 0.5,
                    background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
                    border: '1px solid',
                    borderColor: `${alpha(brand[500], 0.3)}`,
                    fontWeight: '600',
                    '&:hover': {
                        backgroundColor: brand[500],
                    },
                    '&:focus-visible': {
                        borderColor: brand[800],
                        backgroundColor: brand[200],
                    },
                    '& .MuiChip-label': {
                        color: brand[500],
                    },
                    '& .MuiChip-icon': {
                        color: brand[500],
                    },
                    ...(theme.palette.mode === 'dark' && {
                        background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
                        borderColor: `${alpha(brand[500], 0.5)}`,
                        '&:hover': {
                            backgroundColor: brand[600],
                        },
                        '&:focus-visible': {
                            borderColor: brand[200],
                            backgroundColor: brand[600],
                        },
                        '& .MuiChip-label': {
                            color: brand[200],
                        },
                        '& .MuiChip-icon': {
                            color: brand[200],
                        },
                    }),
                }),
            },
        },
    }
});

export default theme;
