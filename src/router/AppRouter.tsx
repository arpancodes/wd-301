import { useRoutes, Link } from "raviger";
import About from "../components/About";
import Home from "../components/FormsList";
import Form from "../components/Form";
import Questions from "../components/Questions";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: any }) => <Form formId={id} />,
  "/preview/:id/:qno": ({ id, qno }: { id: any; qno: any }) => (
    <Questions id={id} qno={qno} />
  ),
};

export default function App() {
  let route = useRoutes(routes);
  return (
    <div>
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
      {route}
    </div>
  );
}
