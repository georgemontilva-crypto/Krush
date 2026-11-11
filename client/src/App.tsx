import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { AgeGate } from "./components/AgeGate";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductLine = lazy(() => import("./pages/ProductLine"));

const TITLES: Record<string, string> = {
  "/": "KRUSH | Premium Hemp Gummies, Flower & Diamond Sauce",
  "/about": "About Us | KRUSH",
  "/products": "Products | KRUSH",
  "/products/bitez": "Krush Bitez Gummies | KRUSH",
  "/products/flower": "Krush Premium Flower | KRUSH",
  "/products/diamond-sauce": "Krush Diamond Sauce | KRUSH",
};

function ScrollReset() {
  const [loc] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = TITLES[loc] ?? "KRUSH";
  }, [loc]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollReset />
      <AgeGate />
      <Header />
      <main>
        <Suspense fallback={<div className="min-h-[100svh]" />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/products" component={Products} />
            <Route path="/products/:slug">{p => <ProductLine slug={p.slug} />}</Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
