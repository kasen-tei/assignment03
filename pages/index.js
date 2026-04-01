/********************************************************************************* 
* * WEB422 – Assignment 3
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
* 
* Name: Kasen Tei  Student ID: 118311240 Date: April 01, 2026
*
* Vercel App (Deployed) Link: https://assignment3-kasen-teis-projects.vercel.app
*
********************************************************************************/

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  function submitForm(data) {

    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      )
    });

  }

  return (
    <Container>

      <PageHeader
        text="Search Books"
        subtext="Find books using the Open Library API"
      />

      <Row>
        <Col md={12}>

          <Form onSubmit={handleSubmit(submitForm)}>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author Name"
                {...register("author", { required: true })}
                className={errors.author ? "is-invalid" : ""}
              />
              {errors.author && (
                <div className="invalid-feedback">
                  Author is required
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Book Title"
                {...register("title")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                {...register("subject")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="Language"
                {...register("language")}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Publish Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Year"
                {...register("first_publish_year")}
              />
            </Form.Group>

            <Button type="submit">
              Search
            </Button>

          </Form>

        </Col>
      </Row>

    </Container>
  );
}