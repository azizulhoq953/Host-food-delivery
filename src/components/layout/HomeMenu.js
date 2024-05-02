import MenuItem from '../layout/menu/MenuItem';
import SectionHeaders from './SectionHeaders';
import Image from "next/image";

export default function HomeMenu() {
return(
    <section>
    <div className="absoulate left-0 right-0 w-full justify-start overflow-x-hidden">
        <div className=" h-48 w-48 absolute -left-16 top-60 -z-10 " >
            <Image src={'/salad1.png'} width={109} height={189} alt={'sallad'}/> 
        </div>
        <div className="h-48 w-48 absolute -right-16 top-60">
            <Image src={'/salad2.png'} width={107} height={195} alt={'sallad'}/> 
        </div>
    </div>

    <div className="text-center mb-4">
        <SectionHeaders
        subHeader={'check out'}
        mainHeader={'Menu'}/>

    </div>

    <div className="grid grid-cols-3 gap-4">
       
       <MenuItem/>
       <MenuItem/>
       <MenuItem/>
       <MenuItem/>
       <MenuItem/>
       <MenuItem/>

    </div>
</section>
)

}