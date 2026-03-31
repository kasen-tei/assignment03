import useSWR from "swr";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Img
        variant="top"
        src={data.covers ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` : "/no_image.png"}
        alt={data.title || "No title"}
        onError={(e) => { e.target.src = "/no_image.png"; }}
      />
      <Card.Body>
        <Card.Title>{data.title || ""}</Card.Title>
        <Card.Text>{data.first_publish_date || "N/A"}</Card.Text>
        <Link href={`/works/${workId}`} passHref>
          <Button variant="primary">Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}