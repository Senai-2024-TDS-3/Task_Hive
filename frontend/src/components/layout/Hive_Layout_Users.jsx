import Hex_Cell_User from "../Hex_Cell_User"
import Hex_Teste from "../Hex_Teste"


export default function Hive_Layout_Users() {
    return (
        <>
            <div className="Hex_Layout_User">
                {/* NUMERO MÁXIMO = 7 */}
                <div  id="divtask" >
                   <Hex_Cell_User/>
                   {/* <Hex_Cell_User/>
                    <Hex_Cell_User/>
                    <Hex_Cell_User/>
                   <Hex_Cell_User/>
                   <Hex_Cell_User/>
                   <Hex_Cell_User/> */}
                </div>
            </div>
        </>
    )
}