import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const res = await fetch('https://openlibrary.org/works/OL453657W.json');
  const data = await res.json();

  return {
    props: {
      book: data
    }
  };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer - Kasen Tei" />

      <Card>
        <Card.Body>
          <p>
            Hi, this is Kasen Tei. I am currently studying web development and
            learning how to build applications using React and Next.js.
          </p>
          <p>
            Let me show you some thing.
          </p>
        </Card.Body>
      </Card>

      <br />

      <BookDetails book={props.book} />
    </>
  );
}