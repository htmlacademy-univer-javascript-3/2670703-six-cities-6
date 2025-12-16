function NotFoundPage() {
  return (
    <div className="page page--gray page--not-found">
      <main className="page__main">
        <div className="container">
          <section className="not-found">
            <h1 className="not-found__title">404 Not Found</h1>
            <p className="not-found__description">
              These aren&apos;t the droids you are looking for.
            </p>
            <a className="not-found__link" href="/">
              Go to main page
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
