import Container from "react-bootstrap/Container";

function AppFooter() {
  return (
    <footer className="foot">
      <Container>
        This is an app to help people make better financial decisions{" "}
        <a href="https://github.com/ucsb-cs48-s20/project-s0-t1-budget">
          GitHub
        </a>
      </Container>
    </footer>
  );
}

export default AppFooter;
