import { useState } from "react";
import useSWR from "swr";
import { Container, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Books() {

  const router = useRouter();
  const [page, setPage] = useState(1);

  let queryString = { ...router.query };
  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10`
  );

  if (error) {
    return (
      <Container>
        <PageHeader text="Search Results" subtext="Error loading results" />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <PageHeader text="Search Results" subtext="Loading..." />
      </Container>
    );
  }

  return (
    <Container>

      <PageHeader
        text="Search Results"
        subtext={queryString}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>First Publish Year</th>
          </tr>
        </thead>

        <tbody>
          {data.docs.map((book) => {
            const workId = book.key.split("/").pop();

            return (
              <tr key={book.key}>
                <td>
                  <Link href={`/works/${workId}`}>
                    {book.title || "N/A"}
                  </Link>
                </td>
                <td>{book.author_name ? book.author_name[0] : "N/A"}</td>
                <td>{book.first_publish_year || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

    </Container>
  );
}