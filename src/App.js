import React from "react";

import HomePages from "./pages/HomePages";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import { AuthProvider } from "./context/AuthContext";
import LoginForm from "./pages/LoginForm";
import RequireAuth from "./Layouts/RequireAuth";
import DetailPages from "./pages/DetailPages";

const ColorModeContext = React.createContext({ ToggleColorMode: () => {} });

function ToggleColorMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "end",
        bgcolor: "background.default",
        color: "text.primary",
        position: "absolute",
        top: 65,
        right: 12,
        borderRadius: 1,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.ToggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      ToggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  // "/login"
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToggleColorMode />
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePages />} />
                <Route path="/login" element={<HomePages />} />
                <Route path="/jobs/:id" element={<HomePages />} />
              </Route>
            </Routes>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/jobs/:id"
                element={
                  <RequireAuth childrent={<DetailPages />}></RequireAuth>
                }
              />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
