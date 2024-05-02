
export default function MenuItem() {
    return (

        <div className="bg-gray-200 p-4 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
       <div className="text-center">
       <img  src="pizza.png/" className="max-auto max-h-24
       block mx-auto" alt="pizza"/>
       </div>
        <h4 className="font-semibold text-xl my-2"> Pepperoni Pizza</h4>
        <p className="text-gray-500 text-sm"> Lorem Ipsum is simply dummy text of the printing 
           and typesetting
            . </p>
            <button className="mt-4 bg-primary text-white
            rounded-full px-4 py-2"> Add to cart $12</button>
            </div>
    );
}