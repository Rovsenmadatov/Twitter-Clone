import { BiDoorOpen } from 
"react-icons/bi";
import { auth } from "../../firebase/config";
import { navSections } from "../../utils/constants"
import { signOut } from "firebase/auth";


const Nav = ({ user }) => {
  return (
    <nav className='flex flex-col justify-between items-end px-2 py-4'>
      <div>
        <img className='w-14 mb-4' src='x-logo.webp' />

        {navSections.map((i, key) => (
          <div className="flex items-center text-xl  gap-3 md:text-xl p-2 rounded-lg transition hover:bg-[#505050b7] cursor-pointer max-md:justify-center" key={key}>
            {i.icon}
            <span className="whitespace-nowrap max-md:hidden" >{i.title}</span>
          </div>))}
      </div>

      <div>
        {!user
        ? (<div className="w-12 h-12 bg-gray-400 rounded-full animate-bounce" />)
        : (
          <div className="flex  flex-col gap-5">
            <div>
              <img className="w-12 h-12 rounded-full" src={user.photoURL}  />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>
            
            <button onClick={()=> signOut(auth)} className="flex items-center justify-center gap-2 p-1 bg-zinc-700 transition hover:bg-zinc-900 rounded text-2xl md:text-[15px]">
              <BiDoorOpen/>
              <span className="max-md:hidden ">Çıkış Yap</span>
            </button>
          </div>
        )
        }
      </div>

   </nav>
  );
};
export default Nav
