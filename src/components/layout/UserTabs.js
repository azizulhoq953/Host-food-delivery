'use client';
import Link from "next/link";
import {usePathname} from "next/navigation"

export default function UserTabs({isAdmin}){
    const path = usePathname();
    return (
        <div className="flex mx-auto gap-2 tabs justify-center">
        <a 
        className={path === '/profile' ? 'active': ''}
         href={'/profile'}>
            Profile
            </a>
      
            
            <a 
            className={path === '/categories' ? 'active': ''}
            href={'/categories'}>
                Categories
            </a>

            <a 
            href={'/menu-items'}
            className={path.includes('menu-items') ? 'active' : ''}
          >
            Menu Items
            </a>

            <a 
            className={path === '/users' ? 'active': ''}
            href={'/users'}>
                Users
            </a>
            
        
       
       
    </div>
    );
}