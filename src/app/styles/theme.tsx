import { createTheme } from '@mui/material';

const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "'Monaspace Krypton',sans-serif"
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    width: '100%',
                    padding: '0'
                },
                scroller: {
                    color: '#eef2f3!important',
                    "&:after": {
                        color: '#eef2f3'
                    }
                },
                flexContainer: {
                    display: 'flex',
                    justifyContent: 'space-evenly',
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: "'Monaspace Krypton',sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    textAlign: "center",
                    color: '#00C4FF',
                    opacity: 0.5,
                    minWidth: 'auto',
                    textTransform: 'none',
                    lineHeight: 1,
                    "&.Mui-selected": {
                        fontWeight: 500,
                        color: '#00C4FF',
                        opacity: 1,
                        textDecoration: 'none'
                    },
                },
            }
        },
    }
});

export default theme;
