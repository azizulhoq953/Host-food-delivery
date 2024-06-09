'use client'
import { useState } from "react";
import {useProfile} from "../../../components/UseProfile"
import UserTabs from "../../../components/layout/UserTabs";
import EditableImage from "../../../components/layout/EditableImage";
import toast from "react-hot-toast";
import Right from "../../../components/icons/Right";
import { redirect } from "next/dist/server/api-utils";

export default function NewMenuItemPage(){
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const {loading, data} = useProfile();

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = {image,name,description,basePrice,};
        const savingPromise = new Promise(async(resolve, reject) => {
           const response = await fetch('/api/menu-items',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            });

            if (response.ok)
                resolve();
            else
                reject();

        }); 
       
        await toast.promise(savingPromise, {
            loading: 'Saving This Tasty item',
            success: 'Saved',
            error: 'Error',
        });

        return redirect('/menu-items');
    }

    if (loading){
        return 'Loading user info..';
    }

    // if (!data.admin){
    //     return 'Not an Admin';
    // }

    return (
        <section className=" mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
            <a href={'/menu-items'} className="button">
            <span>Show All New Items</span>
            <Right/>
            </a>
            </div>
          
            <form onSubmit={handleFormSubmit} className=" mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4" 
            style={{ gridTemplateColumns: '.3fr .7fr'}}>
                <div className="max-w-[200px]" >
                    <EditableImage link={image} setLink={setImage} />
               
                </div>
                <div className="grow">
                    <label> Item Name</label>
                    <input 
                    type="text"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    />
                    <label>Description </label>
                    <input 
                    type="text"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                    />
                    <label> Base Price</label>
                    <input 
                    type="text"
                    value={basePrice}
                    onChange={ev => setBasePrice(ev.target.value)}
                    />
                 <button className=" bg-primary" type="submit">save</button>
                </div>

            </div>
            </form>
        </section> 
    )

}