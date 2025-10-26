import { AboutMe } from '@/components/AboutMe';
import { Activity } from '@/components/Activity';
import { Blogs } from '@/components/Blogs';
import { ContactMe } from '@/components/ContactMe';
import { Container } from '@/components/Container';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skill';
import { Snippets } from '@/components/Snippets';

export default async function Home() {
  return (
<main className="pt-16"> {/* pt-16 matches the h-16 height of the header */}
  <Container>
    <AboutMe />
    <Skills/>
    <Snippets/>
    <Activity/>
    <Blogs />
    <Projects />
    <ContactMe />
  </Container>
</main>
  );
}
