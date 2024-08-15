import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { ref } from 'firebase/storage';
import { useRef } from "react";


const DropDown = ({handleEdit,handleDelete}) => {

   const inputRef=useRef();
  return (
    <div>
<label className="popup">
  <input ref={inputRef} type="checkbox"/>
  <div className="burger" tabindex="0">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <nav className="popup-window">
    <legend>Aksiyonlar</legend>
    <ul>
        <li>
            <button onClick={()=>{
                inputRef.current.checked =false    
                handleEdit()}}>
            <MdOutlineModeEditOutline />
                <span>Düzenle</span>
            </button>
        </li>
        <hr />
        <li>
            <button onClick={()=>{
                inputRef.current.checked =false    
                handleDelete()}}>
            <FaTrashAlt />
                <span>Sil</span>
            </button>
        </li>
    </ul>
  </nav>
</label>
    </div>
  )
}

export default DropDown
