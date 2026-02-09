import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Transformation } from "@/components/transformation"
// import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { About } from "@/components/about"

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Transformation />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
