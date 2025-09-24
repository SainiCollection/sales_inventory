const components = (_theme: any) => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        padding: '8px 16px',
        boxShadow: 'none',
      },
      containedPrimary: {
        backgroundColor: '#2563eb',
        '&:hover': { backgroundColor: '#1d4ed8' },
      },
    },
    variants: [
      {
        props: { variant: 'ghost' as any },
        style: {
          backgroundColor: 'transparent',
          color: '#2563eb',
          border: '1px solid rgba(37,99,235,0.12)',
          padding: '6px 14px',
          '&:hover': { backgroundColor: 'rgba(37,99,235,0.04)' },
        },
      },
    ],
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        boxShadow: '0 6px 18px rgba(15,23,36,0.06)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {},
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: '#f8fafc',
        '& .MuiTableCell-root': {
          fontWeight: 600,
          color: '#0f1724',
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: '1px solid #e6e9ee',
        padding: '16px 20px',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: '8px',
        padding: '0 8px',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginBottom: '6px',
        '&.Mui-selected': {
          backgroundColor: 'transparent',
          '& .MuiListItemIcon-root': {
            backgroundColor: '#2563eb',
            color: '#fff',
            borderRadius: '6px',
            padding: '6px',
          },
          '& .MuiListItemText-primary': {
            color: '#e6eef9',
            fontWeight: 600,
          },
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        color: '#0f1724',
        boxShadow: '0 2px 6px rgba(15,23,36,0.04)',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 64,
        paddingLeft: '24px',
        paddingRight: '24px',
      },
    },
  },
  MuiTypography: {
    variants: [
      {
        props: { variant: 'light' as any },
        style: {
          fontWeight: 500,
          fontSize: '0.9rem',
          color: '#9aa6b2',
        },
      },
    ],
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: { color: 'inherit' },
    },
  },
});

export default components;
