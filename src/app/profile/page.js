'use client'
import Image from "next/image"
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "../../components/layout/infoBox";
import SuccessBox from "../../components/layout/SuccessBox";



export default function ProfilePage() {
    const session = useSession();
    
   

   const [userName, setUserName] = useState('');
   const [saved, setSaved] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const {status} = session;
    // console.log(session);

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);


    async function handleFileChange(ev) {

        const files = ev.target.files;
        if(files?.length > 0){
            const data = new FormData;
            data.set('files', files);
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers : {'Content-Type': 'multipart/form-data'},
            });
        }
    }


    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName}),
        });
        setIsSaving(false);
        if (response.ok) {
            setSaved(true);
        }
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
            <h1 className=" text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto border"> 

            {saved && (
                <SuccessBox>
                    Profile Saved! 
                </SuccessBox>
            )}

            {isSaving && (
              <InfoBox>Saving.. </InfoBox>
            )}

            
                <div className=" flex gap-4 items-center">
                    <div>
                        <div className=" p-2 rounded-lg relative">
                        <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt={'avatar'} />
                        <label>
                            <input type="file" className="hidden" onChange={handleFileChange}
                            /> 
                            <span className=" block border border-gray-300 rounded-lg p-2
                            text-center cursor-pointer">
                                Edit 
                            </span>
                        </label>
                        
                        </div>
                    </div>

                    <form className="grow" onSubmit={handleProfileInfoUpdate}> 
                        <input type="text" placeholder="First and Last Name"
                         value={userName} onChange={ev => setUserName(ev.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email}/>
                        <button type="submit" className=" text-white bg-primary"> Save</button>
                    </form>

                </div>
            </div>
        </section>
    )
}