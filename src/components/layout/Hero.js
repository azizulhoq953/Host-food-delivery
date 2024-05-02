import Right from "../icons/Right"
import Image from "next/image"
export default function Hero(){
    return (
        <section className="hero mt-8">

        <div className="py-12">

          <h1 className="text-4xl font-semibold">Everytihing <br /> 
          Is Better <br /> 
          with a <span className="text-primary"> pizza </span> 
          </h1>

            <p className="my-4 text-gray-500 text-sm">
                Pizza Is The Missing Piece That Makes Every 
                Day Complete, a simple yet delicious joy in 
                life
            </p>

        <div className="flex gap-4 text-sm">
            <button className=" bg-primary uppercase  flex items-center gap-2 text-white px-8 py-2 rounded-full">
                Order now
                <Right/>
            </button>

            <button className=" flex gap-2 text-gray-600 px-8 py-2 ">
                Order now
                <Right/>
            </button>
        </div>

        </div>

          

            <div className=" relative">
            <Image src={'/pizza.png'} layout={'fill'}
             objectFit={'contain'} alt={'pizza'} />
            </div>
           
        </section>
    )
}