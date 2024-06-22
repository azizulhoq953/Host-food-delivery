'use client';
import Image from "next/image"
import { useEffect, useState } from "react";
import {useProfile} from "../../components/UseProfile"
import Right from "../../components/icons/Right";
import UserTabs from "../../components/layout/UserTabs";


export default function MenuItemsPage() {

const [menuItems, setMenuItems] = useState();    
const {loading, data} = useProfile();

useEffect(() => {
    fetch('/api/menu-items').then(res => {
        res.json().then(menuItems =>{
            setMenuItems(menuItems);
        });
    })
}, []);


    if (loading) {
        return 'Loading user info.';
    }

    // if (!data.admin) {
    //     return 'Not an admin';
    // }

    return (
       <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className=" mt-8">
            <a className=" button flex"
            href={'/menu-items/new'}>
                <span>Create New Menu Item</span>
                <Right/>
                
            </a>
        </div>
        <div>
            <h2 className="text-sm text-gray-500 mt-8">Edit menu item</h2>
            <div className="grid grid-cols-3 gap-2">
            {menuItems?.length > 0 && menuItems.map(item => (
                <a href={'/menu-items/edit/'+item._id} 
                className=" bg-gray-200 rounded-lg p-4"
                >
                   <div className=" relative">
                   <Image 
                   className=" rounded-md"
                   src={item.image} alt={''} width={100} height={100} layout={' fill'} />
                  
                   </div>
                    <div className=" text-center"> 
                        {item.name}

                    </div>
                   
                </a>
            ))}
            </div>
         
        </div>
       </section>
    );
}