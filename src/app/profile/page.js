'use client'
import Image from "next/image"
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/infoBox";
import SuccessBox from "../../components/layout/SuccessBox";
import UserTabs from "../../components/layout/UserTabs"
import EditableImage from "../../components/layout/EditableImage"
import toast from "react-hot-toast";




export default function ProfilePage() {
   const session = useSession();
   const [userName, setUserName] = useState('');
   const [phone, setPhone] = useState('');
   const [streetAddress, setStreetAddress ] = useState('');
   const [postalCode, setPostalCode ] = useState('');
   const [city, setCity ] = useState('');
   const [Country, setCountry] = useState('');
   const [isAdmin, setIsAdmin] = useState('');
   const [image, setImage] = useState('');
   const {status} = session;
//    const setIsAdmin = true;
    // console.log(session);

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    console.log(data)
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                   setCountry(data.Country);
                   setIsAdmin(data.admin)
                });
            })
        }
    }, [session, status]);


    async function handleFileChange(ev) {

        const files = ev.target.files;
        if(files?.length > 0){
            const data = new FormData;
            data.set('files', files);
        
           const uploadPromise = fetch('/api/upload',{
            method: 'POST',
            body: data,
           }).then(response =>{
            if (response.ok) {
                return response.json().then(link =>{
                    setImage(link);
                })
            }
            throw new Error('Somthing went wrong');
           });

            await toast.promise(uploadPromise,{
                loading: 'Uploading...',
                success: 'Upload complete',
                error: 'Upload error',
            });
         
        
            const link = await response.JSON();
            setImage(link)
        }
    }


    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {

            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName,
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    Country,
                }),
            });
            if (response.ok)
                resolve()
            else
                reject();

        });

        await toast.promise(savingPromise,{
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });

    }

    if (status === 'loading'){
        return 'Loading...';
    }
    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    const userImage = session.data.user.image;

    return (
        <section className=" mt-8">
       <UserTabs setIsAdmin = {setIsAdmin}/>
            
            <div className="max-w-md mx-auto mt-8"> 

            {/* {saved && (
                <SuccessBox>
                    Profile Saved! 
                </SuccessBox>
            )}

            {isSaving && (
              <InfoBox>Saving.. </InfoBox>
            )} */}

            
                <div className=" flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative">
                       
                       <EditableImage link={image} setLink={setImage} /> 
                        </div>
                    </div>

                    <form className="grow" onSubmit={handleProfileInfoUpdate}> 
                        <label>First And Last Name</label>
                        <input 
                        type="text" placeholder="First and Last Name"
                         value={userName} onChange={ev => setUserName(ev.target.value)} 
                         />
                         <label>Email</label>
                        <input
                         type="email" disabled={true} value={session.data.user.email}
                         />
                        
                        <label>Phone Number</label>
                        <input
                         type="tel" placeholder="Phone Number"
                         value={phone} onChange={ev => setPhone(ev.target.value)}/>

                        <label>Street Address</label>
                        <input
                         type="text" placeholder="Street Address"
                         value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                         />

                        <div className=" flex gap-2">
                        <label className=" whitespace-nowrap">Postal code</label>
                            <input
                             type="text" placeholder="Postal Code"
                             value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                             />

                        <label>City</label>
                         <input 
                            type="text" placeholder="City"
                            value={city} onChange={ev => setCity(ev.target.value)}
                            />
                        </div>
                        <label>Country</label>
                         <input 
                            type="text" placeholder="Country"
                            value={Country} onChange={ev => setCountry(ev.target.value)}
                            />
                        <button type="submit" className=" text-white bg-primary"> Save</button>

                    </form>

                </div>
            </div>
        </section>
    )
}