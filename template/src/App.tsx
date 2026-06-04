import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Articles } from "./pages/Articles";
import { Links } from "./pages/Links";
import { ProjectPage } from "./pages/ProjectPage";
import { NotFound } from "./pages/NotFound";
import { HeadMeta } from "./components/HeadMeta";

function App() {
  return (
    <BrowserRouter>
      {/* Updates <head> meta tags from site.config.json */}
      <HeadMeta />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/articles"
          element={
            <Layout>
              <Articles />
            </Layout>
          }
        />
        <Route
          path="/links"
          element={
            <Layout>
              <Links />
            </Layout>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Layout>
              <ProjectPage />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
