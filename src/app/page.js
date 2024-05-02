// import Header from "@/components/layout/Header"
import Hero from '../components/layout/Hero'
import HomeMenu from '../components/layout/HomeMenu';
import SectionHeaders from '../components/layout/SectionHeaders';
// import './globals.css'
import Link from "next/link";
export default function Home() {
  return (
 
    <>

 
  <Hero />
  <HomeMenu />

  <section className="text-center my-16">
    <SectionHeaders 
    subHeader={'Our story'}
    mainHeader={'About us'}
    />
  <div  className=" max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4"> 
    <p>
    Lorem Ipsum passages, and more recently with desktop 
    publishing software 
    like Aldus PageMaker including versions of Lorem Ipsum
    </p>
    <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type 
      specimen book.</p>
   <p>
    It has survived not only five centuries, but also the leap into
       electronic typesetting, remaining essentially unchanged. It was popularised in
        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
         and more recently with desktop publishing 
    software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
    </div>
  </section>

  <section className="text-center my-8">
    <SectionHeaders
    subHeader={'Don\'t Hesitate'}
    mainHeader={'Contact us'}
    />
    <div className="mt-8">
      <a className="text-4xl underline text-gray-500" href="tel:+8801706257588"> 
       +880 1706257588
      </a>
    </div>
  </section>
 

  </>
   
  );
}
