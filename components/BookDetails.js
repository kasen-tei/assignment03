import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/services/userData"; // API functions to update favourites in backend

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Update showAdded state whenever favouritesList changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  // Handle favourite button click asynchronously
  const favouritesClicked = async () => {
    if (showAdded) {
      // Remove from favourites via API
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      // Add to favourites via API
      setFavouritesList(await addToFavourites(workId));
    }
  };

  return (
    <Row className="mt-4">
      <Col lg="4">
        <img
          src={book.covers ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg` : "/no_image.png"}
          alt={book.title || "No title"}
          className="img-fluid"
          onError={(e) => { e.target.src = "/no_image.png"; }} // Fallback if image fails
        />
      </Col>

      <Col lg="8">
        <h2>{book.title}</h2>
        <p>{book.description ? (book.description.value || book.description) : "No description available."}</p>

        {showFavouriteBtn && (
          <Button
            variant={showAdded ? "primary" : "outline-primary"}
            onClick={favouritesClicked}
          >
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>
        )}
      </Col>
    </Row>
  );
}