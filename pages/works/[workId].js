import { useRouter } from "next/router";
import useSWR from "swr";
import { Container } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";

export default function WorkPage() {
  const router = useRouter();
  const { workId } = router.query;

  // Always call hook at top level, even if workId is undefined
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (!workId || !data) return <div>Loading...</div>;
  if (error) return <Error statusCode={404} />;

  return (
    <Container className="mt-4">
      <BookDetails book={data} workId={workId} />
    </Container>
  );
}