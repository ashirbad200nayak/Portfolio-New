import { AboutMe } from '@/components/AboutMe';
import { Blogs } from '@/components/Blogs';
import { ContactMe } from '@/components/ContactMe';
import { Container } from '@/components/Container';
import { Projects } from '@/components/Projects';

export default async function Home() {
  return (
<main className="pt-16"> {/* pt-16 matches the h-16 height of the header */}
  <Container>
    <AboutMe />
    <Blogs />
    <Projects />
    <ContactMe />
  </Container>
</main>
  );
}
