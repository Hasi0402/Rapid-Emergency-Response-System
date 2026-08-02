import { Route, Switch } from "wouter";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Contacts from "@/pages/Contacts";
import Services from "@/pages/Services";
import History from "@/pages/History";

function NotFound() {
  return (
    <div className="py-16 text-center">
      <p className="font-display text-xl font-semibold text-base-100">Page not found</p>
      <p className="mt-2 text-sm text-base-400">The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/services" component={Services} />
        <Route path="/history" component={History} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}
