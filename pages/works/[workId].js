import { useRouter } from "next/router";
import useSWR from "swr";
import { Container } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";

export default function WorkPage() {
  const router = useRouter();
  const { workId } = router.query;

  if (!workId) return <div>Loading...</div>;

  const { data, error } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (error) return <Error statusCode={404} />;
  if (!data) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <BookDetails book={data} workId={workId} />
    </Container>
  );
}