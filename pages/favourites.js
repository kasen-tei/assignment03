import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  // prevent rendering before data is loaded
  if (!favouritesList) return null;

  return (
    <Container className="mt-4">
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Favourites" subtext="Your Favourite Books" />
          <Row className="gy-4">
            {favouritesList.map((workId) => (
              <Col key={workId} lg={3} md={6}>
                <BookCard workId={workId} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <PageHeader text="Nothing Here" subtext="Add a book" />
      )}
    </Container>
  );
}