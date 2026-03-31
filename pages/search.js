'use client';

import { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/router';

export default function Search() {
  const [page, setPage] = useState(1);           // current page number
  const [pageData, setPageData] = useState([]);  // current page data
  const [loading, setLoading] = useState(false); // loading state
  const [author, setAuthor] = useState('');      // input value from user
  const [searchAuthor, setSearchAuthor] = useState(''); // author to actually fetch

  const router = useRouter();

  // fetch data when page or searchAuthor changes
  useEffect(() => {
    if (!searchAuthor) return; // check if author is leagal
    setLoading(true);

    async function fetchData() {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=author:${encodeURIComponent(
          searchAuthor
        )}&page=${page}&limit=10`
      );
      const data = await res.json();
      setPageData(data.docs);
      setLoading(false);
    }

    fetchData();
  }, [searchAuthor, page]);

  const previous = () => {
    if (page > 1) setPage(page - 1);
  };

  const next = () => {
    setPage(page + 1);
  };

  // handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);             // reset page number
    setSearchAuthor(author); // start fetching data
  };

  return (
    <>
      <PageHeader text="Search Novels by Author" />

      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </Form.Group>
        <Button type="submit" className="mt-2">Search</Button>
      </Form>

      {loading && <p>Loading...</p>}

      {!loading && pageData.length > 0 && (
        <>
          <Table striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>First Publish Year</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((book) => (
                <tr
                  key={book.key}
                  onClick={() => router.push(`/works/${book.key.split('/').pop()}`)} // navigate to work detail
                >
                  <td>{book.title}</td>
                  <td>{book.first_publish_year || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={previous} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
          </Pagination>
        </>
      )}

      {!loading && searchAuthor && pageData.length === 0 && (
        <p>No results found for "{searchAuthor}".</p>
      )}
    </>
  );
}