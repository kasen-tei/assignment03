import { Container } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <Container className="mt-4">

      <h1>{text}</h1>

      {subtext && (
        <p className="text-muted">
          {subtext}
        </p>
      )}

      <hr />

    </Container>
  );
}