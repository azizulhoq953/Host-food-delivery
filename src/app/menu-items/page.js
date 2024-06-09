'use client';
import {useProfile} from "../../components/UseProfile"
import Right from "../../components/icons/Right";
import UserTabs from "../../components/layout/UserTabs";


export default function MenuItemsPage() {

const {loading, data} = useProfile();
   


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
       </section>
    )
}